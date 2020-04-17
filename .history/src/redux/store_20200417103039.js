import {createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

import reducer from './reducers'

export defauult createStore(reducer, applyMiddleware(promiseMiddleware))