import React from 'react'
import {Doughnut} from 'react-chartjs-2';


export default class BarGraph extends React.Component {
    constructor(props) {
      super(props);
      this.chartReference = React.createRef();
    }
  
    componentDidMount() {
      console.log(this.chartReference); // returns a Chart.js instance reference
    }
  
    render() {
      return (<Doughnut ref={this.chartReference} data={data} options={options} />)
    }
  }