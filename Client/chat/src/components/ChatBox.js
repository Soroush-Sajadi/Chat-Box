import React, { useState } from 'react';
import greenCircle from '../Images/green_circle.jpg'
import './ChatBox.css';

const ChatBox = ({message, messages, getNewMessage, members, name}) => {
    const [ newMesageText, setNewMessageText ] = useState('')

    const sendMessage = (event) => {
        event.preventDefault();
        getNewMessage(newMesageText)
        setNewMessageText('')
    }
    return(
        <div className="chatbox-wrapper">
            <div className="chatbox-container">
                <div className="chatbox-up">
                    chatbox
                </div>
                <div className="chatbox-down">
                    <div className="chatbox-left">
                        {members.members !== undefined ?
                            members.members.map((member, i) => 
                                <div className="chatbox-left-members" key={i}>
                                    <img style={{width:"2vh", height:"1vh", marginTop:"3.8vh"}} src={greenCircle} alt="online" />
                                    <p>{member.name.name}</p>
                                    </div>)
                            :
                            null
                        }
                    </div>
                    <div className ="chatbox-right">
                        <div className="chatbox-right-up">
                            {messages.map((item, i) => <div key={i} style={ name.toLowerCase() !== item.user ? {backgroundColor:"#4dc4c4"}:{backgroundColor:"#4d52c4", float:"right"} } className="chatbox-right-up-chatbox">
                                <div>
                                    <p>{item.user}</p>
                                    <h4>{item.text}</h4>
                                </div>
                            </div>)}
                        </div>
                        <div className="chatbox-right-down">
                            <input
                                type="text"
                                value={newMesageText}
                                placeholder="Write message..."
                                onChange={event => setNewMessageText(event.target.value)}
                                onKeyPress={event => event.key === 'Enter' ? sendMessage(event): null}
                                />
                                
                        </div>
                    </div>
                </div>
            </div>
           
            
        </div>
    )
}

export default ChatBox;