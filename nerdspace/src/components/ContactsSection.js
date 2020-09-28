import React from "react";
import { Card, Button, Row, Col, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import ChatMessage from './ChatMessage';
import "./Chat.css";


const db = require('../firebase').db;
const chatRoom = db.ref('messages/room1');

class ContactsSection extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            room: "room1",
        }
        //this.getMessages = this.getMessages.bind(this);
    }

    async componentDidMount() {
        try {
            chatRoom.on("value", snapshot => {
                let messages = [];
                snapshot.forEach(message => {
                    messages.push(message);
                });
                this.setState({ messages });
            });
        } catch (error) {
            console.log("Read error");
        }
    }

    render() {
        return (
            <div>
                <ul className="chat">
                    {this.state.messages.map((message) => {
                        let msg = message.val();
                        return <ChatMessage
                            key={message.key}
                            username={msg.username}
                            message={msg.message}
                            timestamp={msg.timestamp} />;
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    }
}

export default connect(mapStateToProps, {})(ChatMessagesSection);
