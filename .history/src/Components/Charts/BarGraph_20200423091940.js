import React from "react";
import "./Charts.scss";
import Chart from "chart.js"
// ["2020-04-20", "01:00"]
// 1: (2) ["2020-04-20", "02:00"]
// 2: (2) ["2020-04-21", "03:00"]
// 3: (2) ["2020-04-21", "01:00"]
// 4: (2) ["2020-04-22", "00:14"]
// 5: (2) ["2020-04-22", "00:18"]
// 6: (2) ["2020-04-22", "00:30"]
// 7: (2) ["2020-04-22", "00:50"]

export default class BarGraph extends React.Component {
    chartRef = React.createRef()

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: ["2020-04-20", "2020-04-21", "2020-04-22"],
                datasets: [
                  {
                      backgroundColor: ["#673AB7", "#90A4AE"],
                      fillColor: "#000000",
                      data: [1, 4]
                  },
                  {
                      backgroundColor: ["#E1BEE7", "#0D47A1"],
                      data: [2, 5]
                  },
                  {
                      backgroundColor: ["#BA68C8", "#455A64"],
                      data: [3, 6]
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