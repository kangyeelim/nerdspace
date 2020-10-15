import React from "react";
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';


class CommonTimes extends React.Component {
  render() {
    return <h1>Find Times</h1>
  }
}
  const mapStateToProps = (state) => {
    return {
      profile: state.profile,
    }
  }

  export default connect(mapStateToProps, {}) (CommonTimes);
