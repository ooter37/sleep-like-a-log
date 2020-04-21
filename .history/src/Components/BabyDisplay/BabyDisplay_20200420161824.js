import React from 'react'
import axios from 'axios'
import AddLog from '../AddLog/AddLog'
import './BabyDisplay.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default class BabyDisplay extends React.Component {
    constructor(){
        super()
        this.state = {
            babies: [],

        }
        this.deleteBaby = this.deleteBaby.bind(this)
        this.getBabies = this.getBabies.bind(this)
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

    render(){
        const mappedNames = this.state.babies.map(baby => {
            
            return (
                <Tab>{baby.name}</Tab>
            )
        })
        const mappedBabies = this.state.babies.map(baby => {
            
            return (
                <TabPanel>{baby.name} tab</TabPanel>
            )
        })

        return(
                <div className='baby-container'>
                    <Tabs>
                        <TabList>
                    {mappedNames}
                        </TabList>
                        {mappedBabies}
                    </Tabs>
                </div>
        )
    }
}