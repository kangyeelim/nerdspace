import React from "react";
import { Card } from 'react-bootstrap';
import { MDBContainer } from "mdbreact";
import { Link } from 'react-router-dom';
import './GroupBox.css';

class GroupBox extends React.Component {

  render() {
     return (
      <MDBContainer className="ml-5 mr-5">
          <Card text="white" border="light" style={{ width: '18rem', borderRadius: "10%", backgroundColor: "#A9A9A9", marginLeft: 0 }}>
              <Card.Header style={styles.header}>
                  <Card.Title>Study Groups</Card.Title>
              </Card.Header>
              <Card.Body>
              <Card.Text>
                {this.props.rooms.map(room => {
                  return (<li
                    onClick={()=> this.props.enterRoom(room.key, room.name, room.imageUrl)}
                    >{room.name}
                  </li>);
                })}
              </Card.Text>
              </Card.Body>
      </Card>
    </MDBContainer>
    );
  }
}

const styles = {
  header: {
      minHeight: "30px",
      overflow: 'hidden',

  }
}
export default GroupBox;
