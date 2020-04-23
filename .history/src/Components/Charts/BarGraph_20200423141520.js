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
        this.state = {
            minusOneNaps: []
        }
        this.dateMaker = this.dateMaker.bind(this)
    }
    chartRef = React.createRef()

    componentDidMount() {
        this.dateMaker()

        // cycle through object keys at index 0 and push unique dates into array

        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: [this.minusFour, this.minusThree, this.minusTwo, this.minusOne, this.today],
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
                    stacked: false
                  }],
                }
              }
        });
    }
    dateMaker(){
        const date0 = new Date()
const today = date0.getFullYear()+'-'+("0" + (date0.getMonth() + 1)).slice(-2)+'-'+("0" + date0.getDate()).slice(-2)

const date1 = new Date()
date1.setDate(date1.getDate() - 1);
const minusOne = date1.getFullYear()+'-'+("0" + (date1.getMonth() + 1)).slice(-2)+'-'+("0" + date1.getDate()).slice(-2)

const date2 = new Date()
date2.setDate(date2.getDate() - 2);
const minusTwo = date2.getFullYear()+'-'+("0" + (date2.getMonth() + 1)).slice(-2)+'-'+("0" + date2.getDate()).slice(-2)

const date3 = new Date()
date3.setDate(date3.getDate() - 3);
const minusThree = date3.getFullYear()+'-'+("0" + (date3.getMonth() + 1)).slice(-2)+'-'+("0" + date3.getDate()).slice(-2)

const date4 = new Date()
date4.setDate(date4.getDate() - 3);
const minusFour = date4.getFullYear()+'-'+("0" + (date4.getMonth() + 1)).slice(-2)+'-'+("0" + date4.getDate()).slice(-2)
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