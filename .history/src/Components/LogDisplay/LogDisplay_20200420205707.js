import React from 'react'
import axios from 'axios'
import moment from 'moment'
import './LogDisplay.scss'

export default class LogDisplay extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            logs: [],
            logs2: []
        }
        this.getLogs = this.getLogs.bind(this)
        this.getLogsByBaby = this.getLogsByBaby.bind(this)
    }
    componentDidMount(){
        this.getLogs()
        this.getLogsByBaby()
    }
    getLogs(){
        axios.get('/api/logs').then(res => {
            this.setState({
                logs: res.data
            })
        }).catch(err => console.log('Error getting logs', err))
    }
    getLogsByBaby() {
        selectedTab = this.props.selectedTab
        axios.get('/api/logs2', {selectedTab}).then(res => {
            this.setState({
                logs2: res.data
            })
        })
    }
 
    deleteLog(id) {
        axios.delete(`/api/logs/${id}`).then(() => this.getLogs()).catch(err => console.log('Error deleting log', err))
    }
    render(){
        const mappedLogs = this.state.logs.map(log => {
            return (
                <div hidden={this.state.hidden} className='log-display' key={log.log_id}>
                <h1>{log.name}</h1>
                <div>{moment(log.asleep).format('MMMM Do YYYY, h:mm:ss a')}</div>
                <button onClick={() => this.deleteLog(log.log_id)}>Delete</button>
                </div>
            )
        })
        return(
            <div>{mappedLogs}</div>
        )
    }
}