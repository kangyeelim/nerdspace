import React from "react";
import { Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import TimeTableForm from '../../components/StudyRoomComponents/TimeTableForm';
import TimeTableView from '../../components/StudyRoomComponents/TimeTableView';
import NavBar from '../../components/NavBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isRoomAccessibleToUser, isTokenAccepted } from '../../services/Auth';

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
      isAuthenticated: false
    }
    this.switchEditingMode = this.switchEditingMode.bind(this);
    this.findCommonStudyTime = this.findCommonStudyTime.bind(this);
  }

  async componentDidMount() {
    var isAuthenticated = await isRoomAccessibleToUser(this.props.profile[0].googleId,
      this.state.roomId) && isTokenAccepted(this.props.token);
    this.setState({isAuthenticated:await isAuthenticated});
    //to be implemented
    //get timings by the room id.
    //check if existing record present
    //assume i have a record
    this.setState({isExistingRecord: true});
    this.setState({existingRecord: dummyExistingRecord});
    this.setState({isAuthenticating:false});
  }

  switchEditingMode() {
    this.setState({isEditingMode: !this.state.isEditingMode});
  }

  findCommonStudyTime() {
    //to be implemented
  }

  render() {
    if (this.state.isAuthenticating) {
      return <Container>
        <CircularProgress/>
      </Container>
    }
    if (!this.state.isAuthenticated) {
      return <Redirect to="/community"/>;
    }
    return (
      <div>
        <NavBar history={this.props.history}/>
        <div class="container" style={styles.container}>
          <h2>Find Common Times</h2>
          <p>Members that have submitted their timetable:</p>
          <ol>
            {this.state.memberRecords.map((record) => {
              return (
                <li>
                  {record.name}
                </li>
              );
            })}
          </ol>
          <Button onClick={this.findCommonStudyTime} style={styles.button} className="btn btn-primary">Find!</Button>
          {this.state.isExistingRecord && !this.state.isEditingMode && <div>
            <h4 style={styles.heading}>Your Submitted Timetable Entry</h4>
            <p style={styles.subHeader}>This is your previously submitted available time slots which is used to find common study times</p>
              <TimeTableView roomId={this.state.roomId}
              history={this.props.history}
              existingRecord={this.state.existingRecord}
              switchEditingMode={this.switchEditingMode}/>
            </div>}
          {this.state.isEditingMode && <div>
              <h4 style={styles.heading}>Re-submit your Timetable</h4>
              <p style={styles.subHeader}>Input your available time slots again to be used to find common study times</p>
              <TimeTableForm roomId={this.state.roomId}/>
          </div>}
          {!this.state.isExistingRecord && <div>
              <h4 style={styles.heading}>Input your Timetable</h4>
              <p style={styles.subHeader}>You have yet to input your available time slots to include yourself in finding common study times</p>
              <TimeTableForm roomId={this.state.roomId}/>
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
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    token: state.token
  }
}

export default connect(mapStateToProps, {}) (CommonTimes);
