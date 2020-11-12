import React from "react";
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import RequestNotification from './RequestNotification';
import UserCard from './UserCard';
import { goToCommonTimesPage } from '../../navigators/StudyRoomNavigator';
import CircularProgress from '@material-ui/core/CircularProgress';

const db = require('../../services/firebase').db;

class RoomSideBar extends React.Component {
  constructor() {
    super();
    this.state ={
      requests: [],
      userRequestInfo: [],
      members:[],
      isLoading: false
    }
    this.retrieveUserInfo = this.retrieveUserInfo.bind(this);
    this.retrieveUserInfoForMembers = this.retrieveUserInfoForMembers.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
    this.addMemberInRoom = this.addMemberInRoom.bind(this);
    this.getAllRoomRequests = this.getAllRoomRequests.bind(this);
    this.rejectRequest = this.rejectRequest.bind(this);
    this.addRoomIdToUser = this.addRoomIdToUser.bind(this);
    this.getAllMembers = this.getAllMembers.bind(this);
    this.findCommonTimes = this.findCommonTimes.bind(this);
  }

  async componentDidMount() {
    this.getAllRoomRequests();
    this.getAllMembers();
  }

  //must switch this to become realtime viewing of requests
  async getAllRoomRequests() {
      try {
        await db.ref('studyRoomRequests')
        .orderByChild('roomID')
        .equalTo(this.props.id)
        .on("value", async (snapshot) => {
          var resArr = [];
          snapshot.forEach((child) => {
            var key = child.key;
            var data = child.val();
            resArr.push({
              key: key,
              roomID: data.roomID,
              googleID: data.googleID
            });
          });
          this.setState({userRequestInfo:[]})
          resArr.forEach(async (req) => {
            await this.retrieveUserInfo(req.googleID, req.key);
          })
        });
      } catch(error) {
        console.error(error);
      }
  }

  getAllMembers() {
    axios.get(`http://localhost:5000/studyrooms/byRoomID/${this.props.id}`)
      .then((response) => {
        this.state.members = [];
        var members = response.data.data.members;
        Object.values(members).map((member) => {
          this.retrieveUserInfoForMembers(member);
        })
      })
      .catch(err => {
        console.error(err);
      })
  }

  retrieveUserInfoForMembers(googleID) {
    var userObj = {};
    axios.get(`http://localhost:5000/users/byGoogleID/${googleID}`)
      .then((response) => {
        userObj = response.data.data[0];
        var currArr = this.state.members;
        currArr.push(userObj);
        this.setState({members: currArr});
      })
      .catch(err => {
        console.error(err);
      })
  }

  async retrieveUserInfo(googleID, reqID) {
    var userObj = {};
    this.setState({isLoading:true});
    try {
      var res = await axios.get(`http://localhost:5000/users/byGoogleID/${googleID}`);
      userObj = (await res).data.data[0];
      userObj.reqID = reqID;
      this.state.userRequestInfo.push(userObj);
      this.setState({userRequestInfo:this.state.userRequestInfo, isLoading:false});
    } catch(err) {
      console.error(err);
    }
  }

  acceptRequest(id, googleID) {
    axios.post(`http://localhost:5000/studyrooms/addMembers`, {
        key: this.props.id,
        googleID: googleID
    })
    .then((response) => {
      this.getAllMembers();
    })
    .catch(err => {
        console.error(err);
    })

    axios.post('http://localhost:5000/users/addRoomID', {
        roomID: this.props.id,
        googleID: googleID
    })
    .catch((err) => {
        console.error(err);
    });

    axios.post(`http://localhost:5000/contacts/${id}`, {
        roomID: this.props.id,
        googleID: googleID,
        name: this.props.roomName
    })
    .catch((err) => {
        console.error(err);
    });

    axios.delete(`http://localhost:5000/studyroomrequests/${id}`)
    .catch(err => {
        console.error(err);
    })
  }

  addMemberInRoom(googleID) {
    axios.post(`http://localhost:5000/studyrooms/addMembers`, {
      key: this.props.id,
      googleID: googleID
    })
    .catch(err => {
      console.error(err);
    })
  }

  addRoomIdToUser(roomID, googleID) {
    axios.post('http://localhost:5000/users/addRoomID', {
      roomID: this.props.id,
      googleID: googleID
    })
    .catch((err) => {
      console.error(err);
    })
  }

  rejectRequest(id) {
    axios.delete(`http://localhost:5000/studyroomrequests/${id}`)
      .catch(err => {
        console.error(err);
      })
  }

  findCommonTimes() {
    goToCommonTimesPage(this.props.history, this.props.id);
  }

  render() {
      return (
        <Card style={styles.card}>
          <Card.Body>
            <Card.Title>Members</Card.Title>
              {this.state.members.map(member => {
                return (
                    <UserCard
                    key={member.googleID}
                    name={member.name}
                    imageUrl={member.imageUrl}/>
                );
              })}
          </Card.Body>
          <Card.Body>
            <Card.Title>Common Times</Card.Title>
            <Button variant="primary"onClick={this.findCommonTimes}>Find</Button>
          </Card.Body>
          <Card.Body>
            <Card.Title>Requests</Card.Title>
              {this.state.isLoading && (<CircularProgress/>)}
                  {this.state.userRequestInfo.map(req => {
                return <RequestNotification
                  key={req.reqID}
                  name={req.name}
                  imageUrl={req.imageUrl}
                  acceptRequest={() => this.acceptRequest(req.reqID, req.key)}
                  rejectRequest={()=> this.rejectRequest(req.reqID)}
                  />
              })}
          </Card.Body>
        </Card>
      );
    }
}

const styles = {
  card: {
    margin: "auto",
    marginTop: "10px",
    backgroundColor: "#a2d5f2",
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (RoomSideBar);
