import React from "react";
import { Card } from 'react-bootstrap';
import { MDBContainer } from "mdbreact";
import { Link } from 'react-router-dom';

const GroupBox = () => {
return (
    <MDBContainer className="ml-5 mr-5">
        <Card text="white" border="light" style={{ width: '18rem', borderRadius: "10%", backgroundColor: "#A9A9A9", marginLeft: 0 }}>
            <Card.Header style={styles.header}>
                <Card.Title>Study Groups</Card.Title>
            </Card.Header>
            <Card.Body>
            <Card.Text>
                <li><Link to="#">CS3219 Group</Link></li>
                <li><Link to="#">Physics Group</Link></li>
            </Card.Text>
            </Card.Body>
    </Card>
  </MDBContainer>

);
}

const styles = {
  header: {
      minHeight: "30px",
      overflow: 'hidden',

  }
}
export default GroupBox;