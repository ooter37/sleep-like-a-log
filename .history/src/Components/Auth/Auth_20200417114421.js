import React from 'react'
import Login from './Login'
import Register from './Register'
import {redirect} from 'react-router-dom'

export default class Auth extends React.Component {
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
    render(){
        if (this.state.redirect) {
            return <Redirect to='/main'/>
        }
        return(
            <div>
                {
                    display
                    ?
                    <Login display={this.toggleDisplay} redirect={this.toggleRedirect}/>
                    :
                    <Register display={this.toggleDisplay} redirect={this.toggleRedirect}/>

                }
            </div>
        )
    }
}