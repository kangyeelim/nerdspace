import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/Login';
import UserHome from './pages/UserHome';
import Community from './pages/Community';
import StudyRoom from './pages/StudyRoom';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/home" component={UserHome}/>
          <Route exact path="/community" component={Community}/>
          <Route exact path="/room" component={StudyRoom}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
