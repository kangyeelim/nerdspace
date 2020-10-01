import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../../components/NavBar';
import '../General.css';
import { Col, Row, Form, Button, FormControl } from 'react-bootstrap';
import RoomBox from '../../components/StudyRoomComponents/RoomBox';
import axios from 'axios';

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
      requestedRooms: []
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

  componentDidMount() {
    this.loadAndApplyStatusToRooms();
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
    console.log("search room");
    axios.get(`http://localhost:5000/studyrooms/byKeyword/${this.state.keyword}`)
      .then((response) => {
        this.setState({rooms: response.data.data});
      })
      .catch(err => {
        console.error(err);
      })
  }

  enterRoom(id, room, url) {
    this.props.history.push({
      pathname:'/room',
      state: {
        roomName: room,
        imageUrl: url,
        id: id
      }
    });
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
    return (
      <div>
        <NavBar history={this.props.history}/>
        <div className='container'>
          <Col>
          <Form className="ml-auto">
            <div style={styles.form}>
              <FormControl type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={this.keywordInput}/>
              <Button onClick={this.searchRooms}>Search</Button>
              <Button style={styles.button} onClick={this.getAllRooms}>Show All</Button>
              <Button style={styles.button} onClick={this.makeNewRoom}>New Room</Button>
            </div>
          </Form>
          { this.state.rooms && this.state.rooms.map((room) => {
            return (
                <RoomBox roomName={room.name}
                hasAccess={this.hasAccess(room.key)}
                hasRequested={this.hasRequest(room.key)}
                key={room.key}
                id={room.key}
                requestJoin={()=> this.requestJoinRoom(room.key)}
                enter={() => this.enterRoom(room.key, room.name, room.imageUrl)}
                imageUrl={room.imageUrl}/>
            );
          })}
          </Col>
        </div>
      </div>
    );
  }
}

const styles = {
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
  }
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
    }
}

export default connect(mapStateToProps, {}) (Community);
