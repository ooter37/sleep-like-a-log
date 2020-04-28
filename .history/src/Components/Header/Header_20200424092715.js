import React from "react";
import "./Header.scss";
import Logout from '../Auth/Logout'
import requestUserData from '../../redux/reducers/user'
import {connect} from 'react-redux'
import Login from '../Auth/Login'

function Header(props) {
    return (
      <div className="header">
        {
                    !props.user.data
                    ?
                    <div>
                    <Login location={props.location} />
                    {
                      props.location
                      ?
                      <button>Click to Register</button>
                      :
                      null
                    }
                    </div>
                    :
                    <div>
                    <Logout/>
                    <div className='welcome-username'>Welcome, {props.user.data.email}</div>
                    </div>
                }
        
      </div>
    );
  }

  const mapStateToProps = state => state

  const mapDispatchToProps = {requestUserData}
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header)