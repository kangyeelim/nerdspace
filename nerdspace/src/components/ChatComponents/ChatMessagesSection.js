import React from "react";
import { connect } from 'react-redux';
import ChatMessage from './ChatMessage';
import "./Chat.css";

const db = require('../../services/firebase').db;

class ChatMessagesSection extends React.Component {
    constructor(props) {
        super(props);
        const ID = props.id;
        this.state = {
            messages: [],
            room: ID,
            user: props.profile[0].googleId,
        }
    }

    async componentDidMount() {
        try {
            db.ref('messages').child(this.state.room).on("value", snapshot => {
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
                                user={this.state.user}
                                username={msg.username}
                                senderId={msg.googleID}
                                message={msg.message}
                                timestamp={msg.timestamp}/>;
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
