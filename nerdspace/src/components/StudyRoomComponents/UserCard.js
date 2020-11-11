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
    justifyContent: 'flex-start',
    padding: "10px",
    paddingLeft: "10%",
  },
  image: {
    width: "30%",
    height: "30%",
    borderRadius: "50%",
  },
  name: {
    display: 'flex',
    alignContents: "center",
    justifyContent: 'flex-start',
    marginTop: "5%",
    marginLeft: "5%"
  }
}
