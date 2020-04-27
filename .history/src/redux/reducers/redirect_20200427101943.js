const initialState = {
    redirect: false
}


const REDIRECT = 'REDIRECT'


export default function(state = initialState,action) {
    switch(action.type) {
        case REDIRECT:
            return {
                ...state,
                redirect: !redirect
            }
        default:
            return state
    }
}
export function reduxRedirect(){
    return {
        type: REDIRECT
    }
}
