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
        axios.delete(`/api/logs/${id}`).then(() => this.getLogs()).catch(err => console.log('Error deleting log', err))
    }
    render(){
        const mappedLogs = this.state.logs.map(log => {
            return (
                <div className='log-display' key={log.log_id}>
                    <button onClick={() => this.deleteLog(log.log_id)}>X</button>
                    <div>Asleep:{moment(log.asleep).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    <div>Awake:{moment(log.awake).format('MMMM Do YYYY, h:mm:ss a')}</div>
                </div>
            )
        })
        return(
            <div>{mappedLogs}
            <AddLog getLogsByBaby={this.getLogsByBaby} babyId={this.props.babyId}/>
            </div>
        )
    }
}