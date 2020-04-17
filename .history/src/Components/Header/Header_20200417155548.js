import React, { useState, useEffect } from "react";
import "./Header.scss";


export default function Header() {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <div className="header">
        this is a header
      </div>
    );
  }

