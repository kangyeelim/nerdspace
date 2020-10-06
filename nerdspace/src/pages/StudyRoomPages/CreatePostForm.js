import React from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row, Image } from 'react-bootstrap';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import { Redirect } from 'react-router-dom';
import Upload from '../../components/StudyRoomComponents/Upload';

class CreatePostForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      isSubmitted: false,
      images: [],
      isEditing: false,
      key: null
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.titleInput = this.titleInput.bind(this);
    this.contentInput = this.contentInput.bind(this);
    this.returnToRoom = this.returnToRoom.bind(this);
    this.handleImages = this.handleImages.bind(this);
    this.deleteUnpostImages = this.deleteUnpostImages.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.location.state.title != 'undefined') {
      console.log("should nt");
      this.setState({title:this.props.location.state.title,
        content:this.props.location.state.content,
        images:this.props.location.state.postImages,
        key:this.props.location.state.key,
        isEditing:true});
    }
  }

  titleInput(e) {
    this.setState({title: e.currentTarget.value});
  }

  contentInput(e) {
    this.setState({content: e.currentTarget.value});
  }

  onSubmit() {
    if (!this.state.isEditing) {
      this.setState({isSubmitted: true}, () => {
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
      this.setState({isSubmitted: true}, () => {
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

  deleteUnpostImages() {
    axios.post('http://localhost:5000/images/delete', {
      images: this.state.images
    })
      .catch(error => {
        console.error(error);
      });

  }

  returnToRoom() {
    this.props.history.push({
      pathname:`/room/${this.props.location.state.id}`,
      state: {
        roomName: this.props.location.state.roomName,
        imageUrl: this.props.location.state.imageUrl,
        id: this.props.location.state.id
      }
    });
  }

  render() {
    return (
      <div>
        <NavBar history={this.props.history}/>
        <Container>
        <Col>
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
            <button onClick={this.onSubmit} className="btn btn-primary">Post</button>
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
    image: {
      width: "85vw",
      height: "auto"
    }
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
    }
}

export default connect(mapStateToProps, {}) (CreatePostForm);
