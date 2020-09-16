import React from "react";
import { Card, Button, Row, Col, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import ChatMessage from './ChatMessage';

const db = require('../firebase').db;
const chatRoom = db.ref('messages/room1');

class ChatMessagesSection extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            room: "room1",
        }
        //this.getMessages = this.getMessages.bind(this);
    }

    componentDidMount() {
        //TODO: Find a way to get the messages out of the event listener
        const msg = [];
        chatRoom.on("value", function (snapshot) {
            snapshot.forEach(message => {
                msg.push(message.val());
            });
            console.log(msg);
        });
        this.setState({
            messages: msg
        })
    }
    /*
    getMessages(callback) {
        const msg = [];
        chatRoom.on("value", function (snapshot) {
            snapshot.forEach(message => {
                msg.push(message.val());
            });
            return callback(msg);
        }, function (error) {
            console.log("Error: " + error.code);
            return callback(0);
        });
    }*/

    render() {
        return (
            <div>
                <Card style={styles.card}>
                    <Card.Body>
                        <Row>
                            <Col>
                                {Object.keys(this.state.messages).map((message) => {
                                    return <ChatMessage
                                        username={message.username}
                                        message={message.message}
                                        timestamp={message.timestamp}/>;
                                })}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

const styles = {
    card: {
        marginTop: '40px',
        justifyContent: 'center',
        alignText: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        minWidth: "475px",
        width: "58vw"
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    }
}

export default connect(mapStateToProps, {})(ChatMessagesSection);
