import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chronos from '../Chronos/Chronos'

export default class NewLogEntry extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  render() {
    return (
      <div>
        log entry
        <div className="chronos">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <Chronos/>
      </div>
    );
  }
}