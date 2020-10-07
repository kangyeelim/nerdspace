import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Post.css';

export default function Post(props) {
  return (
    <Card className="shadow-sm p-3 mb-5 bg-white rounded" style={styles.card}>
      <Card.Body>

        <Card.Title>{props.title}</Card.Title>
        {props.content}
        {props.images.map(url => {
            return <div key={url}>
            <Image key={url} style={styles.image} src={url}/>
            </div>
          })}
        {props.canEditAndDelete && (
          <Row style={{marginLeft: 10, marginRight:10, alignSelf:'right'}}>
            <Col>
            </Col>
            <Col md="auto">
              <a onClick={() => props.editPost(props.id, props.title, props.content, props.images)}>
                <FontAwesomeIcon className="icon" icon={faEdit} style={{alignSelf:'right'}}/>
              </a>
            </Col>
            <Col md="auto">
              <a onClick={() => props.deletePost(props.id, props.images)}>
                <FontAwesomeIcon className="icon" icon={faTrashAlt} style={{alignSelf:'right'}}/>
              </a>
            </Col>
          </Row>
        )}
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
    width: "55vw",
    height: "auto",
    marginTop: "30px"
  }
}
