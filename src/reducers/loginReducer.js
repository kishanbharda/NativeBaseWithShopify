import * as Types from '../constants/ActionKeys';

const initialState = {
    customer: null
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.USER_AUTHENTICATED: {
            return state
        }
        case Types.SET_USER_DATA: {
            return {
                customer: action.data
            }
        }
        case Types.USER_LOGGED_OUT: {
            return {
                customer: null
            }
        }
        default: {
            return state
        }
    }    
}

export default loginReducer
