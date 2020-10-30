import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardFooter, MDBCardGroup, MDBContainer } from "mdbreact";

export default function BuddyResult(props) {
  return (
        <MDBContainer>
        <MDBCardGroup deck style={styles.card}>
          <MDBCard>
            <MDBCardBody>
              <Card.Img variant="top" style={{width: "50rem", height: "40rem", padding: "1.5rem", overflow: "hidden"}} src={props.imageUrl} />
              <MDBCardTitle tag="h5" style={{fontSize: 25, fontWeight: 650}}>{props.name}</MDBCardTitle>
                <p style={{fontSize: 20, fontWeight: 600}}>Gender: {props.gender}</p>
                <p style={{fontSize: 20, fontWeight: 600}}>Email: {props.email}</p>
                <p style={{fontSize: 20, fontWeight: 600}}>Education Level: {props.educationLevel}</p>
                <p style={{fontSize: 20, fontWeight: 600}}>Year Of Study: {props.year}</p>
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
        </MDBCardGroup>
      </MDBContainer>
  );
}

const styles = {
  card: {
    width:"50vw",
    height: "55rem",
    display: 'flex',
    flexWrap: "wrap",
    flexDirection: 'column',
    // alignSelf: "left",
    justifyContent:'center',
    // alignText: 'center',
    // alignItems: 'center',
    // marginTop: "10px"
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  }
}
