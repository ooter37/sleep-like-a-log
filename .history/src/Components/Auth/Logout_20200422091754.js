import 'react' from React
import {connect} from 'react-redux'
import {logout} from '../../redux/reducers/user'
import axios from 'axios'

function Logout(){
    logoutHandler(){

    }
    return(
        <div>
            <button 
                className='logout-button'
                onClick={this.logoutHandler}
            ></button>
        </div>
    )
}

