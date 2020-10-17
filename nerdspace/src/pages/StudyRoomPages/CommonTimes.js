import React from "react";
import { Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import TimeTableForm from '../../components/StudyRoomComponents/TimeTableForm';
import TimeTableView from '../../components/StudyRoomComponents/TimeTableView';
import NavBar from '../../components/NavBar';

class CommonTimes extends React.Component {
  constructor() {
    super();
    this.state = {
      memberRecords: [],
      isExistingRecord : false
    }
  }
  componentDidMount() {
    //get timings by the room id.
    //check if existing record present
  }
  render() {
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
          <Button onClick={this.onSubmit} className="btn btn-primary">Find!</Button>
          {this.state.isExistingRecord && <div>
            <h4>Your Timetable Input</h4>
              <TimeTableView/>
            </div>}
          {!this.state.isExistingRecord && <div>
              <h4>Input your Timetable</h4>
              <TimeTableForm/>
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
    flexDirection: 'column'
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (CommonTimes);
