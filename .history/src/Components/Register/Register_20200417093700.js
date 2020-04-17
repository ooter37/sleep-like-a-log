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
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.toggleRegister = this.toggleRegister.bind(this)
    }

    toggleRegister(){
        this.setState({
            register: this.state.register
        })
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
        console.log(user.data)
    }
    render() {
        return(
            <div>
                {
                    (this.state.register)
                    ?
                    <div className='login'>
                        Login
                        <button onClick={this.toggleRegister()}>Sign up</button>
                    </div>
                    :
                    <div className='register'>
                        Register
                        <button onClick={this.toggleRegister()}>Log in</button>
                    </div>
                }

            </div>
        )
    }
}