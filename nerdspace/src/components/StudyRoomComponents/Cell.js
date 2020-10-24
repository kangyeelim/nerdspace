import React from 'react';
import"./TimeTableForm.css";

class Cell extends React.Component {
  constructor() {
    super();
    this.state = {
      isSelected: false
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.isChoosenInRecord = this.isChoosenInRecord.bind(this);
  }

  handleSelect() {
    this.setState({isSelected: !this.state.isSelected}, () => {
      if (this.state.isSelected) {
        this.props.addDayTime(this.props.time, this.props.day);
      } else {
        this.props.removeDayTime(this.props.time, this.props.day);
      }
    });
  }

  isChoosenInRecord() {
    var record = this.props.existingRecord.filter(obj => {
      return obj.time == this.props.time && obj.day == this.props.day;
    })
    return record.length == 1;
  }

  render() {
    if (this.state.isSelected && !this.props.isClickingDisable) {
      return (
        <td key={this.props.day} id="selectedCell" onClick={this.handleSelect}>{this.props.time}</td>
      );
    } else if (!this.state.isSelected && !this.props.isClickingDisable){
      return (
        <td key={this.props.day} onClick={this.handleSelect}>{this.props.time}</td>
      );
    } else if (this.props.isClickingDisable && this.isChoosenInRecord()) {
        return (
          <td key={this.props.day} id="selectedCell">{this.props.time}</td>
        );
    } else {
        return (
          <td key={this.props.day}>{this.props.time}</td>
        );
    }
  }
}

export default Cell;
