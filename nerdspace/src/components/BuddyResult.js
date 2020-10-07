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
      //   <MDBContainer>
      //   <MDBCardGroup deck style={{flex: 1, flexWrap:"wrap"}}>
      //     <MDBCard>
      //       <MDBCardBody>
      //         <Card.Img variant="top" src="https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80" />
      //         <MDBCardTitle tag="h5">Panel title</MDBCardTitle>
      //         <MDBCardText>
      //           <h5>Gender: {props.gender}</h5>
      //           <h5>{props.educationLevel}</h5>
      //           <h5>Year Of study: {props.yearOfStudy}</h5>
      //         </MDBCardText>
      //       </MDBCardBody>
      //       <MDBCardFooter medium muted>
      //         <Row style={{marginLeft: 10, marginRight:10, alignSelf:'right'}}>
      //           <Col md="auto">
      //             <a onClick={() => props.deletePost(props.id)}>
      //               <FontAwesomeIcon className="icon" icon={faTrashAlt} style={{alignSelf:'right'}}/>
      //             </a>
      //           </Col>
      //           <Col md="auto">
      //             <a onClick={() => props.submitPost(props.id)}>
      //               <FontAwesomeIcon icon={faPaperPlane} style={{alignSelf:'right'}}/>
      //             </a>
      //           </Col>
      //         </Row>
      //       </MDBCardFooter>
      //     </MDBCard>
      //     <MDBCard>
      //       <MDBCardBody>
      //         <MDBCardTitle tag="h5">Panel title</MDBCardTitle>
      //         <MDBCardText>
      //           This is a wider panel with supporting text below as a natural
      //           lead-in to additional content. This panel has even longer
      //           content than the first to show that equal height action.
      //         </MDBCardText>
      //       </MDBCardBody>
      //       <MDBCardFooter small muted>
      //         Last updated 3 mins ago
      //       </MDBCardFooter>
      //     </MDBCard>
      //   </MDBCardGroup>
      // </MDBContainer>
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
