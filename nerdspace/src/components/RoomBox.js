import React from "react";
import { Card, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';

class RoomBox extends React.Component {
    render() {
        return (
          <Card style={styles.card}>
            <Image variant="top" src={this.props.imageUrl} style={styles.image} />
            <Card.Body>
              <Card.Title>{this.props.roomName}</Card.Title>
              <Card.Text>Room ID: {this.props.id}</Card.Text>
              {this.props.hasAccess && <Button variant="primary" onClick={this.props.enter}>Enter</Button>}
              {!this.props.hasAccess && <Button variant="info" onClick={this.props.requestJoin}>Request to Join</Button>}
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