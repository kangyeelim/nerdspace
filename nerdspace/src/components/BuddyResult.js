import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function BuddyResult(props) {
  return (
    <Card className="shadow-sm p-3 mb-5 bg-white rounded" style={styles.card}>
        <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
                {props.gender}
                {props.email}
                {props.educationLevel}
            </Card.Text>
            <Row style={{marginLeft: 10, marginRight:10, alignSelf:'right'}}>
                <Col>
                </Col>
                <Col md="auto">
                    <a onClick={() => props.sendMessage(props.id)}>
                    <FontAwesomeIcon icon={faEdit} style={{alignSelf:'right'}}/>
                    </a>
                </Col>
            </Row>
        </Card.Body>
    </Card>
  );
}

const styles = {
  card: {
    width:"57vw",
    justifyContent:'center',
    alignText: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginTop: "10px"
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginLeft: "20px"
  }
}
