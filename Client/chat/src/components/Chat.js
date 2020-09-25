import React, { useState, useEffect } from 'react';
import ChatBox from './ChatBox';
import queryString from 'query-string';
import io from 'socket.io-client';
let socket;
const Chat = ({ location }) => {
    const [ name, setName ] = useState('');
    const [ room, setRoom ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);
    const [ member, setMember ] = useState('')
    const [ members, setMembers ] = useState([]);
    const ENDPOINT = 'localhost:5000';

    const getNewMessage = (childData) => {
        setMessage(childData);
    }
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT)

        setName(name);
        setRoom(room);
        
        socket.emit('join', { name, room }, () => {
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    },[messages, message]);

    useEffect(() => {
        socket.on('members', (members) => {
            setMembers(members)
        })
    },[members]);

    // useEffect(() => {
    //     socket.on('member', (member) => {
    //         setMembers([...members, member])
    //     })
    // })

    useEffect(() => {
        if (message) {
            socket.emit('sendMessage' , message, () => setMessage(''))
        }
    },[message])

    // const sendMessage = (event) => {
    //     event.preventDefault();

        
    // }
    console.log(members)
    return(
        <div className="outer-container">
            {/* <div className="container">
                <input 
                    value={message} 
                    onChange={event => setMessage(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event): null}
                    />

            </div> */}
            <ChatBox message={message} messages={messages} getNewMessage={getNewMessage} />
        </div>
    )
}

export default Chat;