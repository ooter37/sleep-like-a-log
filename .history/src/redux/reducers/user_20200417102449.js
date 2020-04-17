import axios from 'axios'

const initialState = {
    data: null,
    loading: false
}

const REGISTER_USER = 'REGISTER_USER'
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export default function(state = initialState,action) {
    let {type, payload} = action
    switch(type) {
        case REGISTER_USER + '_PENDING':
            return {
                ...state,
                loading: true
            }
        case REGISTER_USER + '_FULFILLED':
            return {
                ...state,
                data: payload.data,
                loading: false
            }
        case REGISTER_USER + '_REJECTED':
            return {
                ...state,
                loading: false
            }
        case LOGIN_USER + '_PENDING':
            return {
                ...state,
                loading: true
            }
        case LOGIN_USER + '_FULFILLED':
            return {
                ...state,
                data: payload.data,
                loading: false
            }
        case LOGIN_USER + '_REJECTED':
            return {
                ...state,
                loading: false
            }
        case LOGOUT_USER + '_PENDING':
            return {
                ...state,
                loading: true
            }
        case LOGOUT_USER + '_FULFILLED':
            return {
                ...state,
                data: null,
                loading: false
            }
        case LOGOUT_USER + '_REJECTED':
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}