import React from 'react'
import axios from 'axios'

export default class Register extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            register: false
        }
    }
    async login(){
        const {email,password} = this.state
        const user = await axios.post('/auth/login',{email,password})
        .catch(err => console.log('Error with login.', err))
        console.log(user.data)
    }
    async register(){
        const {email,password} = this.state
        const user = await axios.post('/auth/register', {email,password})
        .catch(err => console.log('Error with registration.', err))
    }
    render() {
        return(
            <div>this is the register component</div>
        )
    }
}