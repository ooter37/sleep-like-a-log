import {combineReducers} from 'redux'

import user from './user'
import redirect from './redirect'
//import products

export default combineReducers({user, redirect})


//Combines reducers
//export default combineReducers({user, products})