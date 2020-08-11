import { 
    LOGIN_TYPE,
    FORGOT_PASSWORD,
    CLEAR_DATA
} from '../../types'

export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN_TYPE :
            return {...state, loginData : action.data}
        case FORGOT_PASSWORD:
            return {...state, forgotData : action.data}
        case CLEAR_DATA :
            state = undefined
            return {state}
        default:
            return state
    }
}

