import React from 'react'
import axios from 'axios'
import './BabyDisplay.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import LogDisplay from '../LogDisplay/LogDisplay';
import AddBaby from '../AddBaby/AddBaby'
import UpdateBaby from '../UpdateBaby/UpdateBaby'
import {connect} from 'react-redux'
import Loading from '../Loading/Loading'
import Button from '@material-ui/core/Button'

class BabyDisplay extends React.Component {
    constructor(){
        super()
        this.state = {
            babies: [],
            tabIndex: 0,
            selectedTab: 1,
            updatingName: false
        }
        this.deleteBaby = this.deleteBaby.bind(this)
        this.getBabies = this.getBabies.bind(this)
        this.setStateOnSelect = this.setStateOnSelect.bind(this)
        this.toggleButton = this.toggleButton.bind(this)
    }
    componentDidUpdate(prevProps){
        if (!this.props.user.data && this.state.babies[0]) {
            this.setState({
                babies: []
            })
        }
        if (this.props.user.data && !prevProps.user.data){
            this.getBabies()
            }
        }
    componentDidMount(){
        if (this.props.user){
            this.getBabies()
        }
    }
    getBabies(){
        axios.get('/api/babies').then(res => {
            this.setState({
                babies: res.data
            })
        }).catch(err => console.log('Error getting babies', err))
    }
    deleteBaby(id){
        if (this.props.user.data) {
            axios.delete(`/api/babies/${id}`).then(()=> this.getBabies())
            .catch(err => console.log('Error deleting baby', err))
        } else {
            window.alert('Please log in.')
        }
    }
    setStateOnSelect(baby_id) {
        this.setState({
            selectedTab: baby_id
        })
    }
    toggleButton(){
        let {updatingName} = this.state
        this.setState({
            updatingName: !updatingName
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
                    {
                        this.state.updatingName
                        ?
                        null:
                        <div className='delete-baby-button delete-button'><Button 
                        color='secondary' 
                        variant='contained' 
                        onClick={() => { if (window.confirm('Are you sure you wish to delete this baby?')) this.deleteBaby(baby.baby_id) } }
                    >Delete Baby</Button></div>
                    }
                    <UpdateBaby toggleButton={this.toggleButton} updatingName={this.state.updatingName} getBabies={this.getBabies} babyId={baby.baby_id} babyName={baby.name}/>
                </TabPanel>
            )
        })

        return(
            <div>
                {
                    (this.props.user.loading === true)
                    ?
                    <Loading/>
                    :
                    <div className='baby-container'>
                 
                
                    <Tabs className='tabs' selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({tabIndex})}>
                        <TabList>
                            {mappedNames}
                            <Tab>ADD BABY</Tab>
                        </TabList>
                            {mappedBabies}
                            <TabPanel>
                                <AddBaby babies={this.state.babies} getBabies={this.getBabies}/>
                            </TabPanel>
                    </Tabs>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(BabyDisplay)