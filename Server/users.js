const { use } = require("./router");

const users = [];
const members = []

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const excistingUser = users.find(user => user.room === room && user.name === name);

    if (excistingUser) {
        return {error: 'Username is taken'}
    }
    const user = { id, name, room }
    users.push(user)
    return{user}
};

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find(user => user.id === id);

const getUsersInRoom = (room) => users.filter(user=> user.room === room);

const addMember = (name, room) => {
    const excistingUser = members.find(user => user.room === room && user.name === name);
    if (excistingUser) {
        return {err: 'Username is taken'}
    }
    const newMember = { name, room }
    members.push(newMember)
    return{members}

}

module.exports = {addUser, removeUser, getUser, getUsersInRoom, addMember}