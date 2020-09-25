import React from 'react';
import './ChatBox.css';

const ChatBox = () => {
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
                            <input  type="text" placeholder="Write message..." onChange={event => event.target.value}/>
                        </div>
                    </div>
                </div>
            </div>
           
            
        </div>
    )
}

export default ChatBox;