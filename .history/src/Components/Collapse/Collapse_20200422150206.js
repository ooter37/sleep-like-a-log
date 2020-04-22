import React from 'react'

export default class Collapse extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.togglePanel = this.togglePanel.bind(this)
    }
    togglePanel(e) {
        this.setState({
            open: !this.state.open
        })
    }
    render() {
        return (
            <div>
                <div>{this.props.title}</div>
            </div>
        )
    }
}