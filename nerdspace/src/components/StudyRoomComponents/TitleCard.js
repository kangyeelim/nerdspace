import React from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

class TitleCard extends React.Component {
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
        {this.state.isFullScreen && <Lightbox image={this.props.imageUrl} title="" onClose={() => this.closeFullScreen()}/>}
        {!this.state.isFullScreen && <Image variant="top" src={this.props.imageUrl} style={styles.image} onClick={this.openFullScreen} />}
        <Card.Body>
          <Card.Title>{this.props.roomName}</Card.Title>
          <p>ID: {this.props.id}</p>
        </Card.Body>
        <a onClick={() => this.props.editRoom(this.props.id, this.props.roomName, this.props.imageUrl)}>
          <FontAwesomeIcon className="icon" icon={faEdit} style={{marginRight:'20px'}}/>
        </a>
        <Button style={styles.button} variant="danger" onClick={() => this.props.leaveRoom(this.props.id)}>Leave Room</Button>
      </Card>
    );
  }
}

const styles = {
  card: {
    width: "100%",
    alignText: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: "15px",
    marginRight: "15px",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginLeft: "20px"
  },
  button: {
    marginRight: "20px"
  }
}

export default TitleCard;
