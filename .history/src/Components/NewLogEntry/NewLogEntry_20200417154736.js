import React from 'react'
import Chronos from '../Chronos/Chronos'
import DatePicker from 'react-date-picker'
import "react-datepicker/dist/react-datepicker.css";
CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

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
            

        </div>
    )
}
}