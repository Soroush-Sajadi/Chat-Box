const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom, addMember } = require('./users.js')

const PORT = process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on('connection', socket => {
    socket.on('join', ({ name, room } , callback) => {
        const { error, user } = addUser({id: socket.id, name, room});
        const { err, members} = addMember ({name, room})

        if (error) return callback(error);
        if (err) return callback(err);
        socket.emit('message', {user: 'admin', text: `${user.name}, Welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined`});
        socket.emit('members', {user: 'admin', members:members });
        socket.broadcast.to(user.room).emit('members', {user: 'admin', members:members});

        socket.join(user.room);
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log(user)

        io.to(user.room).emit('message', {user: user.name, text: message });
        callback()
    })

    socket.on('disconnect', () => {
        console.log('user just left')
    })
} )

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))