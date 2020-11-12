import React from "react";
import { Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import TimeTableForm from '../../components/StudyRoomComponents/TimeTableForm';
import TimeTableView from '../../components/StudyRoomComponents/TimeTableView';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isRoomAccessibleToUser, isTokenAccepted } from '../../services/Auth';
import NavBar from "../../components/NavigationComponents/NavBar";

const dummyExistingRecord = [{day:"Mon", time: "8pm"}, {day:"Mon", time: "10.30am"},{day:"Mon", time: "9.30am"}, {day:"Mon", time: "9am"},{day:"Tue", time: "8.30pm"}, {day:"Tue", time: "8pm"}, {day:"Tue", time: "7.30pm"}];

class CommonTimes extends React.Component {
  constructor(props) {
    super(props);
    const roomID = props.match.params.id;
    this.state = {
      memberRecords: [],
      isExistingRecord : false,
      roomId: roomID,
      isEditingMode: false,
      existingRecord: [],
      isAuthenticating: true,
      isAuthenticated: false,
      submittedNames:[],
      isFound: false,
      commonTimes: []
    }
    this.switchEditingMode = this.switchEditingMode.bind(this);
    this.findCommonStudyTime = this.findCommonStudyTime.bind(this);
    this.submitTimetable = this.submitTimetable.bind(this);
    this.retrieveSubmittedTimesInfo = this.retrieveSubmittedTimesInfo.bind(this);
  }

  async componentDidMount() {
    var isAuthenticated = await isRoomAccessibleToUser(this.props.profile[0].googleId,
      this.state.roomId) && isTokenAccepted(this.props.token);
    this.setState({isAuthenticated:await isAuthenticated});
    await this.retrieveSubmittedTimesInfo();
    this.setState({isAuthenticating:false});

  }

  async retrieveSubmittedTimesInfo() {
    this.state.submittedNames = [];
    try {
      var res = await axios.get(`http://localhost:5000/time/byRoomID/${this.state.roomId}`);
      var memberIds = Object.keys((await res).data.data[0].times);
      var memberRecords = Object.values(res.data.data[0].times);
      var submittedNames = [];
      for (var i = 0; i < memberIds.length; i++) {
          var result = await axios.get(`http://localhost:5000/users/byGoogleID/${memberIds[i]}`);
          var name = await result.data.data[0].name;
          this.state.submittedNames.push(name);
          console.log(name);
          this.setState({submittedNames: this.state.submittedNames});
      }
      this.setState({memberRecords:memberRecords});
      var googleId = this.props.profile[0].googleId;
      if (memberIds.includes(googleId)) {
        this.setState({isExistingRecord: true});
        this.setState({existingRecord: res.data.data[0].times[googleId]});
      }
    } catch (err) {
      console.error(err);
    }
  }

  switchEditingMode() {
    this.setState({isEditingMode: !this.state.isEditingMode});
    this.setState({isFound: false});
  }

  findCommonStudyTime() {
    this.setState({isAuthenticating:true});
    var records = this.state.memberRecords;
    var numOfMembers = records.length;
    var commonTimes = [];
    for (var i = 0; i < records[0].length; i++) {
      var dateTimeObj =  records[0][i];
      var count = 0;
      for (var j = 0; j < records.length; j++) {
        if (records[j].filter(obj => {
          return obj.time == dateTimeObj.time && obj.day == dateTimeObj.day
        }).length > 0) {
            count = count + 1;
        }
      }
      if (count == numOfMembers) {
        commonTimes.push(dateTimeObj);
      }
    }
    this.setState({isFound: true, commonTimes:commonTimes, isAuthenticating:false});
  }

  async submitTimetable(inputArr) {
    this.setState({isAuthenticating:true});
    var profile = this.props.profile[0];
    if (this.state.memberRecords.length > 0) {
      try {
        var res = await axios.post(`http://localhost:5000/time/update/byRoomID`, {
          roomId: this.state.roomId,
          userId: profile.googleId,
          time: inputArr
        })
        if (res.data.message == 'UPDATE success') {
          await this.retrieveSubmittedTimesInfo();
          this.setState({isEditingMode: false});
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        var obj = {};
        obj[profile.googleId] = inputArr;
        var res = await axios.post(`http://localhost:5000/time/`, {
          roomId: this.state.roomId,
          times: obj
        })
        if (res.data.message == 'POST success') {
          await this.retrieveSubmittedTimesInfo();
          this.setState({isEditingMode: false});

        }
      } catch (err) {
        console.error(err);
      }
    }
    this.setState({isAuthenticating:false});
  }

  render() {
    if (this.state.isAuthenticating) {
      return <div className="container" style={{margin:"auto"}}>
        <CircularProgress/>
      </div>
    }
    if (!this.state.isAuthenticated) {
      return <Redirect to="/community"/>;
    }
    return (
      <div>
        <NavBar history={this.props.history}/>
        <div style={styles.container}>
          <h2 style={styles.title}>Find Common Times</h2>
          <h6>Members that have submitted their timetable:</h6>
          <ol style={styles.subHeader}>
            {this.state.submittedNames.map((name) => {
              return (
                <li key={name}>
                  {name}
                </li>
              );
            })}
          </ol>
          <h6>Find the common available timings of members that have submitted their timetable:</h6>
          <Button onClick={this.findCommonStudyTime} style={styles.button} className="btn btn-primary">Find!</Button>
          {this.state.isFound && !this.state.isEditingMode && this.state.commonTimes && <div>
            <h4 style={styles.heading}>Results</h4>
              <TimeTableView roomId={this.state.roomId}
              history={this.props.history}
              existingRecord={this.state.commonTimes}
              isEditingDisabled={true}/>
            </div>}
          {this.state.isExistingRecord && !this.state.isEditingMode && <div style={styles.container}>
            <h4 style={styles.heading}>Your Submitted Timetable Entry</h4>
            <p style={styles.subHeader}>This is your previously submitted available time slots which is used to find common study times</p>
              <TimeTableView roomId={this.state.roomId}
              history={this.props.history}
              existingRecord={this.state.existingRecord}
              isEditingDisabled={false}
              switchEditingMode={this.switchEditingMode}/>
            </div>}
          {this.state.isEditingMode && <div>
              <h4 style={styles.heading}>Re-submit your Timetable</h4>
              <p style={styles.subHeader}>Input your available time slots again to be used to find common study times</p>
              <TimeTableForm roomId={this.state.roomId} submitTimetable={this.submitTimetable}/>
          </div>}
          {!this.state.isExistingRecord && <div>
              <h4 style={styles.heading}>Input your Timetable</h4>
              <p style={styles.subHeader}>You have yet to input your available time slots to include yourself in finding common study times</p>
              <TimeTableForm roomId={this.state.roomId} submitTimetable={this.submitTimetable}/>
          </div>}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignText: 'center'
  },
  button: {
    maxWidth: "80px"
  },
  heading: {
    marginTop: "50px",
    marginBottom: "20px"
  },
  subHeader: {
    marginBottom: "20px"
  },
  title: {
    marginBottom: "30px"
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    token: state.token
  }
}

export default connect(mapStateToProps, {}) (CommonTimes);
