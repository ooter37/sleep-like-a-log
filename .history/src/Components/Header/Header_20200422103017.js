import React from "react";
import "./Header.scss";
import Logout from '../Auth/Logout'
import requestUserData from '../../redux/reducers/user'


function Header() {
    return (
      <div className="header">
        <Logout/>
      </div>
    );
  }

  const mapStateToProps = state => state

  const mapDispatchToProps = {requestUserData}
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header)