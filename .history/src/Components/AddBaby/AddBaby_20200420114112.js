import React from 'react'
import './AddBaby.scss'
import axios from 'axios'
import {connect} from 'react-redux'

class AddBaby extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            babyName: '',
            relationship: ''
        }
        this.addBaby = this.addBaby.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }
    changeHandler(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addBaby(){
        const babyName = this.state.babyName
        const user_id = this.props.user.data.user_id
        const relationship = this.state.relationship
        console.log('babyname', babyName)
        console.log('user id', user_id)
        console.log('relationship', relationship)
        axios.post('api/babies', {babyName, user_id,relationship})
    }
    render() {
        console.log('log fromm addbaby', this.props.user.data)
        return (
            <div className='add-baby'>
                <input
                    placeholder='Name'
                    type='text'
                    name='babyName'
                    value={this.state.babyName}
                    onChange={(e) => this.changeHandler(e)}
                />
                <input
                    placeholder='Relationship'
                    type='text'
                    name='relationship'
                    value={this.state.relationship}
                    onChange={(e) => this.changeHandler(e)}
                />
                <button onClick={this.addBaby}>Add Baby</button>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(AddBaby)