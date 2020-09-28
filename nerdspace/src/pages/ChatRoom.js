import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import axios from 'axios';
import './General.css';
import { Col, Row, Form, Button, Image, Card, FormControl } from 'react-bootstrap';
import ChatMessageSection from '../components/ChatMessagesSection';

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "",
            user: props.profile[0].googleId,
            name: props.profile[0].name,
        }
        this.handleMsgChange = this.handleMsgChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.postChatMessage = this.postChatMessage.bind(this);
    }

    handleMsgChange(event) {
        const message = event.target.value;
        this.setState({
            msg: message
        });
    }

    handleKeyDown(event) {
        if (event.key === "Enter" && this.state.msg != "") {
            this.postChatMessage();
            this.setState({
                msg: ""
            });
            var frm = document.getElementsByName('chatInput')[0];
            frm.value = '';
        }
    }

    postChatMessage() {
        axios.post('http://localhost:5000/message', {
            senderId: this.state.user,
            username: this.state.name,
            message: this.state.msg
        }).catch(err => {
            console.error(err);
        });
    }

    render() {
        return (
            <div>
                <NavBar history={this.props.history} />
                <div className='container'>
                    <Col>
                        <Row>
                            <Col md={11}>
                                <ChatMessageSection />
                                <input name="chatInput" placeholder="send a message" onChange={this.handleMsgChange} onKeyDown={this.handleKeyDown}
                                    value={this.msg} style={{ borderRadius: "12px", width: "50vw" }} /><br />
                            </Col>
                            <Col xs={1}>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        );
    }
}

const styles = {
    /*#messageBar: {
        border: "2px",
        borderRadius: "12px"
    }*/
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    }
}

export default connect(mapStateToProps, {})(ChatRoom);
