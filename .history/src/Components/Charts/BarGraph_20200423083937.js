import React from "react";
import Chart from "chart.js";
import "./Charts.scss";
import moment from "moment";
import axios from "axios";
import { Bar } from "react-chartjs-2";

export default class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splitData: null,
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
    };
    
  }
//   componentDidMount() {
//     const id = this.props.selectedTab;
//     axios.get(`/api/logs/${id}`).then((res) => {
//       if (res.data) {
//         this.extractor(res.data);
//       }
//     });
//   }
  
  
  render() {
      console.log(this.props.splitData)
    return <div>
    <h2>Bar Example (custom size)</h2>
    <Bar
      data={}
      width={100}
      height={50}
      options={{
        maintainAspectRatio: false
      }}
    />
  </div>
  }
}