import React from "react";
import "./Charts.scss";
import Chart from "chart.js"

// 0: (2) ["2020-04-20", 60]
// 1: (2) ["2020-04-21", 60]
// 2: (2) ["2020-04-22", 14]
// 3: (2) ["2020-04-22", 18]
//,  "2020-04-23", "2020-04-24", "2020-04-25", "2020-04-26"
export default class BarGraph extends React.Component {
    constructor(props){
        super(props)
    }
    chartRef = React.createRef()

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: ["2020-04-20", "2020-04-21", "2020-04-22"],
                datasets: [
                  {label: '2020-04-20', data: [60]},
                  {label: '2020-04-20', data: [10]},
                  {label: '2020-04-21', data: [30]},
                  {label: '2020-04-21', data: [40]},
                  {label: '2020-04-22', data: [10]},
                  {label: '2020-04-22', data: [60]},
                  {label: '2020-04-22', data: [20]}
                  
                ]
              },
              options: {
                legend: {
                  display: false
                },
                scales: {
                  xAxes:[{
                    stacked: true
                  }],
                  yAxes:[{
                    stacked: true
                  }],
                }
              }
        });
    }
    render() {
        if (this.props.splitData) {
            console.log(this.props.splitData)
        }
        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}