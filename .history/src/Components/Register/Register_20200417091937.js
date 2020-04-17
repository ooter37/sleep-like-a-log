import React from 'react'


export default class Register extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    render() {
        return(
            <div>this is the register component</div>
        )
    }
}