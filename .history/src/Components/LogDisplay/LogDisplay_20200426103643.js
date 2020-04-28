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
            splitData: null,
            sort: {
                column: null,
                direction: 'desc'
            }
        }
        this.getLogsByBaby = this.getLogsByBaby.bind(this)
        this.togglePanel = this.togglePanel.bind(this)
        this.extractor = this.extractor.bind(this);
        this.onSort = this.onSort.bind(this)
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
    //   onSort(e, key){
    //       const logs = this.state.logs
    //       logs.sort((a,b) => a[key].localeCompare(b[key]))
    //       this.setState({
    //           logs: logs
    //       })
    //   }
      onSort = (column) => (e) => {
        const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
        const sortedData = this.state.data.sort((a, b) => {
          if (column === 'asleep') {
            const nameA = a.asleep.toUpperCase(); // ignore upper and lowercase
            const nameB = b.asleep.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
      
            // names must be equal
            return 0;
          } else {
            return a.awake - b.awake;
          }
        });
      
        if (direction === 'desc') {
          sortedData.reverse();
        }
      
        this.setState({
          logs: sortedData,
          sort: {
            column,
            direction,
          }
        });
      };
    render(){
        let logs = this.state.logs

        return (
            <table>
                <thead>
                    <tr>
                        <th onClick={e => this.onSort(e, 'asleep')}>Asleep</th>
                        <th onClick={e => this.onSort(e, 'awake')}>Awake</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(function(log,index){
                        return (
                            <tr key={index} data-item={log}>
                                <td date-title="Asleep">{log.asleep}</td>
                                <td date-title="Awake">{log.awake}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )

        // console.log('date comes back',this.state.logs)
        // const mappedLogs = this.state.logs.map(log => {
        //     const sleepTime = moment.utc(
        //         moment.duration(moment(log.awake).diff(moment(log.asleep)), "milliseconds").asMilliseconds()
        //         ).format("HH:mm")
        //     return (
        //         <div className='log-display' key={log.log_id}>
        //             <div className='log-display-asleep'>{moment(log.asleep).format('MMMM Do, h:mm A')}</div>
        //             <div className='log-display-awake'>{moment(log.awake).format('MMMM Do, h:mm A')}</div>
        //             <div className='log-display-length'>{sleepTime}</div>
        //             <button className='log-display-delete' 
        //             onClick={() => { if (window.confirm('Are you sure you wish to delete this log entry?')) this.deleteLog(log.log_id) } }
        //             >Delete</button>
        //         </div>
        //     )
        // })
        // return(
        //     <div className='log-display-container'>
        //         <AddLog getLogsByBaby={this.getLogsByBaby} babyId={this.props.babyId}/>
        //         <div onClick={(e) => this.togglePanel(e)} className='collapsible-log-container'>
        //             <div className='detailed-logs'>
        //                 <div className='center-log-name'>
        //                 DETAILED LOGS (Click to Expand)
        //                 </div>
        //             </div>
        //             {
        //             this.state.open
        //             ?
        //             <div>
        //                 <div className='log-display-container'>
        //                 <div className='log-display-labels'>
        //                     <div className='log-display-asleep'>Fell Asleep At:</div>
        //                     <div className='log-display-awake'>Woke Up At:</div>
        //                     <div className='log-display-length'>Length (hr:mn):</div>
        //                     <div className='log-display-delete'></div>
        //                 </div>
        //                     <div className='mapped-logs'>
        //                 {mappedLogs}
        //                     </div>
        //                 </div>
        //             </div>
        //             :
        //             null
        //             }
        //         </div>
        //         {
        //             this.state.open
        //             ?
        //             null:
        //             <BarGraph selectedTab={this.props.selectedTab} splitData={this.state.splitData}/>
        //         }   
        //     </div>
        // )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(LogDisplay)