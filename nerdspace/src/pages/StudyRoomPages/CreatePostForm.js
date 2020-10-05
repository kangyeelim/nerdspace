import React from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import { Redirect } from 'react-router-dom';

class CreatePostForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      isSubmitted: false,
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.titleInput = this.titleInput.bind(this);
    this.contentInput = this.contentInput.bind(this);
    this.returnToRoom = this.returnToRoom.bind(this);
  }

  titleInput(e) {
    this.setState({title: e.currentTarget.value});
  }

  contentInput(e) {
    this.setState({content: e.currentTarget.value});
  }

  onSubmit() {
    axios.post('http://localhost:5000/studyroomposts', {
      title: this.state.title,
      content: this.state.content,
      isThereImage: false,
      imageUrl: "",
      roomID: this.props.location.state.id,
      googleID: this.props.profile[0].googleId
    })
    .catch(err => {
      console.error(err);
    });
    this.returnToRoom();
  }

  returnToRoom() {
    this.props.history.push({
      pathname:'/room',
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
        <h3>Create a New Post</h3>
          <form className="form">
              <div className="input-group" style={styles.bar}>
                  <label style={styles.title} htmlFor="name">Title: </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    onChange={this.titleInput}/>
              </div>
              <div className="input-group" style={styles.bar}>
                  <label style={styles.content} htmlFor="bio">Content: </label>
                  <textarea
                    rows="8"
                    type="text"
                    className="form-control"
                    placeholder="Elaborate more..."
                    onChange={this.contentInput}/>
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
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
    }
}

export default connect(mapStateToProps, {}) (CreatePostForm);
