import React from 'react'
import Chart from "chart.js";
import './Charts.scss'
import moment from 'moment'
import axios from 'axios'
import {groupBy, intersection} from 'lodash'
import {Bar} from 'react-chartjs-2'

export default class BarGraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            unformatted: null
        }
    }
    componentDidMount(){
        const id = this.props.selectedTab
        axios.get(`/api/logs/${id}`).then(res => {
            console.log(res.data)
            if (res.data) {
                this.setState({
                    unformatted: res.data
                })
            }
        })
    }
    formatData() {
        const {unformatted} = this.state.unformatted
        if (unformatted !== null) {
            const mapByDevice = user => user.deviceType
            console.log('mapByDevice', mapByDevice)
            const usersPerDevice = groupBy(unformatted, mapByDevice)
            console.log('usersPerDevice', usersPerDevice)

        }
    }
    render(){
        // this.formatData()
        console.log('this.state.unformatted', this.state.unformatted)
        return (
            <div>

            </div>
        )
    }
}