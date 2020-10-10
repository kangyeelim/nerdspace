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
import { isUserLoggedIn } from '../services/Auth';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

class UserHome extends React.Component {
  constructor() {
    super();
    this.state = {
      studyRooms: [],
      isAuthenticating: true,
      isLoggedIn: false
    }
    this.retrieveRoomInfo = this.retrieveRoomInfo.bind(this);
    this.enterRoom = this.enterRoom.bind(this);
  }

  async componentDidMount() {
    console.log("mounted");
    axios.get(`http://localhost:5000/users/byGoogleID/${this.props.profile[0].googleId}`)
    .then((response) => {
      var rooms = response.data.data[0].rooms;
      Object.values(rooms).map(room => {
        this.retrieveRoomInfo(room)
      })
    })
    .catch(err => {
      console.error(err);
    })
    const profile = this.props.profile[0];
    var isLoggedIn = await isUserLoggedIn(profile.googleId, profile.name, profile.email, profile.imageUrl);
    this.setState({isLoggedIn: isLoggedIn, isAuthenticating:false});
  }

  retrieveRoomInfo(id) {
    axios.get(`http://localhost:5000/studyrooms/byRoomID/${id}`)
      .then((response) => {
        var room = response.data.data;
        room.key = id;
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
        <div className="container">
          <Row>
            <Col md={6}>
              <ProfileBox />
              <GroupBox
                rooms={this.state.studyRooms}
                enterRoom={this.enterRoom}/>
            </Col>
            <Col>
              <QuoteBox />
              <Postbar />
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
    }
}

export default connect(mapStateToProps, {}) (UserHome);
