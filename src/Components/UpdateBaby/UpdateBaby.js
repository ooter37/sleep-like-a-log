import React from 'react'
import './UpdateBaby.scss'
import axios from 'axios'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'

class UpdateBaby extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            babyName: this.props.babyName
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
        if (this.props.user.data) {
            const babyName = this.state.babyName
            const id = this.props.babyId
            axios.put(`/api/babies/${id}`, {babyName}).then(()=> this.props.getBabies())
            .catch(err => console.log('Error updating baby.', err))
        } else {
            window.alert('Please login')
        }
    }
    render(){
        return(
            <div className='update-baby-container'>
                {
                    this.props.updatingName
                    ?
                    <div>
                    <Button
                        color='primary' variant='contained' 
                        className='update-baby-button'
                        onClick={() => { if (this.state.babyName !== '') {if (window.confirm('Are you sure you wish to edit this name?')) {
                            this.updateBaby()
                            this.props.toggleButton()
                        }}}
                    }
                    >Submit</Button>
                    <input
                        className='update-baby-input'
                        placeholder='Name'
                        type='text'
                        name='babyName'
                        value={this.state.babyName}
                        onChange={this.changeHandler}
                    />
                    <Button color='primary' variant='contained' className='cancel-update-button' onClick={this.props.toggleButton}>Cancel</Button>
                    </div>
                    :
                    <Button
                    color='primary' variant='contained' 
                        className='update-baby-button'
                        onClick={() => this.props.toggleButton()}
                    >Edit Baby Name</Button>
                }
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(UpdateBaby)