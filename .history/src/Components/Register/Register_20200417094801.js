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
        // this.toggleRegister = this.toggleRegister.bind(this)
    }

    toggleRegister(){
        this.setState({
            register: !this.state.register
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
    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return(
            <div>
                {
                    (this.state.register)
                    ?
                    <div className='login'>
                        <button onClick={() => this.toggleRegister()}>Sign up</button>
                        Login: 
                        <input placeholder='email' type='text' name='email'
                        value={this.state.email} onChange={e => this.changeHandler(e)}/>
                        <input placeholder='password' type='text' name='password'
                        value={this.state.password} onChange={e => this.changeHandler(e)}/>
                        <button onClick={this.login}>Submit</button>
                    </div>
                    :
                    <div className='register'>
                        <button onClick={() => this.toggleRegister()}>Log in</button>
                        Register: 
                        <input placeholder='email' type='text' name='email'
                        value={this.state.email} onChange={e => this.changeHandler(e)}/>
                        <input placeholder='password' type='text' name='password'
                        value={this.state.password} onChange={e => this.changeHandler(e)}/>
                        <button onClick={this.register}>Submit</button>
                    </div>
                }

            </div>
        )
    }
}