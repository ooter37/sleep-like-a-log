import React from 'react'
import './UpdateBaby.scss'
import axios from 'axios'
import {connect} from 'react-redux'

class UpdateBaby extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            babyName: ''
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.updateBaby = this.updateBaby.bind(this)
    }
    changeHandler(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    updateBaby() {
        if (this.state.babyName !== '') {
        if (this.props.user.data) {
            const babyName = this.state.babyName
            const id = this.props.babyId
            axios.put(`/api/babies/${id}`, {babyName}).then(()=> this.props.getBabies())
            .catch(err => console.log('Error updating baby.', err))
        } else {
            window.alert('Please login')
        }
    }
    }
    render(){
        return(
            <div className='update-baby-container'>
                {
                    this.props.updatingName
                    ?
                    <div>
                    <button
                        className='update-baby-button'
                        onClick={() => { if (window.confirm('Are you sure you wish to edit this name?')) {
                            this.updateBaby()
                            this.props.toggleButton()
                        }}
                    }
                    >Submit</button>
                    <input
                        className='update-baby-input'
                        placeholder='Name'
                        type='text'
                        name='babyName'
                        value={this.state.babyName}
                        onChange={this.changeHandler}
                    />
                    <button className='cancel-update-button' onClick={this.props.toggleButton}>Cancel</button>
                    </div>
                    :
                    <button
                        className='update-baby-button'
                        onClick={() => this.props.toggleButton()}
                    >Edit Name</button>
                }
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(UpdateBaby)