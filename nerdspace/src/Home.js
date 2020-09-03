import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProfileBox from './components/ProfileBox';
import GroupBox from './components/GroupBox';
import Postbar from './components/Postbar';
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid">
          <NavBar history={this.props.history}/>
          <div className='container'>
            <div className="leftCol">
              <ProfileBox />
              <GroupBox />
            </div>
            <div className="mainCol">
            <Postbar />
            </div>
          </div>
          Insert routing here.
          <Footer />
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
