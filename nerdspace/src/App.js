import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/Login';
import Home from './Home';
import Community from './Community';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/community" component={Community}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
