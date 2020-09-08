import React from "react";
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class RoomSideBar extends React.Component {
    render() {
        return (
          <Card style={styles.card}>
            <Card.Body>
              <Card.Title>Members</Card.Title>
            </Card.Body>
            <Card.Body>
              <Card.Title>Files</Card.Title>
            </Card.Body>
            <Card.Body>
              <Card.Title>Requests</Card.Title>
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
    width: "20vw",
    minWidth: "280px",
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (RoomSideBar);
