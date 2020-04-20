import React from 'react'
import axios from 'axios'
import moment from 'moment'
import './LogDisplay.scss'

export default class LogDisplay extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            logs: []
        }
        this.getLogs = this.getLogs.bind(this)
    }
    componentDidMount(){
        this.getLogs()
    }
    getLogs(){
        axios.get('/api/logs').then(res => {
            this.setState({
                logs: res.data
            })
        }).catch(err => console.log('Error getting logs', err))
    }
    deleteLog(id) {
        axios.delete(`/api/delete/${id}`).then(() => this.getLogs()).catch(err => console.log('Error deleting log', err))
    }
    render(){
        const mappedLogs = this.state.logs.map(log => {
            return (
                <div className='log-display' key={log.log_id}>
                <h1>{log.name}</h1>
                <div>{moment(log.asleep).format('MMMM Do YYYY, h:mm:ss a')}</div>
                <button onClick={() => this.deleteLog(log.log_id)}></button>
                </div>
            )
        })
        return(
            <div>{mappedLogs}</div>
        )
    }
}