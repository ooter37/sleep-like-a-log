import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {logout} from '../../redux/reducers/user'


class Logout extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            hidden: true
        }
        this.logoutHandler = this.logoutHandler.bind(this)
    }
    componentDidUpdate(){
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
                    this.state.hidden
                    ?
                    <button>Login</button>
                    :
                    <button 
                        className='logout-button'
                        onClick={this.logoutHandler}
                        >Logout</button>
                }
        </div>
    )
}
}

const mapStateToProps = state => state

const mapDispatchToProps = {logout}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)