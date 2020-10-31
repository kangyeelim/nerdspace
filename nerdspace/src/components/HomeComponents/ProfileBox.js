import React from "react";
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';

class ProfileBox extends React.Component {
    render() {
        return (
            <Card border="light" style={styles.card}>
                <Card.Body>
                    <Card.Img variant="top" src={this.props.profile[0].imageUrl} style={styles.img}/>
                    <Card.Title>{this.props.profile[0].name}</Card.Title>
                </Card.Body>
                <Card.Body>
                    <Card.Text>
                        Connections:  {this.props.connections}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

const styles = {
  img: {
    width: "180px",
    margin: "10px",
    borderRadius: "50%",
    overflow: 'hidden',
  },
  card: {
    width: "18rem",
    height: "auto",
    borderRadius: "5%",
    backgroundColor: "#e1f2fb",
    color: "#3282b8"
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (ProfileBox);
