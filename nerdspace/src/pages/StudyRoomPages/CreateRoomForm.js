import React from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row, Form } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './CreateRoomForm.css';
import Upload from '../../components/StudyRoomComponents/Upload';
import { getImage, deleteImages } from '../../services/ImageService';
import { enterRoom } from '../../navigators/StudyRoomNavigator';
import { updateRoomDetails } from '../../services/StudyRoomService';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isTokenAccepted } from '../../services/Auth';
import NavBar from "../../components/NavigationComponents/NavBar";

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
      roomID: "",
      isEditing: false,
      isLoaded: false,
      addedMembers: [],
      isAuthenticated: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.titleInput = this.titleInput.bind(this);
    this.enterRoom = this.enterRoom.bind(this);
    this.handleImages = this.handleImages.bind(this);
    this.deleteUnpostImages = this.deleteUnpostImages.bind(this);
    this.handleRoomMember = this.handleRoomMember.bind(this);
  }

  async componentDidMount() {
    var isAuthenticated = await isTokenAccepted(this.props.token);
    this.setState({isAuthenticated: isAuthenticated});
    if (typeof this.props.location.state != 'undefined' &&
    typeof this.props.location.state.roomName != 'undefined') {
      var images = (await getImage(this.props.location.state.imageUrl)).data;
      this.setState({
        roomID:this.props.location.state.id,
        name:this.props.location.state.roomName,
        isEditing: true,
        images: images
      }, () => {
        this.setState({isLoaded:true});
      })
    } else {
      try {
       var res = await axios.get('http://localhost:5000/contacts', {
            params: {
                id: this.props.profile[0].googleId,
                type: "dm"
            }
        })
          var contacts = await res.data.contacts;
        this.setState({friends:contacts, isLoaded:true});
      } catch (error) {
        console.error(error);
      }
    }
  }

  titleInput(e) {
    this.setState({name: e.currentTarget.value});
  }

  handleImages(images) {
    this.setState({images:images});
  }

  async onSubmit() {
    //create study room
    var imageUrl = DEFAULT_URL;
    if (this.state.images.length == 1) {
      imageUrl = this.state.images[0].secure_url;
    }
    this.setState({isSubmitted: true}, async () => {
      if (this.state.images.length <= 1 && !this.state.isEditing) {
          this.state.addedMembers.push(this.props.profile[0].googleId);
          this.setState({ addedMembers: this.state.addedMembers });
        axios.post('http://localhost:5000/contacts/', {
          name:this.state.name,
          IDs: this.state.addedMembers
        })
        .then((response) => {
          console.log(response.data.chatID);
        axios.post('http://localhost:5000/studyrooms/', {
          name: this.state.name,
          isThereImage: (this.state.images.length == 1),
          imageUrl: imageUrl,
          googleIDs: this.state.addedMembers,
          key: response.data.chatID
        })
        .then((response) => {
          this.addRoomIdToUsers(response.data.data);
          this.setState({roomID: response.data.data});
        })
        .then(() => {
          this.enterRoom(this.state.roomID);
        })
        .catch(err => {
          console.error(err);
        });
        })
      } else if (this.state.images.length <= 1 && this.state.isEditing) {
        /*axios.post(`http://localhost:5000/studyrooms/updateInfo`, {
          key: this.state.roomID,
          name: this.state.name,
          imageUrl: imageUrl,
          isThereImage: (this.state.images.length == 1)
        })*/
        await updateRoomDetails(this.state.roomID, this.state.name,
        imageUrl, this.state.images.length == 1);
        this.enterRoom(this.state.roomID);
      } else {
        alert("Please choose only one image as the study room profile picture");
      }
    });
  }

  componentWillUnmount() {
    if (!this.state.isSubmitted && this.state.images.length > 0 &&
      !this.state.isEditing) {
      this.deleteUnpostImages();
    }
  }

  async deleteUnpostImages() {
    await deleteImages(this.state.images);
  }

  addRoomIdToUsers(roomID) {
    //must add the roomID to the user's roomID
    for (var i = 0; i < this.state.addedMembers.length; i++) {
      this.addRoomIdToUser(roomID, this.state.addedMembers[i]);
    }
  }

  addRoomIdToUser(roomID, googleID) {
    axios.post('http://localhost:5000/users/addRoomID', {
      roomID: roomID,
      googleID: googleID
    })
    .catch((err) => {
      console.error(err);
    });
  }

  enterRoom(id) {
    enterRoom(this.props.history, id);
  }

  handleRoomMember(id) {
    if (this.state.addedMembers.includes(id)) {
      var res = this.state.addedMembers.filter(added => {
        return added == id;
      })
        this.setState({ addedMembers: res });
    } else {
        this.state.addedMembers.push(id);
        this.setState({ addedMembers: this.state.addedMembers });
      }
  }

  render() {
    if (!this.state.isLoaded) {
      return <div className="container" style={{margin:"auto"}}>
        <CircularProgress/>
      </div>
    }
    if (this.state.isLoaded && !this.state.isAuthenticated) {
        return <Redirect to="/"/>;
    }
    return (
      <div>
        <NavBar history={this.props.history}/>
        <div style={styles.container}>
        <h3>Study Room Details</h3>
              <div className="input-group" style={styles.bar}>
                  <label style={styles.title} htmlFor="name">Study Room Name: </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.titleInput}/>
              </div>
              <div className="input-group" style={styles.bar}>
              <label style={styles.content} htmlFor="bio">Add Members: </label>
              {!this.state.isEditing && <div className="container" id="scrollableArea">
                <Form>
                  {this.state.friends.map((contact) => {
                  return (
                    <div key={`${contact.name}`} className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id={`${contact.name}`}
                      label={`${contact.name}`}
                      onChange={() => this.handleRoomMember(contact.id)}
                    />
                    </div>
                  );
                })}
                </Form>
              </div>}
                <div>
                <label style={styles.title} htmlFor="name">Profile picture: </label>
                <Upload
                  handleImages={this.handleImages}
                  images={this.state.images}
                />
                </div>
              </div>
            <button onClick={this.onSubmit} className="btn btn-primary">Submit</button>
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
      token: state.token
    }
}

export default connect(mapStateToProps, {}) (CreateRoomForm);
