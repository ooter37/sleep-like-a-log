import React from "react";
import "./Header.scss";
import Logout from '../Auth/Logout'
import requestUserData from '../../redux/reducers/user'
import {connect} from 'react-redux'
import Login from '../Auth/Login'

function Header(props) {
  console.log(props)
    return (
      <div className="header">
        {
                    this.props.user
                    ?
                    <Login />
                    :
                    <div>
                    <button 
                        className='logout-button'
                        onClick={this.logoutHandler}
                    >Logout</button>
                    <div className='welcome-username'>Welcome, {this.props.user.data.email}</div>
                    </div>
                }
        
      </div>
    );
  }

  const mapStateToProps = state => state

  const mapDispatchToProps = {requestUserData}
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header)