import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import './Post.css';

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      isFullScreen: false
    }
    this.openFullScreen = this.openFullScreen.bind(this);
  }

  openFullScreen() {
    this.setState({isFullScreen:true});
  }

  closeFullScreen() {
    this.setState({isFullScreen:false});
  }

  render() {
    return (
      <Card style={styles.card}>
            <Card.Body style={styles.text}>
          <Card.Title>{this.props.title}</Card.Title>
          {this.props.content}
          {this.props.images.map(url => {
              return <div key={url}>
                {this.state.isFullScreen && <Lightbox image={url} title="" onClose={() => this.closeFullScreen()}/>}
                {!this.state.isFullScreen && <Image key={url} style={styles.image} src={url} onClick={this.openFullScreen}/>}
              </div>
            })}
          {this.props.canEditAndDelete && (
            <Row style={{marginLeft: 10, marginRight:10, alignSelf:'right'}}>
              <Col>
              </Col>
              <Col md="auto">
                <a onClick={() => this.props.editPost(this.props.id, this.props.title, this.props.content, this.props.images)}>
                  <FontAwesomeIcon className="icon" icon={faEdit} style={{alignSelf:'right'}}/>
                </a>
              </Col>
              <Col md="auto">
                <a onClick={() => this.props.deletePost(this.props.id, this.props.images)}>
                  <FontAwesomeIcon className="icon" icon={faTrashAlt} style={{alignSelf:'right'}}/>
                </a>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    );
  }
}

const styles = {
  card: {
    margin: "10px",
  },
  text: {
    color: "#3282b8",
  },
  image: {
    width: "80%",
    maxWidth: "100%",
    height: "auto",
  }
}

export default Post;
