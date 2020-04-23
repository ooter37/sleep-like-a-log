import React from 'react'
import axios from 'axios'
import moment from 'moment'
import './LogDisplay.scss'
import AddLog from '../AddLog/AddLog'
import Chart from "chart.js"

export default class LogDisplay extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            logs: [],
            open: false
        }
        this.getLogsByBaby = this.getLogsByBaby.bind(this)
        this.togglePanel = this.togglePanel.bind(this)
        this.chartCreator = this.chartCreator.bind(this)
    }
    componentDidMount(){
        this.getLogsByBaby()
        this.chartCreator()

    }
    chartCreator() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [
                    {
                      label: 'Low',
                      data: [67.8],
                      backgroundColor: '#D6E9C6' // green
                    },
                    {
                      label: 'Moderate',
                      data: [20.7],
                      backgroundColor: '#FAEBCC' // yellow
                    },
                    {
                      label: 'High',
                      data: [11.4],
                      backgroundColor: '#EBCCD1' // red
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
    getLogsByBaby() {
        const id = this.props.selectedTab
        axios.get(`/api/logs/${id}`).then(res => {
            this.setState({
                logs: res.data
            })
        })
    }
    deleteLog(id) {
        axios.delete(`/api/logs/${id}`).then(() => this.getLogsByBaby()).catch(err => console.log('Error deleting log', err))
    }
    togglePanel(e) {
        this.setState({
            open: !this.state.open
        })
    }
    render(){
        const mappedLogs = this.state.logs.map(log => {
            return (
                <div className='log-display' key={log.log_id}>
                    <div className='log-display-asleep'>{moment(log.asleep).format('MMMM Do, h:mm A')}</div>
                    <div className='log-display-awake'>{moment(log.awake).format('MMMM Do, h:mm A')}</div>
                    <div className='log-display-length'>{moment.utc(moment.duration(moment(log.awake).diff(moment(log.asleep)), "milliseconds").asMilliseconds()).format("HH:mm")}</div>
                    <button className='log-display-delete' onClick={() => this.deleteLog(log.log_id)}>Delete</button>
                </div>
            )
        })
        return(
            
            <div>
                <div className='chart'>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
                <AddLog getLogsByBaby={this.getLogsByBaby} babyId={this.props.babyId}/>
                <div onClick={(e) => this.togglePanel(e)} className='collapsible-log-container'>
                    <div className='detailed-logs'>
                        DETAILED LOGS (Click to Expand)
                    </div>
                    {
                    this.state.open
                    ?
                    <div className='log-display-container'>
                    <div className='log-display-labels'>
                        <div className='log-display-asleep'>Fell Asleep At:</div>
                        <div className='log-display-awake'>Woke Up At:</div>
                        <div className='log-display-length'>Length (hr:mn):</div>
                        <div className='log-display-delete'></div>
                    </div>
                    {mappedLogs}
                    </div>
                    :
                    null
                    }
                </div>   
            </div>
        )
    }
}