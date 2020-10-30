import React from 'react';
import "./Chat.css";


export default function ChatMessage(props) {
    let date = new Date(props.timestamp);
    let time = date.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit'
    });
    return (
        <li>
            {props.user === props.senderId ? (
                <div className="self">
                    <div className="message">
                        <div className="text">
                            {props.message}
                        </div>
                        <div className="time">
                            {time}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="other">
                    <div className="name">{props.username}</div>
                    <div className="message">
                        <div className="text">
                            {props.message}
                        </div>
                        <div className="time">
                            {time}
                        </div>
                    </div>
                </div>
            )}
        </li>
    );
}
