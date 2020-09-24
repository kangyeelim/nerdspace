import React from 'react';
import { Row, Image } from 'react-bootstrap';
import { connect } from 'react-redux';

export default function RequestNotification(props) {
  return (
    <div className="d-flex justify-content-center align-middle" style={styles.rows}>
      <Image src={props.imageUrl} style={styles.image}/>
      <p>{props.name}</p>
    </div>
  );
}

const styles = {
  row: {
    alignText: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: "20%",
    height: "20%",
    borderRadius: "50%",
    marginRight: "20px"
  }
}
