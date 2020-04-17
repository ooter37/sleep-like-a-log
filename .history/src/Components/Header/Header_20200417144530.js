import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import "./Header.scss";

export const DateTime = () => {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setDateTime(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, []);

    return (
        <h4 className='header'>{`${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`}</h4>
    );

}

export default DateTime