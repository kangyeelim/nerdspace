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
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/studyroomrequests/byRoomID/${this.props.id}`)
      .then((response) => {
        var requests = response.data.data;
        var userInfo = requests.map((req) => {
          return this.retrieveUserInfo(req.googleID);
        })
      })
      .catch(err => {
        console.error(err);
      })
  }

  retrieveUserInfo(googleID) {
    var userObj = {};
    axios.get(`http://localhost:5000/users/byGoogleID/${googleID}`)
      .then((response) => {
        userObj = response.data.data[0];
        this.setState({userInfoArr: this.state.userRequestInfo.push(userObj)})
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
                  key={req.key}
                  name={req.name}
                  imageUrl={req.imageUrl}
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
