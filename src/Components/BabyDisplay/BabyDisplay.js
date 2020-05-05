import React from 'react'
import axios from 'axios'
import './BabyDisplay.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import LogDisplay from '../LogDisplay/LogDisplay';
import AddBaby from '../AddBaby/AddBaby'
import UpdateBaby from '../UpdateBaby/UpdateBaby'
import {connect} from 'react-redux'
import Loading from '../Loading/Loading'
import {pleaseSignIn, confirmDelete,deleteSuccess} from '../Alerts'

class BabyDisplay extends React.Component {
    constructor(){
        super()
        this.state = {
            babies: [],
            sharedBabies: [],
            tabIndex: 0,
            selectedTab: 1,
            updatingName: false,
            sharedOpen: false
        }
        this.deleteBaby = this.deleteBaby.bind(this)
        this.getBabies = this.getBabies.bind(this)
        this.setStateOnSelect = this.setStateOnSelect.bind(this)
        this.toggleButton = this.toggleButton.bind(this)
        this.removeExisting = this.removeExisting.bind(this)
        this.toggleShared = this.toggleShared.bind(this)

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
        }).catch(err => console.log('Error getting babies.', err))
        axios.get('/api/shared').then(res => {
            this.setState({
                sharedBabies: res.data
            })
        }).catch(err => console.log('Error getting shared babies.', err))
    }
    deleteBaby(id,name){
        if (this.props.user.data) {
            axios.delete(`/api/babies/${id}`).then(()=> {
                this.getBabies()
                deleteSuccess.fire({title: `${name} deleted successfully.`})
            })
            .catch(err => console.log('Error deleting baby', err))
        } else {
            pleaseSignIn.fire()
        }
    }
    removeExisting(babyId,userId,name) {
        if (this.props.user.data) {
            axios.delete(`/api/babies/${babyId}/${userId}`).then(() => {
                this.getBabies()
                deleteSuccess.fire({title: `${name} has been removed.`})
            })
            .catch(err => console.log('Error removing baby', err))
        } else {
            pleaseSignIn.fire()
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
    toggleShared() {
        this.setState({
            sharedOpen: !this.state.sharedOpen});}
    render(){
        const mappedShared = this.state.sharedBabies.map(baboo => {
            return (
                <tr key={`shared ${baboo.user_id} ${baboo.baby_id}`} className='shared-display'>
                    <td className='shared-display-name'>{baboo.name}</td>
                    <td className='shared-display-email'>{baboo.email}</td>
                    <td>
                        <button className='revoke-sharing delete-button' 
                            onClick={() => { if (this.props.user.data) {
                            confirmDelete.fire({
                                text: `Are you sure you want to remove ${baboo.name} from ${baboo.email}'s account?`}).then((result) => {
                                if (result.value) {this.removeExisting(baboo.baby_id,baboo.user_id,baboo.name)}})
                            } else {pleaseSignIn.fire()}}}
                    >Revoke</button>
                    </td>
                </tr>
            )
        })
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


                <div className='shared-scroll-container'>
                    <div className='collapsible-shared-container'>
                        <div onClick={(e) => this.toggleShared(e)} className='center-log-name'>
                            {
                            !this.state.sharedOpen 
                            ? 
                            null 
                            : 
                            (<div className='shared-collapse-button'>Collapse</div>)
                            }
                        </div>
                        {
                        this.state.sharedOpen 
                        ? 
                        (<div>
                            <table>
                                <thead className='shared-display-container'>
                                    <tr className='shared-display-labels'>
                                        <th className='shared-display-name'>Name</th>
                                        <th className='shared-display-email'>Shared With</th>
                                    </tr>
                                </thead>
                                <tbody>{mappedShared}</tbody>
                            </table>
                        </div>) 
                        : 
                        (<div className='shared-expand-button' onClick={(e) => this.toggleShared(e)}>Shared Babies</div>)
                        }
                    </div>

                </div>
    

                    <LogDisplay babyName={baby.name} guardian={baby.guardian} removeExisting={this.removeExisting} sharedBabies={this.state.sharedBabies} identifier={baby.identifier} babyId={baby.baby_id} selectedTab={this.state.selectedTab}/>
                    {
                    (baby.guardian)
                    ?
                    <div className='update-delete-container'>
                        <UpdateBaby toggleButton={this.toggleButton} 
                        updatingName={this.state.updatingName} getBabies={this.getBabies} 
                        babyId={baby.baby_id} babyName={baby.name} babyIdentifier={baby.identifier}/>
                        {
                        this.state.updatingName
                        ?
                        null:
                        <button className='delete-baby-button delete-button' 
                        onClick={() => { if (this.props.user.data) {
                            confirmDelete.fire({
                                text: `Are you sure you want to delete ${baby.name}?`}).then((result) => {
                                if (result.value) {this.deleteBaby(baby.baby_id, baby.name)}})
                        } else {pleaseSignIn.fire()}}}
                    >Delete Baby</button>
                        }
                        {/* <div>Shared Babies</div> */}
                    </div>
                    :
                    <button className='delete-baby-button delete-button' 
                    onClick={() => { if (this.props.user.data) {
                        confirmDelete.fire({
                            text: `Are you sure you want to remove ${baby.name} from your account?`}).then((result) => {
                            if (result.value) {this.removeExisting(baby.baby_id,this.props.user.data.user_id,baby.name)}})
                        } else {pleaseSignIn.fire()}}}
                    >Remove Baby</button>
                    
                    }
                </TabPanel>
            )
        })

        return(
            <div>
                {
                    (this.props.user.loading === true)
                    // (this.props.user.loading === true && this.props.user.data)
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