import React from 'react'
import "./Auth.scss";
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'
import {logout} from '../../redux/reducers/user'
import {authSuccess} from '../Alerts'


class Logout extends React.Component{
    constructor(props) {
        super(props)
        this.logoutHandler = this.logoutHandler.bind(this)
    }
    logoutHandler(){
        this.props.logout().then(() => {authSuccess.fire({title: 'Logged out successfully.'})})
        .catch(err => console.log('Error logging out', err))
    }
    render() {
        // if (this.state.redirect) {
        //     return <Redirect to='/'/>
        // }
        return(
            <div>
                
                    <div>
                    <button 
                        className='logout-button'
                        onClick={this.logoutHandler}
                    >Logout</button>
                    {/* <div className='welcome-username'>Welcome, {this.props.user.data.email}</div> */}
                    </div>
                
        </div>
    )
}
}

const mapStateToProps = state => state

const mapDispatchToProps = {logout}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)