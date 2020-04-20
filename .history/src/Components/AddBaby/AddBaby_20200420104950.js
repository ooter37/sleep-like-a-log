import React from 'react'
import './AddBaby.scss'
import axios from 'axios'
import {connect} from 'react-redux'

export default class AddBaby extends React.Component{
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