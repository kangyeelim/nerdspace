import React from 'react';
import { Button } from 'react-bootstrap';
import Cell from './Cell';
import { goToCommonTimesPage } from '../../navigators/StudyRoomNavigator';

const DAY_ARR = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function TimeTableView(props) {
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
            return <Cell key={day} time={"5am"} day={day}
            isClickingDisable={true}
            existingRecord={props.existingRecord}/>
          })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"5.30am"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"6am"} day={day}
          isClickingDisable={true}
          existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"6.30am"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"7am"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"7.30am"} day={day}
          isClickingDisable={true}
          existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"8am"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"8.30am"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"9am"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"9.30am"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"10am"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"10.30am"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"11am"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"11.30am"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"12pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"12.30pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"1pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"1.30pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"2pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"2.30pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"3pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"3.30pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"4pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"4.30pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"5pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"5.30pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"6pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"6.30pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"7pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"7.30pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"8pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"8.30pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"9pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"9.30pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"10pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"10.30pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"11pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        <tr>
        {DAY_ARR.map(day => {
          return <Cell key={day} time={"11.30pm"} day={day}
           isClickingDisable={true}
           existingRecord={props.existingRecord}/>
        })}
        </tr>
        </thead>
      </table>
      {!props.isEditingDisabled && <Button variant="primary"
        onClick={props.switchEditingMode}
        style={styles.button}>Re-submit</Button>
      }
    </div>

  );
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
