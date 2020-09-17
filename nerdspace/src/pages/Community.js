import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import './General.css';
import { Col, Row, Form, Button, FormControl } from 'react-bootstrap';
import RoomBox from '../components/RoomBox';

const stub = [ {id:1, name:"GP resources sharing group", url:"https://source.unsplash.com/aJnHSrgSWkk/1600x900", hasAccess: true},
{id:2, name:"A Maths resources sharing group", url:"https://source.unsplash.com/aJnHSrgSWkk/1600x900", hasAccess: true},
{id:3, name:"Physics resources sharing group", url:"https://source.unsplash.com/aJnHSrgSWkk/1600x900", hasAccess: false},
{id:4, name:"Chem resources sharing group", url:"https://source.unsplash.com/aJnHSrgSWkk/1600x900", hasAccess: true}];

class Community extends React.Component {

  constructor() {
    super();
    this.state = {
      keyword: ""
    }
    this.enterRoom = this.enterRoom.bind(this);
    this.requestJoinRoom = this.requestJoinRoom.bind(this);
    this.searchRooms = this.searchRooms.bind(this);
    this.keywordInput = this.keywordInput.bind(this);
    this.makeNewRoom = this.makeNewRoom.bind(this);
  }

  makeNewRoom() {

  }

  keywordInput(e) {
    this.setState({keyword: e.currentTarget.value});
  }

  searchRooms() {
    console.log("search room");
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
    console.log("request");
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
              <Button onClick={this.searchRooms}>Submit</Button>
              <Button style={styles.button} onClick={this.makeNewRoom}>New Room</Button>
            </div>
          </Form>
          { stub && stub.map((room) => {
            return (
                <RoomBox roomName={room.name}
                hasAccess={room.hasAccess}
                key={room.id}
                id={room.id}
                requestJoin={()=> this.requestJoinRoom(room.id)}
                enter={() => this.enterRoom(room.id, room.name, room.url)}
                imageUrl={room.url}/>
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
