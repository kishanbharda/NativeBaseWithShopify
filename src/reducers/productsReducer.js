import * as Types from '../constants/ActionKeys';

const initialState = {
    error: null,
    data: []
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.PRODUCT_FETCHED: {
            return {
                error: null,
                data: action.products
            }
        } 
        case Types.PRODCUT_ERROR: {
            return {
                data: [],
                error: action.error
            }
        }
        case Types.ADD_MOTE_PRODUCTS: {
            return {
                error: null,
                data: state.data.concat(action.products)
            }
        }
        case Types.FILTER_APPLIED: {
            return {
                error: null,
                data: action.products
            }
        } 
        default: {
            return state
        }
    }
}

export default productsReducer
