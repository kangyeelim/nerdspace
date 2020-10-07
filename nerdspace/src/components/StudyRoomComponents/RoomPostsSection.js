import React from "react";
import { Card, Button, Row, Col, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import Post from './Post';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { deleteStudyRoomPost, findPostsByString, getAllRoomPosts } from '../../services/StudyRoomPostService';
import { goToCreatePostForm, goToEditPostForm } from '../../navigators/StudyRoomNavigator';

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

  async getAllRoomPosts() {
    var res = await getAllRoomPosts(this.props.id,
      (err) => this.setState({posts:[]}));
    var posts = await res.data;
    this.setState({posts: await posts});
  }

  handleSearchInput(e) {
    this.setState({searchKeyWord:e.currentTarget.value});
  }

  createPost() {
    goToCreatePostForm(this.props.history,
      this.props.id,
      this.props.imageUrl,
      this.props.roomName);
  }

  async search() {
    if (this.state.searchKeyWord !== "") {
      var res = await findPostsByString(this.props.id,
        this.state.searchKeyWord,
      (err) => this.setState({posts:[]}));
      var posts = await res.data;
      this.setState({posts: await posts})
    } else {
      this.getAllRoomPosts();
    }
  }

  editPost(id, title, content, imageUrls) {
    goToEditPostForm(this.props.history,
      id,
      imageUrls,
      title,
      content,
      this.props.id,
      this.props.roomName,
      this.props.imageUrl);
  }

  async deletePost(id, images) {
    await deleteStudyRoomPost(id, images);
    this.getAllRoomPosts();
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
                <Post
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
