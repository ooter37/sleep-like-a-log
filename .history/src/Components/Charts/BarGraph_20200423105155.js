import React from "react";
import "./Charts.scss";
import Chart from "chart.js"

// 0: (2) ["2020-04-20", 60]
// 1: (2) ["2020-04-21", 60]
// 2: (2) ["2020-04-22", 14]
// 3: (2) ["2020-04-22", 18]

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
                labels: ["2020-04-20", "2020-04-21"],
                datasets: [
                  {
                      backgroundColor: ["#673AB7", "#90A4AE"],
                      fillColor: "#000000",
                      data: [60]
                  },
                  {
                      backgroundColor: ["#BA68C8", "#455A64"],
                      data: [14, 18]
                  }
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