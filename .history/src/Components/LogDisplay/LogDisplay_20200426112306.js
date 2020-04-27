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
            }}}
        let splitAwake = [];
        for (let i = 0; i < array.length; i++) {
            for (let key in array[i]) {
            if (key === "awake") {
                splitAwake.push([array[i][key].slice(0, 10), array[i][key]]);
            }}}
        let obj = {}
        for (let i = 0; i < splitAsleep.length; i++) {
            obj[splitAsleep[i][1]] = [splitAsleep[i][0], parseInt(moment.duration(moment(splitAwake[i][1]).diff(moment(splitAsleep[i][1]))).asMinutes())]}
        this.setState({
            splitData: obj,
        });
    }
    onSort = (column) => (e) => {
        const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
        const sortedData = this.state.logs.sort((a, b) => {
            if (column === 'asleep') {
                if (a.asleep < b.asleep) {
                    return -1;
            }
            if (a.sleep > b.asleep) {
                return 1;
            }
            return 0;
        } else if (column === 'awake') {
            return a.awake - b.awake;
        } else
        return a.time - b.time
        });
        if (direction === 'desc') {
            sortedData.reverse();
        }
        this.setState({
            logs: sortedData,
            sort: {column, direction,}
        })
    }
    render(){
        const mappedLogs = this.state.logs.map((log,index) => {
        const time = moment.utc(moment.duration(moment(log.awake).diff(moment(log.asleep)), "milliseconds").asMilliseconds()).format("HH:mm")
            return (
                <div className='log-display'>

                <tr   key={log.log_id}>
                    <td className='log-display-asleep'>{moment(log.asleep).format('MMMM Do, h:mm A')}</td>
                    <td className='log-display-awake'>{moment(log.awake).format('MMMM Do, h:mm A')}</td>
                    <td className='log-display-length'>{time}</td>
                    <td className='log-display-delete' 
                    onClick={() => { if (window.confirm('Are you sure you wish to delete this log entry?')) this.deleteLog(log.log_id) } }
                    >Delete</td>
                </tr>
                    </div>
            )
        })
        return (
            <div className='log-display-container'>
                <AddLog getLogsByBaby={this.getLogsByBaby} babyId={this.props.babyId}/>
                <div  className='collapsible-log-container'>
                    <div className='detailed-logs'>
                        <div onClick={(e) => this.togglePanel(e)} className='center-log-name'>
                            {
                                !this.state.open
                                ?
                                <div>DETAILED LOGS (Click to Expand)</div>
                                :
                                <div className='click-to-collapse'>Click to Collapse</div>
                            }
                        </div>
                    </div>
                    {
                    this.state.open
                    ?
                <div>
                        <table>
                <thead className='log-display-container'>
                    <tr className='log-display-labels'>
                        <th className='log-display-asleep' onClick={this.onSort('asleep')}>Asleep</th>
                        <th className='log-display-awake' onClick={this.onSort('awake')}>Awake</th>
                        <th className='log-display-length' onClick={this.onSort('time')}>Time</th>
                        <th className='log-display-delete'></th>
                    </tr>
                </thead>
                <tbody>
                    {mappedLogs}
                </tbody>
            </table>
                    </div>
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