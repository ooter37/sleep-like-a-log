import React from 'react'
import './AddBaby.scss'
import axios from 'axios'
import {connect} from 'react-redux'

export default class AddBaby extends React.Component{
    constructor() {
        super()
        this.state = {
            name: '',
            relationship: ''
        }
    }
}