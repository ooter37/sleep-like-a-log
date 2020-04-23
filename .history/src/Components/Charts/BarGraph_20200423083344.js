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
    // this.extractor = this.extractor.bind(this);
  }
//   componentDidMount() {
//     const id = this.props.selectedTab;
//     axios.get(`/api/logs/${id}`).then((res) => {
//       if (res.data) {
//         this.extractor(res.data);
//       }
//     });
//   }
//   extractor(array) {
//     let splitAsleep = [];
//     for (let i = 0; i < array.length; i++) {
//       for (let key in array[i]) {
//         if (key === "asleep") {
//           splitAsleep.push([array[i][key].slice(0, 10), array[i][key]]);
//         }
//       }
//     }
//     let splitAwake = [];
//     for (let i = 0; i < array.length; i++) {
//       for (let key in array[i]) {
//         if (key === "awake") {
//           splitAwake.push([array[i][key].slice(0, 10), array[i][key]]);
//         }
//       }
//     }
//     var subtracted = [];
//     for (let i = 0; i < splitAsleep.length; i++) {
//       subtracted.push([
//         splitAsleep[i][0],
//         moment
//           .utc(
//             moment
//               .duration(
//                 moment(splitAwake[i][1]).diff(moment(splitAsleep[i][1])),
//                 "milliseconds"
//               )
//               .asMilliseconds()
//           )
//           .format("HH:mm"),
//       ]);
//       this.setState({
//         splitData: subtracted,
//       });
//     }
//   }
  
  render() {
    return <div>
    <h2>Bar Example (custom size)</h2>
    <Bar
      data={this.state}
      width={100}
      height={50}
      options={{
        maintainAspectRatio: false
      }}
    />
  </div>
  }
}
