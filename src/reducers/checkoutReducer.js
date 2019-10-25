import * as Types from '../constants/ActionKeys';

const initialState = {
    shippingAddress: null,
    lineItems: [],
    checkoutId: '',
    checkout: null,
    shippingRates: [],
    vaultId: ''
}

const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.EMPTY_CHECKOUT_CREATED: {
            return {
                ...state,
                checkoutId: action.checkoutId
            }
        }
        case Types.CHECKOUT_UPDATED: {
            if (action.checkout !== null) {
                return {
                    ...state,
                    checkout: action.checkout,
                    lineItems: action.checkout.lineItems,
                    shippingAddress: action.checkout.shippingAddress
                }
            }
            return state
        }
        case Types.FETCHED_SHIPPING_RATES: {
            return {
                ...state,
                shippingRates: action.shippingRates
            }
        }
        case Types.VAULT_ID_GENERATED: {
            return {
                ...state,
                vaultId: action.id
            }
        }
        case Types.USER_LOGGED_OUT: {
            return {
                shippingAddress: null,
                lineItems: [],
                checkoutId: '',
                checkout: null,
                shippingRates: [],
                vaultId: ''
            }
        }
        case Types.CHECKOUT_COMPLETED: {
            return {
                shippingAddress: null,
                lineItems: [],
                checkoutId: '',
                checkout: null,
                shippingRates: [],
                vaultId: ''
            }
        }
        default: {
            return state
        }
    }
}

export default checkoutReducer
