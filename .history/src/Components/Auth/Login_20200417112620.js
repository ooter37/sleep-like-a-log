import React from 'react'
import {connect} from 'react-redux'
import {login} from '../../redux/reducers/user'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    loginHandler(e) {
        e.preventDefault()
        this.props.login(this.state).then(() => {
            this.props.redirect()
        }).catch(err => console.log('Error with login.', err))
    }
}






<div className='login'>
                        <button onClick={() => this.toggleRegister()}>Sign up</button>
                        Login: 
                        <input placeholder='email' type='text' name='email'
                        value={this.state.email} onChange={e => this.changeHandler(e)}/>
                        <input placeholder='password' type='text' name='password'
                        value={this.state.password} onChange={e => this.changeHandler(e)}/>
                        <button onClick={this.login}>Submit</button>
                    </div>



    async register(){
        const {email,password} = this.state
        const user = await axios.post('/auth/register', {email,password})
        .catch(err => console.log('Error with registration.', err))
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
    }