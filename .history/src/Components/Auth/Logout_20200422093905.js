import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../redux/reducers/user'
import axios from 'axios'

class Logout extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }
    logoutHandler(){
        this.props.logout().then(() => {
            this.setState({
                redirect: true
            })
        })
    }
    render() {

        return(
            <div>
            <button 
                className='logout-button'
                onClick={this.logoutHandler}
                ></button>
        </div>
    )
}
}

