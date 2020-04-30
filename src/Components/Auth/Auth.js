import React from 'react'
import Login from './Login'
import Register from './Register'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../redux/reducers/user'

class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: true,
            redirect: false
        }
        this.toggleDisplay = this.toggleDisplay.bind(this)
        this.toggleRedirect = this.toggleRedirect.bind(this)
        // this.loginHandler = this.loginHandler.bind(this)
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
    // loginHandler(e) {
    //     e.preventDefault();
    //     this.props
    //       .login({email: 'sample', password: 'sample'})
    //       .then(() => {
    //         this.toggleRedirect();
    //       })
    //       .catch((err) => {
    //         window.alert('Incorrect username or password.')
    //       });
    //   }
    render(){
        if (this.state.redirect) {
            return <Redirect to='/main'/>
        }
        return(
            <div className='landing-login'>
                {/* <button onClick={this.loginHandler}>Sample</button> */}
                <h1 className='welcome'>Welcome to Sleep Like a Log</h1>
                <div className='introduction'>My name is Derek Lamarr and this is my personal project for my software engineering class. You can use this app to track sleep logs. It's intended for parents to track the logs of new babies, but it will work for any entity that sleeps.</div>
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

export default connect(null, { login })(Auth);
