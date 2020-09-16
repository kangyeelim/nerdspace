import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import axios from 'axios';
import './General.css';
import { Col, Row, Form, Button, Image, Card, FormControl } from 'react-bootstrap';
import RoomSideBar from '../components/RoomSideBar';
import ChatMessageSection from '../components/ChatMessagesSection';
//                                <ChatMessageSection />
class ChatRoom extends React.Component {
    constructor() {
        super();
        this.state = {
            msg: "",
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
        }
    }

    postChatMessage() {
        axios.post('http://localhost:5000/message', {
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
                                <input placeholder="send a message" onChange={this.handleMsgChange} onKeyDown={this.handleKeyDown} value={this.msg} /><br />
                            </Col>
                            <Col xs={1}>
                                <RoomSideBar />
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        );
    }
}

const styles = {

}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    }
}

export default connect(mapStateToProps, {})(ChatRoom);
