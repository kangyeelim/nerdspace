import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import NavBar from './components/NavBar';

class Home extends React.Component {
  render() {
    return (
      <div class="container-fluid">
          <NavBar history={this.props.history}/>
          Insert routing here.
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
    }
}

export default connect(mapStateToProps, {}) (Home);
