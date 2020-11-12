import React from 'react';
import { connect } from 'react-redux';
import '../General.css';
import { Col, Form, Button, FormControl, Container } from 'react-bootstrap';
import RoomBox from '../../components/StudyRoomComponents/RoomBox';
import axios from 'axios';
import { enterRoom } from '../../navigators/StudyRoomNavigator';
import { isTokenAccepted } from '../../services/Auth';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from '../../components/NavigationComponents/NavBar';

const stub = [ {id:1, name:"GP resources sharing group", url:"https://source.unsplash.com/aJnHSrgSWkk/1600x900", hasAccess: true},
{id:2, name:"A Maths resources sharing group", url:"https://source.unsplash.com/aJnHSrgSWkk/1600x900", hasAccess: true},
{id:3, name:"Physics resources sharing group", url:"https://source.unsplash.com/aJnHSrgSWkk/1600x900", hasAccess: false},
{id:4, name:"Chem resources sharing group", url:"https://source.unsplash.com/aJnHSrgSWkk/1600x900", hasAccess: true}];

class Community extends React.Component {

  constructor() {
    super();
    this.state = {
      keyword: "",
      roomsAllowed: [],
      rooms: [],
      requestedRooms: [],
      isAuthenticating: true,
      isLoggedIn: false
    }
    this.enterRoom = this.enterRoom.bind(this);
    this.requestJoinRoom = this.requestJoinRoom.bind(this);
    this.searchRooms = this.searchRooms.bind(this);
    this.keywordInput = this.keywordInput.bind(this);
    this.makeNewRoom = this.makeNewRoom.bind(this);
    this.hasAccess = this.hasAccess.bind(this);
    this.getAllRooms = this.getAllRooms.bind(this);
    this.getAllRequestedRooms = this.getAllRequestedRooms.bind(this);
    this.loadAndApplyStatusToRooms = this.loadAndApplyStatusToRooms.bind(this);
  }

  async componentDidMount() {
    if (await isTokenAccepted(this.props.token)) {
      this.loadAndApplyStatusToRooms();
      this.setState({isLoggedIn: true, isAuthenticating:false});
    } else {
      this.setState({isLoggedIn: false, isAuthenticating:false});
    }
  }

  loadAndApplyStatusToRooms() {
    axios.get(`http://localhost:5000/users/byGoogleID/${this.props.profile[0].googleId}`)
      .then((response) => {
        if (response.data.data[0].rooms != null) {

          var roomsAllowed = response.data.data[0].rooms;
          this.setState({roomsAllowed: Object.values(roomsAllowed)});
        }
      })
      .then(() => {
        this.getAllRooms();
      })
      .then(() => {
        this.getAllRequestedRooms();
      })
      .catch(err => {
        console.error(err);
      });
  }

  getAllRooms() {
    axios.get('http://localhost:5000/studyrooms/')
    .then((response) => {
      var rooms = response.data.data;
      this.setState({rooms:rooms});
    })
    .catch(err => {
      console.error(err);
    });
  }

  getAllRequestedRooms() {
    axios.get(`http://localhost:5000/studyroomrequests/byGoogleID/${this.props.profile[0].googleId}`)
    .then((response) => {
      if (response.data.message != "No requests found.") {
        var requests = response.data.data;
        var roomIDs = requests.map((item) => {
          return item.roomID;
        })
        this.setState({requestedRooms:roomIDs});
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  makeNewRoom() {
    this.props.history.push('/createStudyRoom');
  }

  keywordInput(e) {
    this.setState({keyword: e.currentTarget.value});
  }

  searchRooms() {
    var filteredRooms = this.state.rooms.filter(obj => {
      return obj.name.toUpperCase().includes(this.state.keyword.toUpperCase()) || obj.key.includes(this.state.keyword);
    });
    this.setState({rooms:filteredRooms});
  }

  enterRoom(id) {
    enterRoom(this.props.history, id);
  }

  requestJoinRoom(id) {
    axios.post('http://localhost:5000/studyroomrequests/', {
      roomID: id,
      googleID: this.props.profile[0].googleId,
    })
    .then((response) => {
      var roomID = response.data.data.roomID;
      this.state.requestedRooms.push(roomID)
      this.setState({requestedRooms:this.state.requestedRooms});
      alert("Request to join room sent! You will have access once the request is accepted by the members.");
      this.loadAndApplyStatusToRooms();
    })
    .catch(err => {
      console.error(err);
    })
  }

  hasAccess(id) {
    return this.state.roomsAllowed.includes(id);
  }

  hasRequest(id) {
    return this.state.requestedRooms.includes(id);
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
        <div style={styles.container}>
            <h2 style={{marginBottom:'40px'}}>Community of Study Groups</h2>
            <Form >
              <div style={styles.form}>
                <FormControl
                  type="text"
                  placeholder="Search by Room ID or name"
                  className="mr-sm-2"
                  onChange={this.keywordInput}
                />
                <Button onClick={this.searchRooms}>Search</Button>
                <Button style={styles.button} onClick={this.getAllRooms}>
                  Show All
                </Button>
                <Button style={styles.button} onClick={this.makeNewRoom}>
                  New Room
                </Button>
              </div>
            </Form>
            {this.state.rooms &&
              this.state.rooms.map((room) => {
                return (
                  <RoomBox
                    roomName={room.name}
                    hasAccess={this.hasAccess(room.key)}
                    hasRequested={this.hasRequest(room.key)}
                    key={room.key}
                    id={room.key}
                    requestJoin={() => this.requestJoinRoom(room.key)}
                    enter={() => this.enterRoom(room.key)}
                    imageUrl={room.imageUrl}
                  />
                );
              })}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      justifyContent: "center",

  },
  form: {
    display: "flex",
    width: '80vw',
    justifyContent: "center"
  },
  button: {
    marginLeft: "20px",
    display: "flex",
    justifyContent:'center',
    minWidth: "120px"
  },
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
      token: state.token
    }
}

export default connect(mapStateToProps, {}) (Community);
