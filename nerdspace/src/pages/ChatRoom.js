import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './General.css';
import { Col, Row, Container } from 'react-bootstrap';
import ChatMessageSection from '../components/ChatMessagesSection';
import ContactsSection from '../components/ContactsSection';
import { isTokenAccepted } from '../services/Auth';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from "../components/NavigationComponents/NavBar";

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

    render() {
      if (this.state.isAuthenticating) {
        return <Container>
          <CircularProgress/>
        </Container>
      }
      if (!this.state.isAuthenticating && !this.state.isLoggedIn) {
        return <Redirect to="/"/>
      }
        return (
            <div>
                <NavBar history={this.props.history} />
                <div className='container' style={{margin:"auto"}}>
                    <Col>
                        <Row>
                            <Col xs={2}>
                                <ContactsSection />
                            </Col>
                            {this.state.id === undefined ? (
                                <Col md={8} style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                                       <p> Click on a contact to get started! </p>
                                    </Col>
                                    ) : (
                                    <Col md={8}>
                                        <ChatMessageSection id={this.state.id}/>
                                        <input name="chatInput" placeholder="send a message" onChange={this.handleMsgChange} onKeyDown={this.handleKeyDown}
                                            value={this.msg} style={{ borderRadius: "12px", width: "50vw" }} /><br />
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
    /*#messageBar: {
        border: "2px",
        borderRadius: "12px"
    }*/
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        token: state.token
    }
}

export default connect(mapStateToProps, {})(ChatRoom);
