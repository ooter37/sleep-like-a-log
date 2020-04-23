import React from "react";
import { Bar } from "react-chartjs-2";

export default class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.chartReference = React.createRef();
  }

  componentDidMount() {
    console.log(this.chartReference); // returns a Chart.js instance reference
  }
  
  render() {
    const date0 = new Date();
    const today =
      date0.getFullYear() +
      "-" +
      ("0" + (date0.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date0.getDate()).slice(-2);

    const date1 = new Date();
    date1.setDate(date1.getDate() - 1);
    const minusOne =
      date1.getFullYear() +
      "-" +
      ("0" + (date1.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date1.getDate()).slice(-2);

    const date2 = new Date();
    date2.setDate(date2.getDate() - 2);
    const minusTwo =
      date2.getFullYear() +
      "-" +
      ("0" + (date2.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date2.getDate()).slice(-2);

    const date3 = new Date();
    date3.setDate(date3.getDate() - 3);
    const minusThree =
      date3.getFullYear() +
      "-" +
      ("0" + (date3.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date3.getDate()).slice(-2);

    const date4 = new Date();
    date4.setDate(date4.getDate() - 3);
    const minusFour =
      date4.getFullYear() +
      "-" +
      ("0" + (date4.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date4.getDate()).slice(-2);
      let todayNaps = []
let minusOneNaps = []
let minusTwoNaps = []
let minusThreeNaps = []
let minusFourNaps = []
      let logs = this.props.splitData
      for (let key in logs) {
        if (logs[key][0] === today) {
          todayNaps.push(logs[key][1])
        } else if 
          (logs[key][0] === minusOne) {
          minusOneNaps.push(logs[key][1])
        } else if 
          (logs[key][0] === minusTwo) {
          minusTwoNaps.push(logs[key][1])
        } else if 
          (logs[key][0] === minusThree) {
          minusThreeNaps.push(logs[key][1])
        } else if 
          (logs[key][0] === minusFour) {
          minusFourNaps.push(logs[key][1])
        } 
      }

    const data = {
      labels: [minusFour, minusThree, minusTwo, minusOne, today],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };
    this.formatter()
    console.log('this.state', this.state)
    return <Bar ref={this.chartReference} data={data} />;
  }
}
