import React from 'react';
import { Row, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import './RequestNotification.css';
import UserCard from './UserCard';

export default function RequestNotification(props) {
  return (
    <div>
      <div className="d-flex justify-content-center align-middle"
      style={styles.row}>
        <UserCard name={props.name} imageUrl={props.imageUrl}/>
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
    alignItems: 'center',
    display: 'flex',
    alignText: 'center'
  },
  icon: {
    width: '20px',
    color: "green",
    marginLeft: "30px",
  },
  deleteIcon: {
    width: '20px',
    color: "red",
    marginLeft: "15px",
  }
}
