import React from 'react'
import Chronos from '../Chronos/Chronos'
import DatePicker from 'react-date-picker'


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