import * as Types from '../constants/ActionKeys';

const initialState = {
  data: [],
  totalItems: 0
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_TO_CART_ITEMS: {
      return {
        ...state, 
        data: action.cartItems,
        totalItems: action.totalItems
      }
    }
    case Types.ADD_TO_CART: {
      return {
        ...state,
        data: state.data.concat(action.cartItem)
      }
    }
    case Types.REMOVE_FROM_CART: {
      state.data.splice(action.index, 1);
      return {
        ...state,
        data: state.data
      }
    }
    case Types.INCREASE_QUANTITY: {
      // eslint-disable-next-line no-param-reassign
      state.data[action.index].quantity += 1;
      return {
        totalItems: state.totalItems + 1,
        data: state.data
      }
    }
    case Types.DECREASE_QUANTITY: {
      if (state.data[action.index].quantity > 1) {
        // eslint-disable-next-line no-param-reassign
        state.data[action.index].quantity -= 1;
        return {
          totalItems: state.totalItems - 1,
          data: state.data
        }
      }
      return {
        totalItems: state.totalItems,
        data: state.data
      }
    }
    case Types.ADD_TO_TOTAL_ITEMS: {
      return {
        ...state,
        totalItems: state.totalItems + action.items
      }
    }
    case Types.REMOVE_FROM_TOTAL_ITEMS: {
      return {
        ...state,
        totalItems: state.totalItems - action.items
      }
    }
    case Types.USER_LOGGED_OUT: {
      return {
        totalItems: 0,
        data: []
      }
    }
    case Types.CHECKOUT_COMPLETED: {
      return {
        totalItems: 0,
        data: []
      }
    }
    default: {
      return state
    }
  }
}

export default cartReducer
