import React from "react";
import "./Header.scss";
import Logout from '../Auth/Logout'
import requestUserData from '../../redux/reducers/user'
import {connect} from 'react-redux'
import Login from '../Auth/Login'
import {Link} from 'react-router-dom'

class Header extends React.Component {
  constructor(props){
    super(props)
  }
  
  render(){
    return (
      <div className="header">
        {
                    !this.props.user.data
                    ?
                    <div>
                    <Login location={this.props.location} />
                    {
                      this.props.location
                      ?
                      <Link to='/'>
                      <button className='click-register-button'>Click to Register</button>
                      </Link>
                      :
                      null
                    }
                    </div>
                    :
                    <div>
                    <Logout toggleRedirect={this.props.toggleRedirect} />
                    <div className='welcome-username'>Welcome, {this.props.user.data.email}</div>
                    </div>
                }
        
      </div>
    );
  }
  }

  const mapStateToProps = state => state

  const mapDispatchToProps = {requestUserData}
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header)