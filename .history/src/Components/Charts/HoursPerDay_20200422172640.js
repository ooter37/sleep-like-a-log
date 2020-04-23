import React, { Component } from 'react'
import Chart from "chart.js";
import './Charts.scss'
import moment from 'moment'


export default class HoursPerDay extends Component {
    constructor(props) {
      super(props)
      
      this.chartFunction = this.chartFunction.bind(this)
    }
    chartRef = React.createRef();
    chartFunction() {
      const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [
                    this.props.logs.map(log => {

                    })



                    {
                      label: 'Low',
                      data: [4],
                      backgroundColor: '#D6E9C6' // green
                    },
                    {
                      label: 'Moderate',
                      data: [5.5],
                      backgroundColor: '#FAEBCC' // yellow
                    },
                    {
                      label: 'High',
                      data: [2],
                      backgroundColor: '#EBCCD1' // red
                    }
                  ]
            },
            options: {
                scales: {
                  xAxes: [{ stacked: true }],
                  yAxes: [{ stacked: true }]
                }
              }
        });
    }
    componentDidMount() {
        this.chartFunction()
    }
    render() {
        return (
            <div className='chart'>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}