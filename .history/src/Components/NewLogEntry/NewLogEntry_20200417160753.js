import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default class NewLogEntry extends React.Component {
    constructor(){
        super()
        this.state = {
            date: ''
        }
    }
    render() {

        return (
            <div>log entry
            <Chronos/>

        </div>
    )
}
}