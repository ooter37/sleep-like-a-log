import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddLog.scss";
import axios from 'axios'
import {connect} from 'react-redux'

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
    if (this.props.user.data !== null) {
      const user_id = this.props.user.data.user_id
      const baby_id = this.props.babyId
      const asleep = this.state.startDate
      const awake = this.state.endDate
      axios.post('/api/logs', {user_id, baby_id, asleep, awake})
    } else {
      window.alert('Please login.')
    }
  }
  render() {
    return (
      <div>
        <div className='new-log'>New Log</div>
        <div className="add-log">
          <div>
            Asleep:
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
          <div>
            Awake:
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
          <button onClick={() => {
            this.submitDates()
            this.props.getLogsByBaby()
            }}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(AddLog)