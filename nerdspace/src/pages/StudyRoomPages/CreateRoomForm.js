import React from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row, Form } from 'react-bootstrap';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import { Redirect } from 'react-router-dom';
import './CreateRoomForm.css';

const dummy_url = "https://source.unsplash.com/aJnHSrgSWkk/1600x900";
const dummy_contacts = [ {name: "michaela"}, {name: "evon"}, {name: "yenpeng"}];

class CreateRoomForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      isSubmitted: false,
      friends: [],
      imageUrl: dummy_url,
      roomID: ""
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.titleInput = this.titleInput.bind(this);
    this.enterRoom = this.enterRoom.bind(this);
  }

  componentDidMount() {
    console.log("should load all friends in contact list for adding into room");
  }

  titleInput(e) {
    this.setState({name: e.currentTarget.value});
  }

  onSubmit() {
    //create study room
    axios.post('http://localhost:5000/studyrooms/', {
      name: this.state.name,
      isThereImage: false,
      imageUrl: dummy_url,
      googleID: this.props.profile[0].googleId
    })
    .then((response) => {
      this.setState({roomID: response.data.data});
      this.addRoomIdToUser(response.data.data);
    })
    .catch(err => {
      console.error(err);
    });
    this.enterRoom(this.state.roomID, this.state.imageUrl, this.state.name);
  }

  addRoomIdToUser(roomID) {
    //must add the roomID to the user's roomID
    axios.post('http://localhost:5000/users/addRoomID', {
      roomID: roomID,
      googleID: this.props.profile[0].googleId
    })
    .catch((err) => {
      console.error(err);
    })
  }

  enterRoom(id, url, name) {
    this.props.history.push({
      pathname:'/room',
      state: {
        roomName: name,
        imageUrl: url,
        id: id
      }
    });
  }


  render() {
    return (
      <div>
        <NavBar history={this.props.history}/>
        <Container>
        <Col>
        <h3>Create a New Study Room</h3>
          <form className="form">
              <div className="input-group" style={styles.bar}>
                  <label style={styles.title} htmlFor="name">Study Room Name: </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    onChange={this.titleInput}/>
              </div>
              <div className="input-group" style={styles.bar}>
              <label style={styles.content} htmlFor="bio">Add Members: </label>
              <div className="container" id="scrollableArea">
                <Form>
                { dummy_contacts.map((contact) => {
                  return (
                    <div key={`${contact.name}`} className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id={`${contact.name}`}
                      label={`${contact.name}`}
                    />
                    </div>
                  );
                })}
                </Form>
              </div>
              </div>
            <button onClick={this.onSubmit} className="btn btn-primary">Create</button>
          </form>
          </Col>
        </Container>
      </div>
    );
  }
}

const styles = {
    bar: {
        width: '70vw',
        margin: '40px',
        justifyContent:'center',
        alignText: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    title: {
        marginRight: '10px',
        fontWeight: 'bold',
        marginLeft: "25px"
    },
    content: {
        marginRight: '10px',
        fontWeight: 'bold',
    },
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
    }
}

export default connect(mapStateToProps, {}) (CreateRoomForm);
