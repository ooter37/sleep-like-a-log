import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chronos from '../Chronos/Chronos'

export default class NewLogEntry extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date(),
      endDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this)
  }
  startHandler(date) {
    this.setState({
      startDate: date
    })
  }
  endHandler(date) {
    this.setState({
      endDate: date
    })
  }
  render() {
    return (
      <div>
        log entry
        <div className="log-entry">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.startHandler}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          <DatePicker
            selected={this.state.endDate}
            onChange={this.endHandler}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
      </div>
    );
  }
}
