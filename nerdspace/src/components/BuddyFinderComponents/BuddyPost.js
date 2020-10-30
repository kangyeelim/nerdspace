import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardFooter, MDBCardGroup, MDBContainer } from "mdbreact";

export default function BuddyPost(props) {

  return (
    <MDBContainer style={{ minWidth: "50vw" }}>
      <MDBCardGroup deck style={{alignSelf:'center', textAlign: "center", justifyContent: 'center'}}>
        <MDBCard style={{ width: "60rem" }}>
          <MDBCardBody>
            <MDBCardTitle tag="h2" style={{fontSize: 30, fontWeight: 600, textDecoration: "underline"}}>Form {props.index}</MDBCardTitle>

              <p style={{fontSize: 20, fontWeight: 600}}>Gender: {props.gender}</p>
              <p style={{fontSize: 20, fontWeight: 600}}>Education Level: {props.educationLevel}</p>
              <p style={{fontSize: 20, fontWeight: 600}}>Year Of Study: {props.yearOfStudy}</p>
              <p style={{fontSize: 20, fontWeight: 600}}>Interest: {props.interest}</p>

          </MDBCardBody>
          <MDBCardFooter small muted>
            <Row style={{marginLeft: 10, marginRight:10, alignSelf:'center'}}>
              <Col md="auto">
                <button type="button"  onClick={() => props.deletePost(props.id)}>
                  <FontAwesomeIcon className="icon" icon={faTrashAlt} style={{alignSelf:'right'}}/>
                </button>
              </Col>
              <Col md="auto">
                <button type="button"  onClick={() => props.submitPost(props.id, props.gender, props.educationLevel, props.yearOfStudy, props.interest)}>
                  <FontAwesomeIcon icon={faPaperPlane} style={{alignSelf:'right'}}/>
                </button>
              </Col>
            </Row>
          </MDBCardFooter>
        </MDBCard>
      </MDBCardGroup>
    </MDBContainer>
  );
}
