import React from 'react'
import axios from 'axios'
import moment from 'moment'
import './LogDisplay.scss'
import AddLog from '../AddLog/AddLog'
import HoursPerDay from '../Charts/HoursPerDay'

export default class LogDisplay extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            logs: [],
            open: false
        }
        this.getLogsByBaby = this.getLogsByBaby.bind(this)
        this.togglePanel = this.togglePanel.bind(this)
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
    togglePanel(e) {
        this.setState({
            open: !this.state.open
        })
    }
    render(){
        const mappedLogs = this.state.logs.map(log => {
            const sleepTime = moment.utc(moment.duration(moment(log.awake).diff(moment(log.asleep)), "milliseconds").asMilliseconds()).format("HH:mm")
            console.log(sleeptime)
            return (
                <div className='log-display' key={log.log_id}>
                    <div className='log-display-asleep'>{moment(log.asleep).format('MMMM Do, h:mm A')}</div>
                    <div className='log-display-awake'>{moment(log.awake).format('MMMM Do, h:mm A')}</div>
                    <div className='log-display-length'>{sleepTime}</div>
                    <button className='log-display-delete' onClick={() => this.deleteLog(log.log_id)}>Delete</button>
                </div>
            )
        })
        const chartedLogs = this.state.logs.map(log => {
        
            return (
                <div>
                    
                </div>
                )
        })
        return(
            <div>
                
                <AddLog getLogsByBaby={this.getLogsByBaby} babyId={this.props.babyId}/>
                <div onClick={(e) => this.togglePanel(e)} className='collapsible-log-container'>
                    <div className='detailed-logs'>
                        DETAILED LOGS (Click to Expand)
                    </div>
                    {
                    this.state.open
                    ?
                    <div className='log-display-container'>
                    <div className='log-display-labels'>
                        <div className='log-display-asleep'>Fell Asleep At:</div>
                        <div className='log-display-awake'>Woke Up At:</div>
                        <div className='log-display-length'>Length (hr:mn):</div>
                        <div className='log-display-delete'></div>
                    </div>
                    {mappedLogs}
                    </div>
                    :
                    null
                    }
                </div>   
                <div className='hours-per-day'>
                <HoursPerDay/>
                </div>
                {chartedLogs}
            </div>
        )
    }
}