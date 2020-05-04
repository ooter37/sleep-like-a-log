import React from 'react'
import axios from 'axios'
import './BabyDisplay.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import LogDisplay from '../LogDisplay/LogDisplay';
import AddBaby from '../AddBaby/AddBaby'
import UpdateBaby from '../UpdateBaby/UpdateBaby'
import {connect} from 'react-redux'
import Loading from '../Loading/Loading'

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
        if (this.props.user.data){
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
            const displayName = baby.name.toUpperCase() + ' #' + baby.baby_id
            return (
                <Tab onClick={() => this.setStateOnSelect(baby.baby_id)} key={`Tab${baby.baby_id}`}>
                    <div className={`${baby.guardian}-container`}>
                        <div className={`guardian-${baby.guardian}`}></div>
                        <div className='tab-baby-name'>{displayName}</div>
                    </div>
            
                </Tab>
            )
        })
        const mappedBabies = this.state.babies.map(baby => {
            
            return (
                <TabPanel className='tab-panel' key={`TabPanel${baby.baby_id}`}>
                    {/* <div className='guardian-status'>Guardian Status</div> */}
                    <LogDisplay identifier={baby.identifier} babyId={baby.baby_id} selectedTab={this.state.selectedTab}/>
                    
                    {
                        (baby.guardian)
                        ?
                        <div className='update-delete-container'>
                        <UpdateBaby toggleButton={this.toggleButton} 
                        updatingName={this.state.updatingName} getBabies={this.getBabies} 
                        babyId={baby.baby_id} babyName={baby.name}/>
                        {
                            this.state.updatingName
                            ?
                            null:
                            <button className='delete-baby-button delete-button' 
                            onClick={() => { if (window.confirm('Are you sure you wish to delete this baby?')) this.deleteBaby(baby.baby_id) } }
                            >Delete Baby</button>
                        }
                    </div>
                    :
                    <p className='update-delete-container'>To edit or delete this baby, please log in to the primary account the baby was initially registered under.</p>
                        }
                </TabPanel>
            )
        })

        return(
            <div>
                {
                    (this.props.user.loading === true && this.props.user.data)
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