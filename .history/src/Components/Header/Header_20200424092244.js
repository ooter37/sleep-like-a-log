import React from "react";
import "./Header.scss";
import Logout from '../Auth/Logout'
import requestUserData from '../../redux/reducers/user'
import {connect} from 'react-redux'
import Login from '../Auth/Login'

function Header(props) {
  console.log(props.location)
    return (
      <div className="header">
        {
                    !props.user.data
                    ?
                    <div>
                    <Login />
                    <button>Click to Register</button>
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