import React from 'react'
import axios from 'axios'
import AddLog from '../AddLog/AddLog'
import './BabyDisplay.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import LogDisplay from '../LogDisplay/LogDisplay';

export default class BabyDisplay extends React.Component {
    constructor(){
        super()
        this.state = {
            babies: [],
            tabIndex: 0,
            selectedTab: ''
        }
        this.deleteBaby = this.deleteBaby.bind(this)
        this.getBabies = this.getBabies.bind(this)
        this.setStateOnSelect = this.setStateOnSelect.bind(this)
    }

    componentDidMount(){
        this.getBabies()
    }
    getBabies(){
        axios.get('/api/babies').then(res => {
            this.setState({
                babies: res.data
            })
        }).catch(err => console.log('Error getting babies', err))
    }
    deleteBaby(id){
        axios.delete(`/api/babies/${id}`).then(()=> this.getBabies()).catch(err => console.log('Error deleting baby', err))
    }
    setStateOnSelect(val) {
        this.setState({
            selectedTab: val
        })
    }
    render(){
        console.log(this.selectedTab)
        const mappedNames = this.state.babies.map(baby => {
            
            return (
                <Tab onSelect={() => this.setStateOnSelect('test')} key={`Tab${baby.baby_id}`}>{baby.name.toUpperCase()}</Tab>
            )
        })
        const mappedBabies = this.state.babies.map(baby => {
            
            return (
                <TabPanel className='tab-panel' key={`TabPanel${baby.baby_id}`}>
                    <AddLog babyId={baby.baby_id}/>
                    <button onClick={() => this.deleteBaby(baby.baby_id)}>Delete Baby</button>
                    <LogDisplay babyId={baby.baby_id}/>
                </TabPanel>
            )
        })

        return(
                <div className='baby-container'>
                    <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({tabIndex})}>
                        <TabList>
                    {mappedNames}
                        </TabList>
                        {mappedBabies}
                    </Tabs>
                </div>
        )
    }
}