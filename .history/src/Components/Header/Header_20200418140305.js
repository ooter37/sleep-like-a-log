import React from "react";
import "./Header.scss";
import {connect} from 'react-redux'
import {logout} from '../../redux/reducers/user'


class Header extends React.Component {

  logoutHandler() {
    this.props.logout()
  }
  render(){
    return (
      <div className="header">
        <button onClick={() => this.logoutHandler()}>Logout</button>
      </div>
    );
  }
  }
  
const mapStateToProps = state => {
  let {data: user} = state.user
  return {user}
}  

const mapDispatchToProps = {logout}

export default connect(mapStateToProps, mapDispatchToProps)(Header)