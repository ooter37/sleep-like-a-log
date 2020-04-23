import React from 'react'
import axios from 'axios'
import moment from 'moment'
import './LogDisplay.scss'
import AddLog from '../AddLog/AddLog'
import BarGraph from '../Charts/BarGraph'

export default class LogDisplay extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            logs: [],
            open: false,
            splitData: null
        }
        this.getLogsByBaby = this.getLogsByBaby.bind(this)
        this.togglePanel = this.togglePanel.bind(this)
        this.extractor = this.extractor.bind(this);
    }
    componentDidMount(){
        this.getLogsByBaby()
    }
    getLogsByBaby() {
        const id = this.props.selectedTab
        axios.get(`/api/logs/${id}`).then(res => {
            this.setState({
                logs: res.data
            })
            this.extractor(this.state.logs)
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
    extractor(array) {
        let splitAsleep = [];
        for (let i = 0; i < array.length; i++) {
          for (let key in array[i]) {
            if (key === "asleep") {
              splitAsleep.push([array[i][key].slice(0, 10), array[i][key]]);
            }
          }
        }
        let splitAwake = [];
        for (let i = 0; i < array.length; i++) {
          for (let key in array[i]) {
            if (key === "awake") {
              splitAwake.push([array[i][key].slice(0, 10), array[i][key]]);
            }
          }
        }
        var subtracted = [];
        for (let i = 0; i < splitAsleep.length; i++) {
          subtracted.push([
            splitAsleep[i][0],
            parseInt((moment.duration("2020-04-20T17:40:00.621Z".diff("2020-04-20T16:00:00.621Z"))).asMinutes())
            // moment.duration(moment(splitAwake[i][1]).diff(moment(splitAsleep[i][1])))
            // moment.utc(moment.duration(moment(splitAwake[i][1]).diff(moment(splitAsleep[i][1])),"milliseconds").asMilliseconds()).format("HH:mm"),
          ]);
          this.setState({
            splitData: subtracted,
          });
        }
      }
    render(){
        const mappedLogs = this.state.logs.map(log => {
            const sleepTime = moment.utc(moment.duration(moment(log.awake).diff(moment(log.asleep)), "milliseconds").asMilliseconds()).format("HH:mm")
            return (
                <div className='log-display' key={log.log_id}>
                    <div className='log-display-asleep'>{moment(log.asleep).format('MMMM Do, h:mm A')}</div>
                    <div className='log-display-awake'>{moment(log.awake).format('MMMM Do, h:mm A')}</div>
                    <div className='log-display-length'>{sleepTime}</div>
                    <button className='log-display-delete' onClick={() => this.deleteLog(log.log_id)}>Delete</button>
                </div>
            )
        })
        return(
            <div>
                
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
                <div className='hours-per-day'>
                <BarGraph selectedTab={this.props.selectedTab} splitData={this.state.splitData}/>
                </div>
            </div>
        )
    }
}