import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {logout} from '../../redux/reducers/user'
import Login from '../Auth/Login'
import "./Auth.scss";

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
        this.props.logout().then(() => {
            this.setState({
                redirect: true
            })
        }).catch(err => console.log('Error logging out', err))
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
        return(
            <div>
                {
                    !this.props.user.data
                    ?
                    <Login />
                    :
                    <div>
                    <button 
                        className='logout-button'
                        onClick={this.logoutHandler}
                    >Logout</button>
                    <div className='welcome-username'>Welcome, {this.props.user.data.email}</div>
                    </div>
                }
        </div>
    )
}
}

const mapStateToProps = state => state

const mapDispatchToProps = {logout}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)