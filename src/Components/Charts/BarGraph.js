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
    const today = moment().format().slice(0,10)
    const minusOne = moment().subtract(1,'days').format().slice(0,10)
    const minusTwo = moment().subtract(2,'days').format().slice(0,10)
    const minusThree = moment().subtract(3,'days').format().slice(0,10)
    const minusFour = moment().subtract(4,'days').format().slice(0,10)
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
          backgroundColor: "#cae8d5",
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
          display: false,
             labels: {
                  fontColor: 'red',
                  fontSize: 16,
                  display: false
                 }
              },
        title: {
            display: false,
            fontColor: '#cae8d5',
            fontSize: 18
            // text: 'Custom Chart Title'
        }     ,
        scales: {
            yAxes: [{
                scaleLabel: {
                  display: true,
                  abelString: 'Minutes',
                  fontColor: '#cae8d5'
                },
                gridLines: {display: false},
                ticks: {
                    beginAtZero:true,
                    fontColor: '#cae8d5'
                },
            }],
          xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Minutes Slept Over the Last Five Days',
                  fontColor: '#cae8d5',
                  fontSize: 18
              },
                gridLines: {display: false},
                ticks: {
                    fontColor: '#cae8d5',
                    fontSize: 16
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
