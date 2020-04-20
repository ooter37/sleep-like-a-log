import React from 'react'
import axios from 'axios'

export default class LogDisplay{
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
        return(
            <div>{this.state.babies}</div>
        )
    }
}