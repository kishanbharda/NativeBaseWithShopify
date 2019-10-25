import * as Types from '../constants/ActionKeys';

const initialState = {
    data: [],
    addresses: [],
    info: null
}

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_USER_DATA: {
            return {
                ...state,
                info: action.data
            }
        }
        case Types.INFO_FETCHED: {
            return {
                ...state,
                info: action.info
            }
        }
        case Types.INFO_UPDATED: {
            return {
                ...state,
                info: action.info
            }
        }
        case Types.ORDERS_FETCHED: {
            return {
                ...state,
                data: action.orders
            }
        }
        case Types.ADDRESSES_FETCHED: {
            return {
                ...state,
                data: state.data,
                addresses: action.addresses
            }
        }
        case Types.ADDRESS_ADDED: {
            return {
                ...state,
                addresses: [...state.addresses, action.address]
            }
        }
        case Types.USER_LOGGED_OUT: {
            return {
                data: [],
                addresses: [],
                info: null
            }
        }
        default: {
            return state
        }
    }
}

export default accountReducer
