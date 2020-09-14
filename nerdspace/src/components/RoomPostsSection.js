import React from "react";
import { Card, Button, Row, Col, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import Post from './Post';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const dummy = [{id:1, isThereimage: false, content: "This is dummy post with no content.", title:"Dummy title"}];

class RoomPostsSection extends React.Component {

    constructor() {
      super();
      this.state ={
        posts: [],
      }
      this.editPost = this.editPost.bind(this);
      this.deletePost = this.deletePost.bind(this);
      this.handleSearchInput = this.handleSearchInput.bind(this);
      this.search = this.search.bind(this);
    }

    componentDidMount() {
      axios.get(`http://localhost:5000/studyroomposts`)
        .then(res => {
          this.setState({posts: res.data.data});
        });
    }

    handleSearchInput(e) {
      this.setState({searchKeyWord:e.currentTarget.value});
    }

    search() {

    }

    editPost(id) {

    }

    deletePost(id) {

    }

    render() {
        return (
        <div>
          <div style={{display: "flex", marginTop: "30px"}}>
            <FormControl onChange={this.handleSearchInput} type="text" placeholder="Search for posts" className="mr-sm-2" style={{maxWidth: "44vw"}}/>
            <Button  variant="outline-primary"onClick={this.search} style={{marginRight: "20px"}}>Search</Button>
            <Button variant="primary" onClick={this.props.createPost} style={{marginRight: "30px"}}>Create post</Button>
          </div>
          <Card style={styles.card}>
            <Card.Body>
              <Row>
              <Col>
              <Card.Title>Posts</Card.Title>
              {this.state.posts.map((post) => {
                return <Post
                key={post.key}
                id={post.key}
                isThereimage={post.isThereImage}
                content={post.content}
                title={post.title}
                deletePost={this.deletePost}
                editPost={this.editPost}/>;
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
