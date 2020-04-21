import React from 'react'
import axios from 'axios'
import './BabyDisplay.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import LogDisplay from '../LogDisplay/LogDisplay';
import AddBaby from '../AddBaby/AddBaby'
import UpdateBaby from '../UpdateBaby/UpdateBaby'

export default class BabyDisplay extends React.Component {
    constructor(){
        super()
        this.state = {
            babies: [],
            tabIndex: 0,
            selectedTab: 0
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
    setStateOnSelect(baby_id) {
        this.setState({
            selectedTab: baby_id
        })
    }
    render(){
        const mappedNames = this.state.babies.map(baby => {
            
            return (
                <Tab onClick={() => this.setStateOnSelect(baby.baby_id)} key={`Tab${baby.baby_id}`}>{baby.name.toUpperCase()}</Tab>
            )
        })
        const mappedBabies = this.state.babies.map(baby => {
            
            return (
                <TabPanel className='tab-panel' key={`TabPanel${baby.baby_id}`}>
                    <LogDisplay babyId={baby.baby_id} selectedTab={this.state.selectedTab}/>
                    <button className='delete-baby-button' onClick={() => this.deleteBaby(baby.baby_id)}>Delete Baby</button>
                    <UpdateBaby/>
                </TabPanel>
            )
        })

        return(
            <div>

                <div className='baby-container'>
                    <Tabs className='tabs' selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({tabIndex})}>
                        <TabList>
                            {mappedNames}
                        </TabList>
                            {mappedBabies}
                    </Tabs>
                </div>
                <AddBaby/>
            </div>
        )
    }
}