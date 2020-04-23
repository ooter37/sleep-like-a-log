import React, { Component } from 'react'
import Chart from "chart.js";
import classes from "./LineGraph.module.css";


export default class LineGraph extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [
                    {
                      label: 'Low',
                      data: [67.8],
                      backgroundColor: '#D6E9C6' // green
                    },
                    {
                      label: 'Moderate',
                      data: [20.7],
                      backgroundColor: '#FAEBCC' // yellow
                    },
                    {
                      label: 'High',
                      data: [11.4],
                      backgroundColor: '#EBCCD1' // red
                    }
                  ]
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    }
    render() {
        return (
            <div className={classes.graphContainer}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}