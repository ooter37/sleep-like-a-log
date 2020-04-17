import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class NewLogEntry extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date(),
      setStartDate: new Date(),
      date: ''
    };
  }

  render() {
    return (
      <div>
        log entry
        <div className="chronos">
          <DatePicker
            selected={this.state.startDate}
            onChange={(date) => {
              this.state.setStartDate(date);
              console.log(date);
            }}
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
