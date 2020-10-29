import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardFooter, MDBCardGroup, MDBContainer } from "mdbreact";

export default function BuddyResult(props) {
  return (
        <MDBContainer>
        <MDBCardGroup deck style={styles.card}>
          <MDBCard>
            <MDBCardBody>
              {/* <Card.Img variant="top" style={{width: "7", height: "7"}} src="https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80" /> */}
              <Card.Img variant="top" style={{width: "8", height: "8", padding: "1.5rem"}} src={props.imageUrl} />
              <MDBCardTitle tag="h5" style={{fontSize: 25, fontWeight: 650}}>{props.name}</MDBCardTitle>
                <p style={{fontSize: 20, fontWeight: 600}}>Gender: {props.gender}</p>
                <p style={{fontSize: 20, fontWeight: 600}}>Email: {props.email}</p>
                <p style={{fontSize: 20, fontWeight: 600}}>Education Level: {props.educationLevel}</p>
                <p style={{fontSize: 20, fontWeight: 600}}>Year Of Study: {props.year}</p>
            </MDBCardBody>
            <MDBCardFooter muted>
              <Row style={{marginLeft: 10, marginRight:10, alignSelf:'right'}}>
                <Col md="auto">
                  <a onClick={() => props.sendMessage(props.googleID)}>
                    <FontAwesomeIcon className="icon" icon={faEnvelope} style={{alignSelf:'right'}}/>
                  </a>
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
    width:"25vw",
    height: "44rem",
    display: 'flex',
    flexWrap: "wrap",
    flexDirection: 'column',
    // alignSelf: "left",
    // alignItems: "flexStart",
    // alignContent: "flexStart",
    
    justifyContent:'center',
    // alignText: 'center',
    // alignItems: 'center',
    // marginTop: "10px"
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    // marginLeft: "20px"
  }
}
