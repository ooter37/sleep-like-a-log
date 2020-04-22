import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {logout} from '../../redux/reducers/user'


class Logout extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }
    logoutHandler(){
        this.props.logout().then(() => {
            this.setState({
                redirect: true
            })
        })
    }
    render() {

        return(
            <div>
            <button 
                className='logout-button'
                onClick={this.logoutHandler}
                ></button>
        </div>
    )
}
}

const mapStateToProps = state => state

const mapDispatchToProps = {logout}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)