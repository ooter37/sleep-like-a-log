import React, { Component } from 'react'
import Chart from "chart.js";
import classes from "./LineGraph.module.css";


export default class LineGraph extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        var ctx = document.getElementById('chart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Risk Level'],
              datasets: [
                {
                  label: 'Low',
                  data: [67.8],
                  backgroundColor: '#D6E9C6',
                },
                {
                  label: 'Moderate',
                  data: [20.7],
                  backgroundColor: '#FAEBCC',
                },
                {
                  label: 'High',
                  data: [11.4],
                  backgroundColor: '#EBCCD1',
                }
              ]
            },
            options: {
              scales: {
                xAxes: [{ stacked: true }],
                yAxes: [{ stacked: true }]
              }
            }
          });
    }
    
}


var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Risk Level'],
      datasets: [
        {
          label: 'Low',
          data: [67.8],
          backgroundColor: '#D6E9C6',
        },
        {
          label: 'Moderate',
          data: [20.7],
          backgroundColor: '#FAEBCC',
        },
        {
          label: 'High',
          data: [11.4],
          backgroundColor: '#EBCCD1',
        }
      ]
    },
    options: {
      scales: {
        xAxes: [{ stacked: true }],
        yAxes: [{ stacked: true }]
      }
    }
  });