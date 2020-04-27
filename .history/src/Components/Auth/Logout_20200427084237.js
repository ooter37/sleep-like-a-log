import React from 'react'
import "./Auth.scss";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {logout} from '../../redux/reducers/user'


class Logout extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
        this.logoutHandler = this.logoutHandler.bind(this)
    }
    componentDidMount(){
        if (this.props.user.data) {
            this.setState({
                redirect: false
            })
        }
    }
    logoutHandler(){
        this.setState({
            redirect: true
        })
        this.props.logout()
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
        return(
            <div>
                
                    <div>
                    <button 
                        className='logout-button'
                        onClick={this.logoutHandler}
                    >Logout</button>
                    <div className='welcome-username'>Welcome, {this.props.user.data.email}</div>
                    </div>
                
        </div>
    )
}
}

const mapStateToProps = state => state

const mapDispatchToProps = {logout}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)