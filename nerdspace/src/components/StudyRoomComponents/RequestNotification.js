import React from 'react';
import { Row, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import './RequestNotification.css';

export default function RequestNotification(props) {
  return (
    <div>
      <div className="d-flex justify-content-center align-middle"
      style={styles.rows}>
        <Image src={props.imageUrl} style={styles.image}/>
        <p style={styles.name}>{props.name}</p>
        <FontAwesomeIcon id="acceptIcon" icon={faUserPlus} style={styles.icon}
        onClick={props.acceptRequest}/>
        <FontAwesomeIcon id="deleteIcon" icon={faUserSlash} style={styles.deleteIcon}
        onClick={props.rejectRequest}/>
      </div>
    </div>
  );
}

const styles = {
  row: {
    alignText: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  image: {
    width: "20%",
    height: "20%",
    borderRadius: "50%",
    marginRight: "10px"
  },
  icon: {
    width: '20px',
    color: "green",
    marginLeft: "30px",
    marginTop: "6%",
  },
  deleteIcon: {
    width: '20px',
    color: "red",
    marginLeft: "15px",
    marginTop: "6%",
  },
  name: {
    marginTop: "4%"
  }
}
