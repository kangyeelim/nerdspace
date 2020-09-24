import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/Login';
import BuddyFinder from './pages/BuddyFinder';
import BuddyFinderForm from './pages/BuddyFinderForm';
<<<<<<< HEAD
=======
import BuddyFinderResult from './pages/BuddyFinderResult';
>>>>>>> temp
import UserHome from './pages/UserHome';
import Community from './pages/StudyRoomPages/Community';
import StudyRoom from './pages/StudyRoomPages/StudyRoom';
import Profile from './pages/Profile';
import CreatePostForm from './pages/StudyRoomPages/CreatePostForm';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/buddy-finder" component={BuddyFinder}/>
          <Route exact path="/createBuddyForm" component={BuddyFinderForm}/>
<<<<<<< HEAD
=======
          <Route exact path="/buddy-finder-result" component={BuddyFinderResult}/>
>>>>>>> temp
          <Route exact path="/home" component={UserHome}/>
          <Route exact path="/community" component={Community}/>
          <Route exact path="/room" component={StudyRoom}/>
          <Route exact path="/account" component={Profile}/>
          <Route exact path="/createPost" component={CreatePostForm}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
