import React from "react";
import "./Header.scss";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Logout from '../Auth/Logout'
import LoginFromHeader from '../Auth/LoginFromHeader'
import Button from '@material-ui/core/Button'

function Header (props) {

    return (
      <div className="header">
        {
                    !props.user.data
                    ?
                    <div>
                    <LoginFromHeader location={props.location} />
                    {
                      props.location
                      ?
                      <Link to='/'>
                      <Button color='primary' variant='contained' className='click-register-button'>Click to Register</Button>
                      </Link>
                      :
                      null
                    }
                    </div>
                    :
                    <div>
                    <Logout toggleRedirect={props.toggleRedirect} />
                    <h1 className='welcome-username'>Welcome, {props.user.data.email}</h1>
                    </div>
                }
        
      </div>
    );
  }
  

  const mapStateToProps = state => state

  
  export default connect(mapStateToProps, null)(Header)