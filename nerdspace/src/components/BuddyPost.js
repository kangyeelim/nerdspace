import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBCardGroup, MDBContainer } from "mdbreact";

export default function BuddyPost(props) {
  return (
    <MDBContainer>
      <MDBCardGroup deck style={{flex: 1, flexDirection: "row", flexWrap: "wrap", alignSelf:'right'}}>
        <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
          <MDBCardBody>
            <MDBCardTitle tag="h2" style={{fontSize: 40, fontWeight: 600}}>Form {props.id}</MDBCardTitle>

              <p style={{fontSize: 20, fontWeight: 600}}>Gender: {props.gender}</p>
              <p style={{fontSize: 20, fontWeight: 600}}>Education Level: {props.educationLevel}</p>
              <p style={{fontSize: 20, fontWeight: 600}}>Year Of Study: {props.yearOfStudy}</p>
              <p style={{fontSize: 20, fontWeight: 600}}>Interest: {props.interest}</p>

          </MDBCardBody>
          <MDBCardFooter small muted>
            <Row style={{marginLeft: 10, marginRight:10, alignSelf:'right'}}>
              <Col md="auto">
                <a onClick={() => props.deletePost(props.id)}>
                  <FontAwesomeIcon className="icon" icon={faTrashAlt} style={{alignSelf:'right'}}/>
                </a>
              </Col>
              <Col md="auto">
                <a onClick={() => props.submitPost(props.id, props.gender, props.educationLevel, props.yearOfStudy, props.interest)}>
                  <FontAwesomeIcon icon={faPaperPlane} style={{alignSelf:'right'}}/>
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
