import React from "react";
import { Bar } from "react-chartjs-2";
import './Charts.scss'
import moment from 'moment'

export default class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
  }

  componentDidMount() {
  }

  render() {
    // const date0 = new Date();
    const today = moment().format().slice(0,10)
      // date0.getFullYear() +
      // "-" +
      // ("0" + (date0.getMonth() + 1)).slice(-2) +
      // "-" +
      // ("0" + date0.getDate()).slice(-2);
    // const date1 = new Date();
    // date1.setDate(date1.getDate() - 1);
    const minusOne = moment().subtract(1,'days').format().slice(0,10)
      // date1.getFullYear() +
      // "-" +
      // ("0" + (date1.getMonth() + 1)).slice(-2) +
      // "-" +
      // ("0" + date1.getDate()).slice(-2);
    // const date2 = new Date();
    // date2.setDate(date2.getDate() - 2);
    const minusTwo = moment().subtract(2,'days').format().slice(0,10)
    //   date2.getFullYear() +
    //   "-" +
    //   ("0" + (date2.getMonth() + 1)).slice(-2) +
    //   "-" +
    //   ("0" + date2.getDate()).slice(-2);

    // const date3 = new Date();
    // date3.setDate(date3.getDate() - 3);
    const minusThree = moment().subtract(3,'days').format().slice(0,10)
    //   date3.getFullYear() +
    //   "-" +
    //   ("0" + (date3.getMonth() + 1)).slice(-2) +
    //   "-" +
    //   ("0" + date3.getDate()).slice(-2);

    // const date4 = new Date();
    // date4.setDate(date4.getDate() - 4);
    const minusFour = moment().subtract(4,'days').format().slice(0,10)
      // date4.getFullYear() +
      // "-" +
      // ("0" + (date4.getMonth() + 1)).slice(-2) +
      // "-" +
      // ("0" + date4.getDate()).slice(-2);
    let todayNaps = 0;
    let minusOneNaps = 0;
    let minusTwoNaps = 0;
    let minusThreeNaps = 0;
    let minusFourNaps = 0;
    let logs = this.props.splitData;
    for (let key in logs) {
      if (logs[key][0] === today) {
        todayNaps += logs[key][1];
      } else if (logs[key][0] === minusOne) {
        minusOneNaps += logs[key][1];
      } else if (logs[key][0] === minusTwo) {
        minusTwoNaps += logs[key][1];
      } else if (logs[key][0] === minusThree) {
        minusThreeNaps += logs[key][1];
      } else if (logs[key][0] === minusFour) {
        minusFourNaps += logs[key][1];
      }
    }
    // console.log('todayNaps',todayNaps,'minusOneNaps',minusOneNaps,'minusTwoNaps',minusTwoNaps,'minusThreeNaps',minusThreeNaps,'minusFourNaps',minusFourNaps)
    // console.log('minusFour',minusFour,'minusThree',minusThree,'minusTwo',minusTwo,'minusOne',minusOne,'today',today)
    const data = {
      labels: [minusFour, minusThree, minusTwo, minusOne, today],
      datasets: [
        {
          label: "Minutes Slept Per Day",
          backgroundColor: "rgba(202, 232, 213, .8)",
          borderColor: "#104050",
          borderWidth: 1,
          hoverBackgroundColor: "#84a9ac",
          hoverBorderColor: "#104050",
          data: [
            minusFourNaps,
            minusThreeNaps,
            minusTwoNaps,
            minusOneNaps,
            todayNaps,
          ],
        },
      ],
    };
    const options = {
        maintainAspectRatio: false,
        legend: {
             labels: {
                  fontColor: '#cae8d5'
                 }
              },
        title: {
            display: true,
            fontColor: '#cae8d5',
            // text: 'Custom Chart Title'
        }     ,
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Minutes',
                    fontColor: '#cae8d5'
                },
                gridLines: {display: false},
                ticks: {
                    beginAtZero:true,
                    fontColor: '#cae8d5'
                },
            }],
          xAxes: [{
                gridLines: {display: false},
                ticks: {
                    fontColor: '#cae8d5'
                },
            }]
        } 

    }
    return (
        <div className='slept-per-day'>
    <Bar className='chart'
    options={options}
    ref={this.chartReference}
     data={data} 
    />
    </div>
    )
  }
}
