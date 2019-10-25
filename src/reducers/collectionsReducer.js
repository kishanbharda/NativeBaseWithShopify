import * as Types from '../constants/ActionKeys';

const initialState = {
    error: null,
    data: [],
    newArrivals: []
}

const collectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.COLLECTION_FETCHED: {
            return {
                error: null,
                data: action.collections
            }
        }
        case Types.COLLECTION_ERROR: {
            return {
                data: [],
                error: action.error
            }
        }
        case Types.NEW_ARRIVALS_FETCHED: {
            return {
                ...state,
                newArrivals: action.products
            }
        }
        default: {
            return state
        }
    }
}

export default collectionsReducer
