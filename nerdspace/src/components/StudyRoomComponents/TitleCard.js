import React from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function TitleCard(props) {
  return (
    <Card style={styles.card}>
      <Image variant="top" src={props.imageUrl} style={styles.image} />
      <Card.Body>
        <Card.Title>{props.roomName}</Card.Title>
        <p>ID: {props.id}</p>
      </Card.Body>
      <a onClick={() => props.editRoom(props.id, props.roomName, props.imageUrl)}>
        <FontAwesomeIcon className="icon" icon={faEdit} style={{marginRight:'20px'}}/>
      </a>
      <Button style={styles.button} variant="danger" onClick={() => props.leaveRoom(props.id)}>Leave Room</Button>
    </Card>
  );
}

const styles = {
  card: {
    width: '83vw',
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
  },
  button: {
    marginRight: "20px"
  }
}
