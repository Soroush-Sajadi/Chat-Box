import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox = ({message, messages, getNewMessage}) => {
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
                    <h3>My Chatbox</h3>
                </div>
                <div className="chatbox-down">
                    <div className="chatbox-left">

                    </div>
                    <div className ="chatbox-right">
                        <div className="chatbox-right-up">

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