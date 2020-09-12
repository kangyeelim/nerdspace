import React from "react";
import { Card, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Post from './Post';

const dummy = [{id:1, isThereimage: false, content: "This is dummy post with no content.", title:"Dummy title"}];

class RoomPostsSection extends React.Component {

    constructor() {
      super();
      this.state ={
        posts: []
      }
      this.editPost = this.editPost.bind(this);
      this.deletePost = this.deletePost.bind(this);
    }

    async componentDidMount() {
      const response = await fetch(`http://localhost:5000/studyRoomPosts`, {
    	   "method": "GET"
      });
      const result = await response.json()
      this.setState({posts: result.data});
    }

    editPost(id) {

    }

    deletePost(id) {

    }

    render() {
        return (
          <Card style={styles.card}>
            <Card.Body>
              <Row>
              <Col>
              <Card.Title>Posts</Card.Title>
              {this.state.posts.map((post) => {
                return <Post
                key={post.key}
                id={post.key}
                isThereimage={post.isThereimage}
                content={post.content}
                title={post.title}
                deletePost={this.deletePost}
                editPost={this.editPost}/>;
              })}
              </Col>
              </Row>
            </Card.Body>
          </Card>
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
