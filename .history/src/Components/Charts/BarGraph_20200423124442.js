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
        const date1 = new Date()
        date1.setDate(date1.getDate() - 1);
        const minusOne = date1.getFullYear()+'-'+(date1.getMonth()+1)+'-'+date1.getDate()
        // cycle through object keys at index 0 and push unique dates into array

        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: [minusOne, "2020-04-21", "2020-04-22",  "2020-04-23", "2020-04-24"],
                datasets: [
                    {
                        data: [40, 47, 44, 38, 27],
                                    backgroundColor: "#512DA8",
                                    hoverBackgroundColor: "#7E57C2",
                                    hoverBorderWidth: 0
                    },
                    {
                        data: [10, 12, 7, 5, 4],
                                    backgroundColor: "#FFA000",
                                    hoverBackgroundColor: "#FFCA28",
                                    hoverBorderWidth: 0
                    },
                    {
                        data: [17, 11, 22, 18, 12],
                                    backgroundColor: "#D32F2F",
                                    hoverBackgroundColor: "#EF5350",
                                    hoverBorderWidth: 0
                    },
                    ]
                }
              ,
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
            // this.props.splitData.forEach(elem => {
            //     console.log(elem)
            // })
        }
        // if (this.props.splitData) {
        //     console.log(this.props.splitData)
        // }
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