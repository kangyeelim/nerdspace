import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import './RequestNotification.css';
import UserCard from './UserCard';

export default function RequestNotification(props) {
  return (
    <div>
      <Card style={styles.card}>
        <UserCard name={props.name} imageUrl={props.imageUrl}/>
        <div style={styles.row}>
        <FontAwesomeIcon id="acceptIcon" icon={faUserPlus} style={styles.icon}
        onClick={props.acceptRequest}/>
        <FontAwesomeIcon id="deleteIcon" icon={faUserSlash} style={styles.deleteIcon}
        onClick={props.rejectRequest}/>
        </div>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "30%",
  },
  card: {
    padding: "10px",
    marginTop: "15px",
    marginBottom: "15px",
  },
  row: {
    display: "flex",
  },
  icon: {
    width: '20px',
    color: "green",
    margin: "auto",
  },
  deleteIcon: {
    width: '20px',
    color: "red",
    margin: "auto",
  }
}
