import React from 'react'
import './UpdateBaby.scss'
import axios from 'axios'
import {connect} from 'react-redux'

class UpdateBaby extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            babyName: '',
            updating: false
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.toggleButton = this.toggleButton.bind(this)
        this.updateBaby = this.updateBaby.bind(this)
    }
    changeHandler(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    toggleButton(){
        let {updating} = this.state
        this.setState({
            updating: !updating
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
                    this.state.updating
                    ?
                    <div>
                    <button
                        className='update-baby-button'
                        onClick={() => {
                            this.updateBaby()
                            this.toggleButton()
                        }
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
                    </div>
                    :
                    <button
                        className='update-baby-button'
                        onClick={() => this.toggleButton()}
                    >Edit Name</button>
                }
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(UpdateBaby)