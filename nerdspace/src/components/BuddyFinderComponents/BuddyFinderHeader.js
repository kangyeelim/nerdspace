import React from "react";
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

class BuddyFinderHeader extends React.Component {
    render() {
        return (
            <div>
                <div style={styles.header}>
                    <h2 style={{marginBottom:"20px"}}>Find your ideal study buddy</h2> 
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
        paddingBottom: "2rem",
    },
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (BuddyFinderHeader);
