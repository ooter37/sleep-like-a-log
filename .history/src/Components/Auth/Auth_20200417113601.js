import React from 'react'
import Login from './Login'
import Register from './Register'
import {redirect} from 'react-router-dom'

class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: true,
            redirect: false
        }
    }
    toggleDisplay(){
        let {display} = this.state
        this.state({
            display: !display
        })
    }
    toggleRedirect(){
        let {redirect} = this.state
        this.setState({
            redirect: !redirect
        })
    }
}