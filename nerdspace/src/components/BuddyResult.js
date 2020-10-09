import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBCardGroup, MDBContainer } from "mdbreact";

export default function BuddyResult(props) {
  return (
    // <Card className="shadow-sm p-3 mb-5 bg-white rounded" style={styles.card}>
    //     <Card.Body>
    //         <Card.Title>{props.name}</Card.Title>
    //         <Card.Text>
    //             {props.gender}
    //             {props.email}
    //             {props.educationLevel}
    //         </Card.Text>
    //         <Row style={{marginLeft: 10, marginRight:10, alignSelf:'right'}}>
    //             <Col>
    //             </Col>
    //             <Col md="auto">
    //                 <a onClick={() => props.sendMessage(props.id)}>
    //                   <FontAwesomeIcon icon={faEnvelope} style={{alignSelf:'right'}} />
    //                 </a>
    //             </Col>
    //         </Row>
    //     </Card.Body>
    // </Card>
        <MDBContainer>
        <MDBCardGroup deck style={{flex: 1, flexWrap:"wrap"}}>
          <MDBCard>
            <MDBCardBody>
              <Card.Img variant="top" src="https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80" />
              <MDBCardTitle tag="h5">{props.name}</MDBCardTitle>
              <MDBCardText>
                <h5>Gender: {props.gender}</h5>
                <h5>Email: {props.email}</h5>
                <h5>Education Level: {props.educationLevel}</h5>
                <h5>Year Of Study: {props.year}</h5>
              </MDBCardText>
            </MDBCardBody>
            <MDBCardFooter medium muted>
              <Row style={{marginLeft: 10, marginRight:10, alignSelf:'right'}}>
                <Col md="auto">
                  <a onClick={() => props.sendMessage(props.id)}>
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
