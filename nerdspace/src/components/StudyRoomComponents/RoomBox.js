import React from "react";
import { Card, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

class RoomBox extends React.Component {
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
          <Card.Text>Room ID: {this.props.id}</Card.Text>
          {this.props.hasAccess && <Button variant="primary" onClick={this.props.enter}>Enter</Button>}
          {!this.props.hasAccess && !this.props.hasRequested &&
            <Button variant="info" onClick={this.props.requestJoin}>Request to Join</Button>}
          {!this.props.hasAccess && this.props.hasRequested &&
            <Button variant="info">Requested</Button>}
        </Card.Body>
      </Card>
    );
  }
}

const styles = {
  card: {
    width: '80vw',
    marginTop: '40px',
    justifyContent:'center',
    alignText: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginLeft: "20px"
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (RoomBox);
