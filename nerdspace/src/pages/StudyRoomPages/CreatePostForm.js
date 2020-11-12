import React from 'react';
import { connect } from 'react-redux';
import { Container, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Upload from '../../components/StudyRoomComponents/Upload';
import { deleteImages } from '../../services/ImageService';
import { createNewPost, updateExistingPost } from '../../services/StudyRoomPostService';
import { enterRoom } from '../../navigators/StudyRoomNavigator';
import { isRoomAccessibleToUser, isTokenAccepted } from '../../services/Auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from "../../components/NavigationComponents/NavBar";

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);
    const roomID = props.match.params.id;
    this.state = {
      title: "",
      content: "",
      isSubmitted: false,
      images: [],
      isEditing: false,
      key: null,
      roomId: roomID,
      isAuthenticating: true,
      isAuthenticated: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.titleInput = this.titleInput.bind(this);
    this.contentInput = this.contentInput.bind(this);
    this.returnToRoom = this.returnToRoom.bind(this);
    this.handleImages = this.handleImages.bind(this);
    this.deleteUnpostImages = this.deleteUnpostImages.bind(this);
  }

  async componentDidMount() {
    var isAuthenticated = await isRoomAccessibleToUser(this.props.profile[0].googleId,
      this.state.roomId) && isTokenAccepted(this.props.token);
    this.setState({isAuthenticated:await isAuthenticated});
    if (typeof this.props.location.state != 'undefined' && typeof this.props.location.state.title != 'undefined') {
      this.setState({title:this.props.location.state.title,
        content:this.props.location.state.content,
        images:this.props.location.state.postImages,
        key:this.props.location.state.key,
        isEditing:true});
    }
    this.setState({isAuthenticating:false});
  }

  titleInput(e) {
    this.setState({title: e.currentTarget.value});
  }

  contentInput(e) {
    this.setState({content: e.currentTarget.value});
  }

  async onSubmit() {
    this.setState({isSubmitted:true});

    if (!this.state.isEditing) {
      this.setState({isSubmitted: true}, async () => {
        var images = this.state.images.map((imageData) => {
          return imageData.secure_url;
        })
        axios.post('http://localhost:5000/studyroomposts', {
          title: this.state.title,
          content: this.state.content,
          isThereImage: this.state.images.length > 0,
          imageUrl: this.state.images.length == 0? []: images,
          roomID: this.props.location.state.id,
          googleID: this.props.profile[0].googleId
        })
        .catch(err => {
          console.error(err);
        });
        this.returnToRoom();
      });
    } else {
      this.setState({isSubmitted: true}, async () => {
        axios.post(`http://localhost:5000/studyroomposts/update`, {
          key:this.state.key,
          title:this.state.title,
          content:this.state.content
        })
        .catch(err => {
          console.error(err);
        })
        this.returnToRoom();
      });
    }
  }

  handleImages(images) {
    this.setState({images:images});
  }

  componentWillUnmount() {
    if (!this.state.isSubmitted && this.state.images.length > 0) {
      this.deleteUnpostImages();
    }
  }

  async deleteUnpostImages() {
    await deleteImages(this.state.images);
  }

  returnToRoom() {
    enterRoom(this.props.history,
      this.props.location.state.id,
      this.props.location.state.imageUrl,
      this.props.location.state.roomName)
  }

  render() {
    if (this.state.isAuthenticating) {
      return <div className="container" style={{margin:"auto"}}>
        <CircularProgress/>
      </div>
    }
    if (!this.state.isAuthenticated) {
      return <Redirect to="/community"/>;
    }
    return (
      <div>
        <NavBar history={this.props.history}/>
        <div style={styles.container}>
        <h3>Post Details</h3>
          <form className="form">
              <div className="input-group" style={styles.bar}>
                  <label style={styles.title} htmlFor="name">Title: </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.titleInput}/>
              </div>
              <div className="input-group" style={styles.bar}>
                  <label style={styles.content} htmlFor="bio">Content: </label>
                  <textarea
                    rows="8"
                    type="text"
                    className="form-control"
                    placeholder="Elaborate more..."
                    value={this.state.content}
                    onChange={this.contentInput}/>
              </div>
              <div>
                {!this.state.isEditing && (
                  <Upload
                  handleImages={this.handleImages}
                  images={this.state.images}
                  />
                )}
                {this.state.isEditing && (
                    this.state.images.map(url => {
                      return <Image src={url} style={styles.image}/>
                    })
                )}
              </div>
            <button onClick={this.onSubmit} className="btn btn-primary">Submit</button>
          </form>
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
    image: {
      width: "85vw",
      height: "auto"
    }
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
      token: state.token
    }
}

export default connect(mapStateToProps, {}) (CreatePostForm);
