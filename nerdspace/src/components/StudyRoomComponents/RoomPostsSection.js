import React from "react";
import { Card, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import Post from './Post';
import { deleteStudyRoomPost, findPostsByString, getAllRoomPosts } from '../../services/StudyRoomPostService';
import { goToCreatePostForm, goToEditPostForm } from '../../navigators/StudyRoomNavigator';
import { Button } from "@material-ui/core";

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
    console.log(images);
    await deleteStudyRoomPost(id, images);
    this.getAllRoomPosts();
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.search}>
          <FormControl onChange={this.handleSearchInput} type="text" placeholder="Search for posts"/>
            <Button type="submit" size="medium" color="primary" variant="outlined" onClick={this.search} style={styles.buttonText}>Search</Button>
            <Button type="submit" size="medium" color="primary" variant="contained" onClick={this.createPost} style={styles.buttonText}>Create post</Button>
        </div>
          <Card style={styles.card}>
            <Card.Body>
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
            </Card.Body>
          </Card>
        </div>
        );
    }
}

const styles = {
  container: {
    margin: "auto",
  },
  search: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  buttonText: {
    flexWrap: "nowrap",
    width: "20vw",
    marginLeft: "10px",
  },
  card: {
    margin: "auto",
    backgroundColor: "#e1f2fb",
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (RoomPostsSection);
