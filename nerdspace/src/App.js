import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/Login';
import BuddyFinder from './pages/BuddyFinderPages/BuddyFinder';
import BuddyFinderForm from './pages/BuddyFinderPages/BuddyFinderForm';
import BuddyFinderResult from './pages/BuddyFinderPages/BuddyFinderResult';
import UserHome from './pages/UserHome';
import Community from './pages/StudyRoomPages/Community';
import StudyRoom from './pages/StudyRoomPages/StudyRoom';
import Profile from './pages/Profile';
import CreatePostForm from './pages/StudyRoomPages/CreatePostForm';
import CreateRoomForm from './pages/StudyRoomPages/CreateRoomForm';
import ChatRoom from './pages/ChatRoom';
import CommonTimes from './pages/StudyRoomPages/CommonTimes';
import Logout from './pages/Logout';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/logout" component={Logout}/>
          <Route exact path="/buddy-finder" component={BuddyFinder}/>
          <Route exact path="/createBuddyForm" component={BuddyFinderForm}/>
          <Route exact path="/buddy-finder-result" component={BuddyFinderResult}/>
          <Route exact path="/home" component={UserHome}/>
          <Route exact path="/community" component={Community}/>
          <Route exact path="/room/:id?" component={StudyRoom}/>
          <Route exact path="/account" component={Profile}/>
          <Route exact path="/createPost/:id?" component={CreatePostForm}/>
          <Route exact path="/createStudyRoom" component={CreateRoomForm}/>
          <Route exact path="/chat/:id?" component={ChatRoom} />
          <Route exact path="/commonTimes/:id?" component={CommonTimes} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
