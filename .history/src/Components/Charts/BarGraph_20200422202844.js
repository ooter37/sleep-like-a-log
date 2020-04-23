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
            if (res.data) {
                this.setState({
                    unformatted: res.data
                })
            }
        })
    }
    groupBy(objectArray, property) {
        return objectArray.reduce((acc,obj) => {
            const key = obj[property]
            if (!acc[key]) {
                acc[key] = []
            }
            acc[key].push(obj)
            return acc
        }, {})
    }
    formatData() {
        const {unformatted} = this.state.unformatted
        let newArr = []
        if (unformatted !== null) {
            console.log('unformatted on state', this.state.unformatted)
            
            const groupedUsers = groupBy(unformatted, 'user_id')
            console.log('groupedUsers', groupedUsers)
            // const mapByDevice = this.state.unformatted.map(log => {
            //     newArr.push(moment.utc(moment.duration(moment(log.awake).diff(moment(log.asleep)), "milliseconds").asMilliseconds()).format("HH:mm"))
            // })
            // console.log('mapByDevice', newArr)
            // const usersPerDevice = groupBy(unformatted, mapByDevice)
            // console.log('usersPerDevice', usersPerDevice)

        }
    }
    render(){
        if (this.state.unformatted) {this.formatData()}
        console.log('this.state.unformatted', this.state.unformatted)
        return (
            <div>

            </div>
        )
    }
}