import React from "react";
import "./Header.scss";
import {connect} from 'react-redux'
import {logout} from '../../redux/reducers/user'


class Header extends React.Component {
  render(){

  

  logoutHandler() {
    this.props.logout()
  }
    return (
      <div className="header">
        this is a header
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