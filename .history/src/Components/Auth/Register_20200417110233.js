import React from 'react'
import axios from 'axios'
import './Register.scss'
import {connect} from 'react-redux'
import {register} from '../../redux/reducers/user'

class Register extends React.Component{
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

    registerHandler(e) {
        e.preventDefault()
        this.props.register(this.state).then(() => {
            this.props.redirect()
        })
        .catch(err => console.log('Error registering.', err))

    }


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
    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return(
            <div className='register'>
   
                    <div className='register'>
                        <form>
                        <button onClick={() => this.toggleRegister()}>Log in</button>
                        Register: 
                        <input placeholder='email' type='text' name='email'
                        value={this.state.email} onChange={e => this.changeHandler(e)}/>
                        <input placeholder='password' type='text' name='password'
                        value={this.state.password} onChange={e => this.changeHandler(e)}/>
                        <button>Register</button>
                        </form>
                        <button onClick={this.register}>Submit</button>
                    </div>
                

            </div>
        )
    }
}

export default connect(null, {register})(register)