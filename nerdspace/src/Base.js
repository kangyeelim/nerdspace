import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Community from './pages/Community';
import UserHome from './pages/UserHome';

class Base extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <NavBar history={this.props.history}/>
          <Router>
            <Switch>
              <Route exact path="/home" component={UserHome}/>
              <Route exact path="/community" component={Community}/>
            </Switch>
          </Router>
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

export default connect(mapStateToProps, {}) (Base);
