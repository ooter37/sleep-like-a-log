import React from 'react'
import axios from 'axios'
import moment from 'moment'
import './LogDisplay.scss'
import AddLog from '../AddLog/AddLog'

export default class LogDisplay extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            logs: []
        }
        // this.getLogs = this.getLogs.bind(this)
        this.getLogsByBaby = this.getLogsByBaby.bind(this)
    }
    componentDidMount(){
        this.getLogsByBaby()
    }
    getLogsByBaby() {
        const id = this.props.selectedTab
        axios.get(`/api/logs/${id}`).then(res => {
            this.setState({
                logs: res.data
            })
        })
    }
    deleteLog(id) {
        axios.delete(`/api/logs/${id}`).then(() => this.getLogsByBaby()).catch(err => console.log('Error deleting log', err))
    }
    render(){
        const mappedLogs = this.state.logs.map(log => {
            let awake = moment(log.awake)
            let asleep = moment(log.asleep)
            let length = awake.diff(asleep)
            let tempTime = moment.duration(length)
            var y = tempTime.hours() + ':' + tempTime.minutes()
            // let z = moment.duration(length).humanize()
            let z = moment.utc(moment.duration(4500, "seconds").asMilliseconds()).format("HH:mm")
            return (
                <div className='log-display' key={log.log_id}>
                    <div className='log-display-asleep'>{moment(log.asleep).format('MMMM Do, h:mm A')}</div>
                    <div className='log-display-awake'>{moment(log.awake).format('MMMM Do, h:mm A')}</div>
                    <div>{z}</div>
                    {/* <div className='log-display-length'>{moment.subtract(log.asleep, log.awake)}</div> */}
                    <button className='log-display-delete' onClick={() => this.deleteLog(log.log_id)}>Delete</button>
                </div>
            )
        })
        return(
            <div>
            <AddLog getLogsByBaby={this.getLogsByBaby} babyId={this.props.babyId}/>
                <div className='log-display-container'>
                    <div className='log-display-labels'>
                        <div className='log-display-asleep'>Fell Asleep At...</div>
                        <div className='log-display-awake'>Woke Up At...</div>
                        <div className='log-display-delete'></div>
                    </div>
                    {mappedLogs}
                </div>
            </div>
        )
    }
}