import * as Types from '../constants/ActionKeys';

const initialState = {
  data: []
}

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_TO_WISHLIST_ITEMS: {
      return {
        data: action.items
      }
    }
    case Types.ADD_TO_WISHLIST: {
      return {
        data: state.data.concat(action.item)
      }
    }
    case Types.REMOVE_FROM_WISHLIST: {
      state.data.splice(action.index, 1);
      return {
        data: state.data
      }
    }
    case Types.USER_LOGGED_OUT: {
      return {
        data: []
      }
    }
    default: {
      return state
    }
  }
}

export default wishlistReducer
