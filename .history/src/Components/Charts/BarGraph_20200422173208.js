import React, { Component } from 'react'
import Chart from "chart.js";
import './Charts.scss'
import moment from 'moment'

export default class BarGraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rawData: null
        }
    }
    componentDidMount(){
        const id = this.props.selectedTab
        axios.get(`/api/logs/${id}`).then(res => {
            if (res.data) {
                this.setState({
                    rawData: res.data
                })
            }
        })
    }
    render(){
        return (
            <div>

            </div>
        )
    }
}