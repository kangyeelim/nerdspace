import React from "react";
import { Card } from 'react-bootstrap';
import { MDBContainer } from "mdbreact";
import { connect } from 'react-redux';
import { Col, Row, Button, Image, FormControl } from 'react-bootstrap';

class BuddyFinderHeader extends React.Component {
    render() {
        return (
            <div>
                <div style={styles.header}>
                    <h1 style={styles.headerText}><strong>Find your ideal study buddy</strong></h1> 
                    <Button variant="primary" onClick={this.props.createBuddyForm}>Create a new form</Button>
                </div>
            </div>
        );
    }
}

const styles = {
    header: {
        flexDirection: "column",
        justifyContent: "center",
        padding: "2rem",
    },
    headerText: {
        margin: "2rem",
        fontSize: 60, 
        fontWeight: 600
    }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (BuddyFinderHeader);
