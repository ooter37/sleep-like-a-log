import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './NewLogEntry.scss'

export default class NewLogEntry extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date(),
      endDate: new Date()
    };
    this.startHandler = this.startHandler.bind(this)
    this.endHandler = this.endHandler.bind(this)
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
        <div className="log-entry">
            <div>Asleep:
          <DatePicker
            selected={this.state.startDate}
            onChange={this.startHandler}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            />
            </div>
            <div>Awake:
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
      </div>
    );
  }
}
