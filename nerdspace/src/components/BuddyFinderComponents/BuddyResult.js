import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardFooter, MDBCardGroup, MDBContainer } from "mdbreact";

export default function BuddyResult(props) {
  return (

          <MDBCard style={styles.card}>
            <MDBCardBody>
              <Card.Img variant="top" style={styles.image} src={props.imageUrl} />
              <MDBCardTitle tag="h5" style={{marginTop:"10px"}}>{props.name}</MDBCardTitle>
                <p style={{fontSize: 16}}>Gender: {props.gender}</p>
                <p style={{fontSize: 16}}>Email: {props.email}</p>
                <p style={{fontSize: 16}}>Education Level: {props.educationLevel}</p>
                <p style={{fontSize: 16}}>Year Of Study: {props.year}</p>
            </MDBCardBody>
            <MDBCardFooter muted>
              <Row style={{marginLeft: 10, marginRight:10, alignSelf:'right'}}>
                <Col md="auto">
                  <button type="button" onClick={() => props.sendMessage(props.googleID)}>
                    <FontAwesomeIcon className="icon" icon={faEnvelope} style={{alignSelf:'right'}}/>
                  </button>
                </Col>
              </Row>
            </MDBCardFooter>
          </MDBCard>
  );
}

const styles = {
  card: {
    marginBottom: "30px"
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  }
}
