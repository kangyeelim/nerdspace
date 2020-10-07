import React from 'react';
import { Image } from 'react-bootstrap';

export default function UserCard(props) {
  return (
    <div style={styles.row}>
      <Image src={props.imageUrl} style={styles.image}/>
      <p style={styles.name}>{props.name}</p>
    </div>
  );
}

const styles = {
  row: {
    alignText: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    width: "20%",
    height: "20%",
    borderRadius: "50%",
  },
  name: {
    marginTop: "5%",
    marginLeft: "10px"
  }
}
