import React from "react";
import { Card } from 'react-bootstrap';
import { MDBContainer } from "mdbreact";

class ProfileBox extends React.Component {
    render() {
        return (
            <MDBContainer className="ml-5 mr-5">
                <Card text="white" border="light" style={{ width: '18rem', borderRadius: "10%", backgroundColor: "#A9A9A9", marginLeft: 0 }}>
                    <Card.Header style={styles.header}>
                        <img src="https://purepng.com/public/uploads/large/purepng.com-winnie-the-pooh-babywinnie-poohwinniepoohpooh-bearbearwinnie-the-poohteddy-bearcharacterbook-winnie-the-pooh-1926pooh-corner-1928winnie-pooh-and-piglet-1701528660495rcn1r.png" alt="Pooh" style={styles.img}/>
                        <Card.Title>Lim Kang Yee</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Connections:  50 
                        </Card.Text>
                    </Card.Body>
                </Card>
            </MDBContainer>

        );
    }
}

const styles = {
  header: {
      minHeight: "100px",
      overflow: 'hidden',

  },
  img: {
    width: "10vw",
    margin: "10px",
    outlineWidth: "1px",
    outlineStyle: "solid",
    outlineColor: "white",
    borderRadius: "50%",
    overflow: 'hidden',
    // WebkitBorderRadius: "500px",
    // MozBorderRadius: "500px",

  }
}
export default ProfileBox;