import React from "react";
import "./Charts.scss";
import CanvasJS from 'canvasjs'



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

  
  render() {
      console.log(this.props.splitData)
    return <div>
    
  </div>
  }
}
