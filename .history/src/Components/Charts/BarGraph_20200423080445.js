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
            unformatted: null,
            splitData: null
        }
        this.extractor = this.extractor.bind(this)
        this.formatData = this.formatData.bind(this)
    }
    componentDidMount(){
        const id = this.props.selectedTab
        axios.get(`/api/logs/${id}`).then(res => {
            if (res.data) {
                this.setState({
                    unformatted: res.data
                })
                this.extractor(this.state.unformatted)
                console.log(this.state.splitData)
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