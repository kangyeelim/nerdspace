import React from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row, Form } from 'react-bootstrap';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import { Redirect } from 'react-router-dom';
import './CreateRoomForm.css';
import Upload from '../../components/StudyRoomComponents/Upload';

const DEFAULT_URL = "https://source.unsplash.com/aJnHSrgSWkk/1600x900";
const dummy_contacts = [ {name: "michaela"}, {name: "evon"}, {name: "yenpeng"}];

class CreateRoomForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      isSubmitted: false,
      isSubmitting: false,
      friends: [],
      images: [],
      roomID: ""
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.titleInput = this.titleInput.bind(this);
    this.enterRoom = this.enterRoom.bind(this);
    this.handleImages = this.handleImages.bind(this);
    this.deleteUnpostImages = this.deleteUnpostImages.bind(this);
  }

  componentDidMount() {
    console.log("should load all friends in contact list for adding into room");
  }

  titleInput(e) {
    this.setState({name: e.currentTarget.value});
  }

  handleImages(images) {
    this.setState({images:images});
  }

  onSubmit() {
    //create study room
    var imageUrl = DEFAULT_URL;
    if (this.state.images.length == 1) {
      imageUrl = this.state.images[0].secure_url;
    }
    this.setState({isSubmitted: true}, () => {
      if (this.state.images.length <= 1) {
        axios.post('http://localhost:5000/studyrooms/', {
          name: this.state.name,
          isThereImage: (this.state.images.length == 1),
          imageUrl: imageUrl,
          googleID: this.props.profile[0].googleId
        })
        .then((response) => {
          this.addRoomIdToUser(response.data.data);
          this.setState({roomID: response.data.data});
        })
        .then(() => {
          this.enterRoom(this.state.roomID, imageUrl, this.state.name);
        })
        .catch(err => {
          console.error(err);
        });
      } else {
        alert("Please choose only one image as the study room profile picture");
      }
    });
  }

  componentWillUnmount() {
    if (!this.state.isSubmitted && this.state.images.length > 0) {
      this.deleteUnpostImages();
    }
  }

  deleteUnpostImages() {
    axios.post('http://localhost:5000/images/delete', {
      images: this.state.images
    })
      .catch(error => {
        console.error(error);
      });

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
      pathname:`/room/${id}`,
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
              <Upload
                handleImages={this.handleImages}
                images={this.state.images}
                />
              </div>
            <button onClick={this.onSubmit} className="btn btn-primary">Create</button>
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
