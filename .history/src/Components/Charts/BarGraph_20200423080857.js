import React from 'react'
import Chart from "chart.js";
import './Charts.scss'
import moment from 'moment'
import axios from 'axios'
import {Bar} from 'react-chartjs-2'

export default class BarGraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            splitData: null
        }
        this.extractor = this.extractor.bind(this)
    }
    componentDidMount(){
        const id = this.props.selectedTab
        axios.get(`/api/logs/${id}`).then(res => {
            if (res.data) {
                this.extractor(res.data)
            }
        })
    }
    extractor(array) {
        let splitAsleep = [];
        for (let i = 0; i < array.length; i++) {
          for (let key in array[i]) {
            if (key === "asleep") {
              splitAsleep.push([array[i][key].slice(0,10),array[i][key]]);
            }
          }
        }
        let splitAwake = [];
        for (let i = 0; i < array.length; i++) {
          for (let key in array[i]) {
            if (key === "awake") {
              splitAwake.push([array[i][key].slice(0,10),array[i][key]]);
            }
          }
        }
        var subtracted = [];
        for (let i = 0; i < splitAsleep.length; i++) {
          subtracted.push([
            splitAsleep[i][0],
            moment.utc(moment.duration(moment(splitAwake[i][1]).diff(moment(splitAsleep[i][1])), "milliseconds").asMilliseconds()).format("HH:mm")
          ]);
        }
        this.setState({
            splitData: splitAsleep
        })
        console.log(this.state.splitData)
      }
    render(){
        return (
            <div>

            </div>
        )
    }
}