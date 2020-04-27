console.log('date comes back',this.state.logs)
        const mappedLogs = this.state.logs.map(log => {
            const sleepTime = moment.utc(
                moment.duration(moment(log.awake).diff(moment(log.asleep)), "milliseconds").asMilliseconds()
                ).format("HH:mm")
            return (
                <div className='log-display' key={log.log_id}>
                    <div className='log-display-asleep'>{moment(log.asleep).format('MMMM Do, h:mm A')}</div>
                    <div className='log-display-awake'>{moment(log.awake).format('MMMM Do, h:mm A')}</div>
                    <div className='log-display-length'>{sleepTime}</div>
                    <button className='log-display-delete' 
                    onClick={() => { if (window.confirm('Are you sure you wish to delete this log entry?')) this.deleteLog(log.log_id) } }
                    >Delete</button>
                </div>
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
                    <div>
                        <div className='log-display-container'>
                        <div className='log-display-labels'>
                            <div className='log-display-asleep'>Fell Asleep At:</div>
                            <div className='log-display-awake'>Woke Up At:</div>
                            <div className='log-display-length'>Length (hr:mn):</div>
                            <div className='log-display-delete'></div>
                        </div>
                            <div className='mapped-logs'>
                        {mappedLogs}
                            </div>
                        </div>
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