import React from "react";
import { Card, Button, Row, Col, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import Post from './Post';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { deleteStudyRoomPost } from '../../services/StudyRoomPostService';

class RoomPostsSection extends React.Component {

    constructor() {
      super();
      this.state ={
        posts: [],
        searchKeyWord: ""
      }
      this.editPost = this.editPost.bind(this);
      this.deletePost = this.deletePost.bind(this);
      this.handleSearchInput = this.handleSearchInput.bind(this);
      this.search = this.search.bind(this);
      this.createPost = this.createPost.bind(this);
      this.getAllRoomPosts = this.getAllRoomPosts.bind(this);
    }

    componentDidMount() {
      this.getAllRoomPosts();
    }

    getAllRoomPosts() {
      axios.get(`http://localhost:5000/studyroomposts/getByRoom/${this.props.id}`)
        .then(res => {
          this.setState({posts: res.data.data});
        })
        .catch(err => {
          this.setState({posts:[]});
        });
    }

    handleSearchInput(e) {
      this.setState({searchKeyWord:e.currentTarget.value});
    }

    createPost() {
      this.props.history.push({
        pathname: `/createPost/${this.props.id}`,
        state: {
          id: this.props.id,
          roomName: this.props.roomName,
          imageUrl: this.props.imageUrl
        }
      });
    }

    search() {
      if (this.state.searchKeyWord !== "") {
        axios.get(`http://localhost:5000/studyroomposts/byKeyword/${this.props.id}/${this.state.searchKeyWord}`)
          .then((res) => {
            console.log(res.data.data);
            this.setState({posts: res.data.data});
          })
          .catch(err => {
            this.setState({posts:[]});
          })
      } else {
        this.getAllRoomPosts();
      }
    }

    editPost(id, title, content, imageUrl) {
      this.props.history.push({
        pathname:`/createPost/${this.props.id}`,
        state: {
          key: id,
          postImages: imageUrl,
          title: title,
          content: content,
          id: this.props.id,
          roomName: this.props.roomName,
          imageUrl: this.props.imageUrl
        }
      });
    }

    deletePost(id, images) {
      deleteStudyRoomPost(id, images,
        (res) => {this.getAllRoomPosts()});
    }

    render() {
        return (
        <div>
          <div style={{display: "flex", marginTop: "30px"}}>
            <FormControl onChange={this.handleSearchInput} type="text" placeholder="Search for posts" className="mr-sm-2" style={{maxWidth: "44vw"}}/>
            <Button  variant="outline-primary"onClick={this.search} style={{marginRight: "20px"}}>Search</Button>
            <Button variant="primary" onClick={this.createPost} style={{marginRight: "30px"}}>Create post</Button>
          </div>
          <Card style={styles.card}>
            <Card.Body>
              <Row>
              <Col>
              <Card.Title>Posts</Card.Title>
              {this.state.posts.map((post) => {
                return <div key={post.key}>
                <Post key={post.key}
                id={post.key}
                images={post.isThereImage? Object.values(post.imageUrl): []}
                content={post.content}
                title={post.title}
                deletePost={this.deletePost}
                editPost={this.editPost}
                canEditAndDelete={post.googleID == this.props.profile[0].googleId}
                />
                </div>
              })}
              </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
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
    minWidth: "475px",
    width: "58vw"
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (RoomPostsSection);
