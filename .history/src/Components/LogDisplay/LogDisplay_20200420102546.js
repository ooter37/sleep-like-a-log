import React from 'react'
import axios from 'axios'

export default class LogDisplay extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            logs: []
        }
    }
    componentDidMount(){
        axios.get('/api/logs').then(res => {
            this.setState({
                logs: res.data
            })
        }).catch(err => console.log('Error getting logs', err))
    }
    render(){
        console.log(this.state.logs)
        const mappedLogs = this.state.logs.map(log => {
            return (
                <div key={log.log_id}>
                <h1>{log.name}</h1>
                <div>{log.asleep}</div>
                </div>
            )
        })
        return(
            <div>{mappedLogs}</div>
        )
    }
}