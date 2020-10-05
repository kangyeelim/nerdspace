import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function BuddyPost(props) {
  return (
    // <Card className="shadow-sm p-3 mb-5 bg-white rounded" style={styles.card}>
    <Card text="white" border="light" style={styles.card}>
    text="white" border="light" style={styles.card}
        <i class="fas fa-paper-plane"></i>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {props.gender}
        {props.educationLevel}
        {props.yearOfStudy}
        <Row style={{marginLeft: 10, marginRight:10, alignSelf:'right'}}>
          <Col>
          </Col>
          <Col md="auto">
            <a onClick={() => props.submitPost(props.id)}>
              <FontAwesomeIcon icon={faPaperPlane} style={{alignSelf:'right'}}/>
            </a>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

const styles = {
//   card: {
//     width:"57vw",
//     justifyContent:'center',
//     alignText: 'center',
//     alignItems: 'center',
//     display: 'flex',
//     flexDirection: 'row',
//     marginTop: "10px"
//   },

  card: {
    width: '18rem',
    height: "auto",
    borderRadius: "10%",
    backgroundColor: "#A9A9A9",
    marginLeft: 0
  }
}
