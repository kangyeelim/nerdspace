import React from "react";
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Typography } from '@material-ui/core';

class BuddyFinderHeader extends React.Component {
    render() {
        return (
            <div>
                <div style={styles.header}>
                    <Typography variant="h2">Find your ideal study buddy</Typography> 
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
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (BuddyFinderHeader);
