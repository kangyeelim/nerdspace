import React from "react";
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class RoomPostsSection extends React.Component {
    render() {
        return (
          <Card style={styles.card}>
            <Card.Body>
              <Card.Title>Recent Posts</Card.Title>
              <Button variant="primary" onClick={this.props.viewAll}>View All</Button>
            </Card.Body>
          </Card>
        );
    }
}

const styles = {
  card: {
    marginTop: '40px',
    justifyContent:'center',
    alignText: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    minWidth: "475px",
    width: "58vw"
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (RoomPostsSection);
