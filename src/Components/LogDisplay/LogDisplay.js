import React from "react";
import axios from "axios";
import moment from "moment";
import "./LogDisplay.scss";
import AddLog from "../AddLog/AddLog";
import BarGraph from "../Charts/BarGraph";
import { connect } from "react-redux";

class LogDisplay extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        logs: [],
        open: false,
        splitData: null,
        sort: {
            column: null,
            direction: "desc",},
        lengthArray: []
    };
    this.getLogsByBaby = this.getLogsByBaby.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
    this.extractor = this.extractor.bind(this);
    this.onSort = this.onSort.bind(this);
    this.deleteLog = this.deleteLog.bind(this);
    this.setArrow = this.setArrow.bind(this);
}
componentDidMount() {
    if (this.props.user.data) {
        this.getLogsByBaby();
    }
}
getLogsByBaby() {
    if (this.props.user.data) {
        const id = this.props.babyId;
        axios.get(`/api/logs/${id}`).then((res) => {
            this.setState({
                logs: res.data});
            this.extractor(this.state.logs);
        }).catch((err) => console.log("Error getting logs.", err))}}
deleteLog(id) {
    if (this.props.user.data) {
        axios.delete(`/api/logs/${id}`).then(() => {
            this.togglePanel();
            this.getLogsByBaby();})
        .catch((err) => console.log("Error deleting log.", err));
    } else {
        window.alert("Please log in.");}}
togglePanel() {
    this.setState({
        open: !this.state.open});}
extractor(array) {
    let splitAsleep = [];
    for (let i = 0; i < array.length; i++) {
        for (let key in array[i]) {
            if (key === "asleep") {
                splitAsleep.push([moment.utc(array[i][key]).local().format("YYYY-MM-DD HH:mm:ss").slice(0, 10),array[i][key],]);}}}
    let splitAwake = [];
    for (let i = 0; i < array.length; i++) {
        for (let key in array[i]) {
            if (key === "awake") {splitAwake.push([array[i][key].slice(0, 10), array[i][key]]);}}}
    let obj = {};
    for (let i = 0; i < splitAsleep.length; i++) {
        obj[splitAsleep[i][1]] = [splitAsleep[i][0],parseInt(moment.duration(moment(splitAwake[i][1]).diff(moment(splitAsleep[i][1]))).asMinutes()),];}
        this.setState({splitData: obj,});
}
onSort = (column) => (e) => {
    const direction = this.state.sort.column ? this.state.sort.direction === "asc" ? "desc" : "asc" : "desc";
    const sortedData = this.state.logs.sort((a, b) => {
        if (column === "asleep") {
            if (a.asleep < b.asleep) {
                return -1;
            }
            if (a.sleep > b.asleep) {
                return 1;
            }
            return 0;
        } else if (column === "awake") {
            if (a.awake < b.awake) {
                return -1;
            }
            if (a.awake > b.awake) {
                return 1;
            }
            return 0;
        } else if (column === "length") {
            if (moment.utc(moment.duration(moment(a.awake).diff(moment(a.asleep)),"milliseconds").asMilliseconds()).format("HH:mm") < moment.utc(moment.duration(moment(b.awake).diff(moment(b.asleep)),"milliseconds").asMilliseconds()).format("HH:mm")) {
                return -1;
            }
            if (moment.utc(moment.duration(moment(a.awake).diff(moment(a.asleep)),"milliseconds").asMilliseconds()).format("HH:mm") > moment.utc(moment.duration(moment(b.awake).diff(moment(b.asleep)),"milliseconds").asMilliseconds()).format("HH:mm")) {
                return 1;
            }
            return 0;
        } else  
            if (a.email < b.email) {
                return -1;
            }
            if (a.email > b.email) {
                return 1;
            }
            return 0;
    });
    if (direction === "desc") {
        sortedData.reverse();
    }
    this.setState({
        logs: sortedData,
        sort: { column, direction },
    });
};
setArrow = (column) => {
    let className = "sort-direction";
    if (this.state.sort.column === column) {
        className += this.state.sort.direction === "asc" ? " asc" : " desc";
    }
    return className;
};
revokeShared(babyId,userId){

}
render() {
    const mappedShared = this.props.sharedBabies.map(baboo => {
        return (
            <div key={`shared${baboo.baby_id}`} className='shared-babies-container'>
                <p>Baby: {baboo.name}</p>
                <p>Shared With: {baboo.email}</p>
                <button className='revoke-sharing delete-button' 
                    onClick={() => { if (window.confirm(`Are you sure you wish to remove ${baboo.name} from ${baboo.email}'s account?`)) 
                    this.props.removeExisting(baboo.baby_id,baboo.user_id) } }
                    >Revoke</button>
            </div>
        )
    })
    const mappedLogs = this.state.logs.map((log, index) => {
        const length = moment.utc(moment.duration(moment(log.awake).diff(moment(log.asleep)),"milliseconds").asMilliseconds()).format("HH:mm");
        return (
        <tr className='log-display' key={log.log_id}>
            <td>
                <button
                    className='log-display-delete delete-button'
                    onClick={() => {
                        if (window.confirm("Are you sure you wish to delete this log entry?"))
                        this.deleteLog(log.log_id);}}>Delete
                </button>
            </td>
            <td className='log-display-asleep'>{moment(log.asleep).format("MMMM Do, h:mm A")}</td>
            <td className='log-display-awake'>{moment(log.awake).format("MMMM Do, h:mm A")}</td>
            <td className='log-display-length'>{length}</td>
            <td className='log-display-name'>{log.email}</td>
        </tr>)})
    return (
    <div className='log-display-container'>
        <div className='identifier-log-container'>
            <AddLog getLogsByBaby={this.getLogsByBaby} babyId={this.props.babyId}/>
            <p className='identifier-label'>Identifier: {this.props.identifier}</p>
            <div>{mappedShared}</div>
        </div>
        <div className='scroll-container'>
            <div className='collapsible-log-container'>
            <div onClick={(e) => this.togglePanel(e)} className='center-log-name'>
                {
                !this.state.open 
                ? 
                null 
                : 
                (<div className='click-to-collapse'>Click to Collapse</div>)
                }
            </div>
            {
            this.state.open 
            ? 
            (<div>
                <table>
                    <thead className='log-display-container'>
                        <tr className='log-display-labels'>
                            <th className='log-display-asleep sort-asleep' onClick={this.onSort("asleep")}>
                                Asleep
                                <span className={this.setArrow("asleep")}></span>
                            </th>
                            <th className='log-display-awake sort-awake' onClick={this.onSort("awake")}>
                                Awake
                                <span className={this.setArrow("awake")}></span>
                            </th>
                            <th className='log-display-length sort-length' onClick={this.onSort("length")}>
                                Length
                                <span className={this.setArrow("length")}></span>
                            </th>
                            <th className='log-display-name sort-email' onClick={this.onSort("email")}>
                                Added By
                                <span className={this.setArrow("email")}></span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{mappedLogs}</tbody>
                </table>
            </div>) 
            : 
            (<div className='click-to-expand' onClick={(e) => this.togglePanel(e)}>
                Detailed Logs (Click to Expand)
            </div>)
            }
        </div>
    </div>
    {
    this.state.open 
    ? 
    null 
    : 
    (<BarGraph selectedTab={this.props.selectedTab} splitData={this.state.splitData}/>)
    }
    </div>
    );}}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(LogDisplay);
