import React from 'react';
import { connect } from 'react-redux';
import ProfileBox from '../components/HomeComponents/ProfileBox';
import GroupBox from '../components/HomeComponents/GroupBox';
import TodoBox from '../components/TodoComponents/TodoBox';
import QuoteBox from '../components/QuoteComponents/QuoteBox';
import './General.css';
import axios from 'axios';
import { enterRoom } from '../navigators/StudyRoomNavigator';
import { isTokenAccepted } from '../services/Auth';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from "@material-ui/core";
import NavBar from "../components/NavigationComponents/NavBar";

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
      return <div className="container" style={{margin:"auto"}}>
        <CircularProgress/>
      </div>
    }
    return (
      <div>
        <NavBar history={this.props.history} />
        <div className="container" style={{ margin: "auto" }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <ProfileBox connections={this.state.connections} />
            </Grid>
            <Grid item xs={6}>
              <QuoteBox />
            </Grid>
            <Grid item xs={6}>
              <GroupBox
                rooms={this.state.studyRooms}
                enterRoom={this.enterRoom}
              />
            </Grid>
            <Grid item xs={6}>
              <TodoBox />
            </Grid>
          </Grid>
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
