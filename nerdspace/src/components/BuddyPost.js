import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function BuddyPost(props) {
  return (
    // <Card className="shadow-sm p-3 mb-5 bg-white rounded" style={styles.card}>
    <Card text="white" border="light" style={styles.card}>
    text="white" border="light" style={styles.card}
        <i class="fas fa-paper-plane"></i>
      <Card.Body>
        {props.isThereimage && <Image variant="top" src={props.imageUrl} style={styles.image} />}
        <Card.Title>{props.title}</Card.Title>
        {props.content}
        <Row style={{marginLeft: 10, marginRight:10, alignSelf:'right'}}>
          <Col>
          </Col>
          {/* <Col md="auto">
            <a onClick={() => props.editPost(props.id)}>
              <FontAwesomeIcon icon={faEdit} style={{alignSelf:'right'}}/>
            </a>
          </Col>
          <Col md="auto">
            <a onClick={() => props.deletePost(props.id)}>
              <FontAwesomeIcon icon={faTrashAlt} style={{alignSelf:'right'}}/>
            </a>
          </Col> */}
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
