import React from 'react'
import Chronos from '../Chronos/Chronos'

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