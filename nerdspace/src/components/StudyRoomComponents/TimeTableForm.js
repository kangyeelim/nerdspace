import React from 'react';
import './TimeTableForm.css';
import { Button } from 'react-bootstrap';
import Cell from './Cell';

const DAY_ARR = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

class TimeTableForm extends React.Component {
  constructor() {
    super();
    this.state = {
      dayTimeArr: []
    }
    this.submitTimetable = this.submitTimetable.bind(this);
    this.addDayTime = this.addDayTime.bind(this);
    this.removeDayTime = this.removeDayTime.bind(this);
  }

  addDayTime(time, day) {
    this.state.dayTimeArr.push({day: day, time: time});
    console.log(this.state.dayTimeArr);
  }

  removeDayTime(time, day) {
      var remaining = this.state.dayTimeArr.filter((obj => {
        var diffDay = obj.day != day;
        var diffTime = obj.time != time;
        return diffDay || diffTime;
      }))
      this.state.dayTimeArr = remaining;
  }

  submitTimetable() {
    this.props.submitTimetable(this.state.dayTimeArr);
  }

  render() {
    return (
      <div style={styles.container}>
        <table>
        <thead>
          <tr>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr>
          <tr>
            {DAY_ARR.map(day => {
              return <Cell key={day} time={"5am"} day={day} addDayTime={this.addDayTime}
              removeDayTime={this.removeDayTime}
              isClickingDisable={false}/>
            })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"5.30am"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"6am"} day={day} addDayTime={this.addDayTime}
            removeDayTime={this.removeDayTime}
            isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"6.30am"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"7am"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"7.30am"} day={day} addDayTime={this.addDayTime}
            removeDayTime={this.removeDayTime}
            isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"8am"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"8.30am"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"9am"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"9.30am"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"10am"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"10.30am"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell time={"11am"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"11.30am"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"12pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"12.30pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"1pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"1.30pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"2pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"2.30pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"3pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"3.30pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"4pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"4.30pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"5pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"5.30pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"6pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"6.30pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"7pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"7.30pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"8pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"8.30pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"9pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"9.30pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"10pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"10.30pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day}time={"11pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          <tr>
          {DAY_ARR.map(day => {
            return <Cell key={day} time={"11.30pm"} day={day} addDayTime={this.addDayTime}
             removeDayTime={this.removeDayTime}
             isClickingDisable={false}/>
          })}
          </tr>
          </thead>
        </table>
        <Button variant="primary" onClick={this.submitTimetable} style={styles.button}>Submit</Button>
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
    marginTop: "30px"
  }
}

export default TimeTableForm;
