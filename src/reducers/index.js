import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import productsReducer from './productsReducer';
import collectionsReducer from './collectionsReducer';
import cartReducer from './cartReducer';
import wishlistReducer from './wishlistReducer';
import accountReducer from './accountReducer';
import checkoutReducer from './checkoutReducer';

const rootReducer = combineReducers({
    loginReducer,
    productsReducer,
    collectionsReducer,
    cartReducer,
    wishlistReducer,
    accountReducer,
    checkoutReducer
});

export default rootReducer
