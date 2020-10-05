import React from "react";
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import RequestNotification from './RequestNotification';

const stub = [{googleID: "117862184407700751548", imageUrl: "https://lh4.googleusercontent.com/-AODvuNqc2IE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclec8GWOLIYp3xwtDkm298zfoQrbQ/s96-c/photo.jpg"}]

class RoomSideBar extends React.Component {
  constructor() {
    super();
    this.state ={
      requests: [],
      userRequestInfo: [],
    }
    this.retrieveUserInfo = this.retrieveUserInfo.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
    this.addMemberInRoom = this.addMemberInRoom.bind(this);
    this.getAllRoomRequests = this.getAllRoomRequests.bind(this);
    this.rejectRequest = this.rejectRequest.bind(this);
  }

  componentDidMount() {
    this.getAllRoomRequests();
  }

  getAllRoomRequests() {
    axios.get(`http://localhost:5000/studyroomrequests/byRoomID/${this.props.id}`)
      .then((response) => {
        var requests = response.data.data;
        if (requests.length > 0) {
          var userInfo = requests.map((req) => {
            return this.retrieveUserInfo(req.googleID, req.key);
          })
        } else {
          this.setState({userRequestInfo: []});
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  retrieveUserInfo(googleID, reqID) {
    var userObj = {};
    axios.get(`http://localhost:5000/users/byGoogleID/${googleID}`)
      .then((response) => {
        userObj = response.data.data[0];
        userObj.reqID = reqID;
        var currArr = this.state.userRequestInfo;
        currArr.push(userObj);
        this.setState({userRequestInfo: currArr});
      })
      .catch(err => {
        console.error(err);
      })
  }

  acceptRequest(id, googleID) {
    axios.delete(`http://localhost:5000/studyroomrequests`, {
      key: id
    })
    .then((response) => {
      this.addMemberInRoom(googleID);
    })
    .catch(err => {
      console.error(err);
    })
  }

  addMemberInRoom(googleID) {
    axios.post(`http://localhost:5000/studyrooms/addMembers`, {
      key: this.props.id,
      googleID: googleID
    })
    .then((response) => {
      this.getAllRoomRequests();
    })
    .catch(err => {
      console.error(err);
    })
  }

  rejectRequest(id) {
    axios.delete(`http://localhost:5000/studyroomrequests/${id}`)
      .then((response) => {
        if (response.data.message == 'DELETE success') {
          this.getAllRoomRequests();
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
      return (
        <Card style={styles.card}>
          <Card.Body>
            <Card.Title>Members</Card.Title>
          </Card.Body>
          <Card.Body>
            <Card.Title>Files</Card.Title>
          </Card.Body>
          <Card.Body>
            <Card.Title>Requests</Card.Title>
              {this.state.userRequestInfo.map(req => {
                return <RequestNotification
                  key={req.reqID}
                  name={req.name}
                  imageUrl={req.imageUrl}
                  acceptRequest={() => this.acceptRequest(req.reqID, req.googleID)}
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
    marginTop: '40px',
    justifyContent:'center',
    alignText: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: "20vw",
    minWidth: "280px",
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (RoomSideBar);
