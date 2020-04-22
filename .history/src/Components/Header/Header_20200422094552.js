import React from "react";
import "./Header.scss";
import Logout from '../Auth/Logout'

export default function Header() {
    return (
      <div className="header">
        <Logout/>
      </div>
    );
  }

