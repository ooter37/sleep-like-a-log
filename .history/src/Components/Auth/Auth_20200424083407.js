import React from 'react'
import Login from './Login'
import Register from './Register'
import {Redirect} from 'react-router-dom'

export default class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: true,
            redirect: false
        }
        this.toggleDisplay = this.toggleDisplay.bind(this)
        this.toggleRedirect = this.toggleRedirect.bind(this)
    }
    toggleDisplay(){
        let {display} = this.state
        this.setState({
            display: !display
        })
    }
    toggleRedirect(){
        let {redirect} = this.state
        this.setState({
            redirect: !redirect
        })
    }
    render(){
        if (this.state.redirect) {
            return <Redirect to='/main'/>
        }
        return(
            <div className='landing-login'>
                this is the auth comp
                {
                    this.state.display
                    ?
                    <Login display={this.toggleDisplay} redirect={this.toggleRedirect}/>
                    :
                    <Register display={this.toggleDisplay} redirect={this.toggleRedirect}/>

                }
            </div>
        )
    }
}