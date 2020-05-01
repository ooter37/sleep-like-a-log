import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddLog.scss";
import axios from "axios";
import { connect } from "react-redux";

class AddLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
    };
    this.startHandler = this.startHandler.bind(this);
    this.endHandler = this.endHandler.bind(this);
    this.submitDates = this.submitDates.bind(this);
  }
  startHandler(date) {
    this.setState({
      startDate: date,
    });
  }
  endHandler(date) {
    this.setState({
      endDate: date,
    });
  }
  submitDates() {
    if (this.props.user.data) {
      const user_id = this.props.user.data.user_id;
      const baby_id = this.props.babyId;
      const asleep = this.state.startDate;
      const awake = this.state.endDate;
      axios
        .post("/api/logs", { user_id, baby_id, asleep, awake })
        .then(() => this.props.getLogsByBaby())
        .catch((err) => console.log("Error adding log.", err));
    } else {
      window.alert("Please login.");
    }
  }
  render() {
    // console.log('date goes out',this.state.startDate)
    return (
      <div className="add-log-container">
        <div className='label-button-container'>
          <h2 className="add-log-label">Add Log</h2>
          <button
          className="add-log-button"
          onClick={() => {
            this.submitDates();
          }}
          >
          Submit
          </button>
        </div>
        <div className='logging-container'>
          <div className="asleep-awake-container">
            <DatePicker
              className="add-log-inputs"
              selected={this.state.startDate}
              onChange={this.startHandler}
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, h:mm aa"
              />
            <div className="add-log-labels">Sleep Time</div>
          </div>
          <div className="asleep-awake-container">
            <DatePicker
            className="add-log-inputs"
            selected={this.state.endDate}
            onChange={this.endHandler}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, h:mm aa"
            />
            <div className="add-log-labels">Wake Time</div>
          </div>
        </div>
        
      </div>
    );
  }
}


const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(AddLog);
