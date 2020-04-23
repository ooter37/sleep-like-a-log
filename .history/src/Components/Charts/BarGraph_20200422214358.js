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
            unformatted: null
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
            }
        })
    }
    extractor(array){
        let splitArray = []
        for (let i = 0; i < array.length; i++) {
          for (let key in array[i]) {
            if (key === 'asleep') {
              splitArray.push(array[i][key].split('T'))
            }
          }
        }
      }
    formatData() {
        const {unformatted} = this.state.unformatted
        if (unformatted !== null) {
            this.extractor(unformatted)
        }
        
    }
    render(){
        this.formatData()
        console.log('this.state.unformatted', this.state.unformatted)
        return (
            <div>

            </div>
        )
    }
}