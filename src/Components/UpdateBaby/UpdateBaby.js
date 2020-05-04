import React from 'react'
import './UpdateBaby.scss'
import axios from 'axios'
import {connect} from 'react-redux'

class UpdateBaby extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            babyName: this.props.babyName,
            babyIdentifier: this.props.babyIdentifier
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
            const babyName = this.state.babyName.toUpperCase()
            const babyIdentifier = this.state.babyIdentifier.toUpperCase()
            const id = this.props.babyId
            axios.put(`/api/babies/${id}`, {babyName, babyIdentifier}).then(()=> this.props.getBabies())
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
                    <div className='updating-container'>
                    <button className='cancel-update-button' onClick={this.props.toggleButton}>Cancel</button>
                    <input
                        className='update-baby-input'
                        placeholder='Name'
                        type='text'
                        name='babyName'
                        value={this.state.babyName}
                        onChange={this.changeHandler}
                    />
                    <input
                        className='update-baby-input'
                        placeholder='Identifier'
                        type='text'
                        name='babyIdentifier'
                        value={this.state.babyIdentifier}
                        onChange={this.changeHandler}
                    />
                    <button
                        className='submit-baby-button'
                        onClick={() => { if (this.state.babyName !== '' && this.state.babyIdentifier !== '') {if (window.confirm('Are you sure you wish to edit this baby?')) {
                            this.updateBaby()
                            this.props.toggleButton()
                        }}}
                    }
                    >Submit</button>
                    </div>
                    :
                    <button
                        className='edit-baby-button'
                        onClick={() => this.props.toggleButton()}
                    >Edit Baby</button>
                }
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(UpdateBaby)