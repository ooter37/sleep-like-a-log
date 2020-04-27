import React from 'react'
import axios from 'axios'
import moment from 'moment'
import './LogDisplay.scss'
import AddLog from '../AddLog/AddLog'
import BarGraph from '../Charts/BarGraph'
import {connect} from 'react-redux'

class LogDisplay extends React.Component {
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
        if (1 === 1) {
            const id = this.props.selectedTab
            axios.get(`/api/logs/${id}`).then(res => {
                this.setState({
                    logs: res.data
                })
                this.extractor(this.state.logs)
            }).catch(err => console.log('Error getting logs.', err))
        }
    }
    deleteLog(id) {
        if (this.props.user.data) {
            axios.delete(`/api/logs/${id}`).then(() => {
                this.togglePanel()
                this.getLogsByBaby()
            }).catch(err => console.log('Error deleting log.', err))
        } else {
            window.alert('Please log in.')
        }
    }
    togglePanel() {
        this.setState({
            open: !this.state.open
        })
    }
    extractor(array) {
        
        let splitAsleep = [];
        for (let i = 0; i < array.length; i++) {
          for (let key in array[i]) {
            if (key === "asleep") {
              splitAsleep.push([moment.utc(array[i][key]).local().format('YYYY-MM-DD HH:mm:ss').slice(0, 10), array[i][key]]);
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
        // var subtracted = [];
        let obj = {}
        for (let i = 0; i < splitAsleep.length; i++) {
        //   subtracted.push([
        //     splitAsleep[i][0],
        //     parseInt((moment.duration(moment(splitAwake[i][1]).diff(moment(splitAsleep[i][1])))).asMinutes())
        //   ]);
          obj[splitAsleep[i][1]] = [splitAsleep[i][0], parseInt(
                moment.duration(moment(splitAwake[i][1]).diff(moment(splitAsleep[i][1]))).asMinutes()
              )]
          
        }
        this.setState({
            splitData: obj,
          });
      }
    render(){
        // console.log('date comes back',this.state.logs)
        const mappedLogs = this.state.logs.map(log => {
            const sleepTime = moment.utc(
                moment.duration(moment(log.awake).diff(moment(log.asleep)), "milliseconds").asMilliseconds()
                ).format("HH:mm")
            return (
                <tr key={log.log_id}>
                    <td>{log.asleep}</td>
                    <td>{log.awake}</td>
                    <td>{sleepTime}</td>
                </tr>


                // <div className='log-display' key={log.log_id}>
                //     <div className='log-display-asleep'>{moment(log.asleep).format('MMMM Do, h:mm A')}</div>
                //     <div className='log-display-awake'>{moment(log.awake).format('MMMM Do, h:mm A')}</div>
                //     <div className='log-display-length'>{sleepTime}</div>
                //     <button className='log-display-delete' 
                //     onClick={() => { if (window.confirm('Are you sure you wish to delete this log entry?')) this.deleteLog(log.log_id) } }
                //     >Delete</button>
                // </div>
            )
        })
        return(
            <div className='log-display-container'>
                <AddLog getLogsByBaby={this.getLogsByBaby} babyId={this.props.babyId}/>
                <div onClick={(e) => this.togglePanel(e)} className='collapsible-log-container'>
                    <div className='detailed-logs'>
                        <div className='center-log-name'>
                        DETAILED LOGS (Click to Expand)
                        </div>
                    </div>
                    {
                    this.state.open
                    ?
                    <table>
                        <caption>Logs</caption>
                        <thead>
                            <tr>
                                <th>Asleep</th>
                                <th>Awake</th>
                                <th>Sleep Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mappedLogs}
                        </tbody>
                    </table>
                    // <div>
                    //     <div className='log-display-container'>
                    //     <div className='log-display-labels'>
                    //         <div className='log-display-asleep'>Fell Asleep At:</div>
                    //         <div className='log-display-awake'>Woke Up At:</div>
                    //         <div className='log-display-length'>Length (hr:mn):</div>
                    //         <div className='log-display-delete'></div>
                    //     </div>
                    //         <div className='mapped-logs'>
                    //     {mappedLogs}
                    //         </div>
                    //     </div>
                    // </div>
                    :
                    null
                    }
                </div>
                {
                    this.state.open
                    ?
                    null:
                    <BarGraph selectedTab={this.props.selectedTab} splitData={this.state.splitData}/>
                }   
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(LogDisplay)