import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../redux/reducers/user'
import axios from 'axios'

function Logout(props){

    logoutHandler(){
        this.props.logout()
    }
    
    return(
        <div>
            <button 
                className='logout-button'
                onClick={this.logoutHandler}
            ></button>
        </div>
    )
}

