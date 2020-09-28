import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { connect } from 'react-redux';

export default function TitleCard(props) {
  return (
    <Card style={styles.card}>
      <Image variant="top" src={props.imageUrl} style={styles.image} />
      <Card.Body>
        <Card.Title>{props.roomName}</Card.Title>
        <p>ID: {props.id}</p>
      </Card.Body>
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
  }
}
