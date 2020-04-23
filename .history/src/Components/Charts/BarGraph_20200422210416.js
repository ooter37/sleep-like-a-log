import React from 'react'
import Chart from "chart.js";
import './Charts.scss'
import moment from 'moment'
import axios from 'axios'
import {groupBy, intersection} from 'lodash'
import {Bar} from 'react-chartjs-2'
import {Underscore} from 'underscore'

export default class BarGraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            unformatted: null
        }
        this.groupBy = this.groupBy.bind(this)
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
        if (unformatted !== null) {
            var groups = _.groupBy(unformatted, function (date) {
                return moment(date).startOf('day').format();
              });
        }
        console.log('groups',groups)
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