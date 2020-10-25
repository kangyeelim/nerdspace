import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import ProfileBox from '../components/ProfileBox';
import GroupBox from '../components/GroupBox';
import Postbar from '../components/Postbar';
import NavBar from '../components/NavBar';
import TodoBox from '../components/TodoComponents/TodoBox';
import QuoteBox from '../components/QuoteComponents/QuoteBox';
import './General.css';
import axios from 'axios';
import { enterRoom } from '../navigators/StudyRoomNavigator';
import { isTokenAccepted } from '../services/Auth';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

class UserHome extends React.Component {
  constructor() {
    super();
    this.state = {
      studyRooms: [],
      isAuthenticating: true,
      isLoggedIn: false,
      connections: 0,
    }
    this.retrieveRoomInfo = this.retrieveRoomInfo.bind(this);
    this.enterRoom = this.enterRoom.bind(this);
  }

  async componentDidMount() {
    if (await isTokenAccepted(this.props.token)) {
      try {
        var response = await axios.get(`http://localhost:5000/users/byGoogleID/${this.props.profile[0].googleId}`);
        var rooms = (await response).data.data[0].rooms;
        Object.values(rooms).map(room => {
          this.retrieveRoomInfo(room)
        });
        var res2 = await axios.get('http://localhost:5000/contacts', {
             params: {
                 id: this.props.profile[0].googleId,
                 type: "dm"
             }
         })
        var contacts = res2.data.contacts;
        this.setState({connections:contacts.length});
      } catch (err) {
        console.error(err);
      }
      this.setState({isLoggedIn: true, isAuthenticating:false});
    } else {
      this.setState({isLoggedIn: false, isAuthenticating:false});
    }
  }

  retrieveRoomInfo(id) {
    axios.get(`http://localhost:5000/studyrooms/byRoomID/${id}`)
      .then((response) => {
        var room = response.data.data;
        room['key'] = id;
        this.state.studyRooms.push(room);
        this.setState({studyRooms:this.state.studyRooms});
      })
      .catch(err => {
        console.error(err);
      })
  }

  enterRoom(id) {
    enterRoom(this.props.history, id);
  }

  render() {
    if (!this.state.isAuthenticating && !this.state.isLoggedIn) {
      return <Redirect to="/"/>
    }
    if (this.state.isAuthenticating) {
      return <Container>
        <CircularProgress/>
      </Container>
    }
    return (
      <div>
        <NavBar history={this.props.history} />
        <div className="container">
          <Row>
            <Col md={6}>
              <ProfileBox connections={this.state.connections}/>
              <GroupBox
                rooms={this.state.studyRooms}
                enterRoom={this.enterRoom}/>
            </Col>
            <Col>
              <QuoteBox />
              <TodoBox />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
      token: state.token
    }
}

export default connect(mapStateToProps, {}) (UserHome);
