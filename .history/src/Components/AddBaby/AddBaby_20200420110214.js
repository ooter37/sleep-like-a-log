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
    }
    changeHandler(){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addBaby(){
        const babyName = this.state.babyName
        const user_id = this.props.user.data.user_id
        const relationship = this.state.relationship
        axios.post('api/babies', {name, user_id,relationship})
    }
    render() {
        return (
            <div className='add-baby'>
                <input
                    placeholder='babyName'
                    type='text'
                    name='babyName'
                    value={this.state.babyName}
                    onChange={(e) => this.changeHandler(e)}
                />
                <input
                    placeholder='relationship'
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