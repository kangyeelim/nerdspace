import React from "react";
import { Card } from 'react-bootstrap';
import { MDBContainer } from "mdbreact";
import { connect } from 'react-redux';

class ProfileBox extends React.Component {
    render() {
        return (
            <MDBContainer className="ml-5 mr-5">
                <Card text="white" border="light" style={styles.card}>
                    <Card.Header style={styles.header}>
                        <img src={this.props.profile[0].imageUrl} alt="" style={styles.img}/>
                        <Card.Title>{this.props.profile[0].name}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Connections:  {this.props.connections}
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
    borderRadius: "50%",
    overflow: 'hidden',
  },
  card: {
    width: '18rem',
    height: "auto",
    borderRadius: "5%",
    backgroundColor: "#A9A9A9",
    marginLeft: 0
  }
}
const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (ProfileBox);
