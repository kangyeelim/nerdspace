import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './General.css';
import { createBrowserHistory } from 'history';
import { Col, Row, Button } from 'react-bootstrap';
import ChatMessageSection from '../components/ChatComponents/ChatMessagesSection';
import ContactsSection from '../components/ChatComponents/ContactsSection';
import { isTokenAccepted } from '../services/Auth';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from "../components/NavigationComponents/NavBar";
import { Typography } from "@material-ui/core";

export const history = createBrowserHistory({ forceRefresh: true });

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        const ID = props.match.params.id;
        this.state = {
            msg: "",
            user: props.profile[0].googleId,
            name: props.profile[0].name,
            id: ID,
            isAuthenticating: true,
            isLoggedIn: false
        }
        this.handleMsgChange = this.handleMsgChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.postChatMessage = this.postChatMessage.bind(this);
        this.deleteChat = this.deleteChat.bind(this);
    }

    async componentDidMount() {
      var isLoggedIn = await isTokenAccepted(this.props.token);
      this.setState({isLoggedIn: isLoggedIn, isAuthenticating:false});
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
            room: this.state.id,
            senderId: this.state.user,
            username: this.state.name,
            message: this.state.msg
        }).catch(err => {
            console.error(err);
        });
    }

    deleteChat() {
        axios.delete(`http://localhost:5000/contacts/${this.state.id}/${this.props.profile[0].googleId}`)
            .catch(err => {
                console.error(err);
            })
            .then(response => {
                history.push('/chat/');
            })
    }

    render() {
      if (this.state.isAuthenticating) {
        return <div className="container" style={{margin:"auto"}}>
          <CircularProgress/>
        </div>
      }
      if (!this.state.isAuthenticating && !this.state.isLoggedIn) {
        return <Redirect to="/"/>
      }
        return (
            <div>
                <NavBar history={this.props.history} />
                <div className='container' style={styles.container}>
                    <Col>
                        <Row>
                            <Col xs={3}>
                                <ContactsSection />
                            </Col>
                            {this.state.id === undefined ? (
                                <Col md={8} style={styles.heading}>
                                    <Typography variant="h6"> Click on a contact to get started!</Typography>
                                </Col>
                                ) : (
                                <Col md={8}>
                                    <ChatMessageSection id={this.state.id}/>
                                    <div style={styles.bottom}>
                                        <Button style={styles.button} variant="danger" onClick={this.deleteChat}>Delete Chat</Button>
                                        <input name="chatInput" placeholder="send a message" onChange={this.handleMsgChange} onKeyDown={this.handleKeyDown}
                                            value={this.msg} style={styles.input} /><br />
                                    </div>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        margin:"auto"
    },
    heading: {
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        color: "#0f4c75"
    },
    input: {
        borderRadius: "20px",
        borderColor: "#a2d5f2",
        width: "32vw",
        padding: "5px",
        outline: "none",
        marginLeft: "5px",
    },
    bottom: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        token: state.token
    }
}

export default connect(mapStateToProps, {})(ChatRoom);
