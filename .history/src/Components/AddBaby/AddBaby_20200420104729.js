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
    }
    changeHandler(){
        this.setState({
            [e.target.name]: e.target.value
        })
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
            </div>
        )
    }
}