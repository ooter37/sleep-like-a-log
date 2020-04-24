import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddLog.scss";
import axios from 'axios'
import {connect} from 'react-redux'
import requestUserData from '../../redux/reducers/user'


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
      const user_id = this.props.user.data.user_id
      const baby_id = this.props.babyId
      const asleep = this.state.startDate
      const awake = this.state.endDate
      axios.post('/api/logs', {user_id, baby_id, asleep, awake}).then(()=> this.props.getLogsByBaby())
      .catch(err => console.log('Error adding log.', err))
    } else {
      window.alert('Please login.')
    }
  }
  render() {
    return (
      <div className='add-log-container'>
        <div className='add-log-label'>Add Log</div>
          <div className='asleep-awake-container'>
            <div className='add-log-labels'>Fell Asleep:</div>
            <DatePicker
              className='add-log-inputs'
              selected={this.state.startDate}
              onChange={this.startHandler}
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          <div className='asleep-awake-container'>
            <div className='add-log-labels'>Woke Up:</div>
            <DatePicker
            className='add-log-inputs'
              selected={this.state.endDate}
              onChange={this.endHandler}
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          <button className='submit-new-log' onClick={() => {
            this.submitDates()
            }}>Submit</button>
      </div>
    );
  }
}

const mapDispatchToProps = {requestUserData}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(AddLog)