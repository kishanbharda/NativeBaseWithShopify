import AsyncStorage from '@react-native-community/async-storage';
import * as Types from '../constants/ActionKeys';
import * as StorageKeys from '../constants/StorageKeys';

export const setCartFromStorage = () => {
  return async (dispatch) => {
    const storedCartItems = await AsyncStorage.getItem(StorageKeys.CART_ITEMS);
    if (storedCartItems) {
      const cartItems = JSON.parse(storedCartItems);
      let totalItems = 0;
      cartItems.forEach(element => {
        totalItems += parseInt(element.quantity, 10)
      });
      dispatch({
        type: Types.SET_TO_CART_ITEMS,
        cartItems,
        totalItems
      });
      // dispatch({
      //   type: Types.ADD_TO_TOTAL_ITEMS,
      //   items: totalItems
      // });
    }
  }
}

export const addToCart = (cartItem) => {
  return async (dispatch) => {
    let storedCartItems = await AsyncStorage.getItem(StorageKeys.CART_ITEMS);
    if (storedCartItems) {
      storedCartItems = JSON.parse(storedCartItems);
      storedCartItems.push(cartItem);
      await AsyncStorage.setItem(StorageKeys.CART_ITEMS, JSON.stringify(storedCartItems));
    } else {
      await AsyncStorage.setItem(StorageKeys.CART_ITEMS, JSON.stringify([cartItem]));
    }
    dispatch({
      type: Types.ADD_TO_CART,
      cartItem
    });
    console.log(parseInt(cartItem.quantity, 10));
    dispatch({
      type: Types.ADD_TO_TOTAL_ITEMS,
      items: parseInt(cartItem.quantity, 10)
    });
  }
}

export const increaseQuantity = (index) => {
  return async (dispatch) => {
    let items = await AsyncStorage.getItem(StorageKeys.CART_ITEMS);
    items = JSON.parse(items);
    items[index].quantity += 1;
    AsyncStorage.setItem(StorageKeys.CART_ITEMS, JSON.stringify(items));
    dispatch({
      type: Types.INCREASE_QUANTITY,
      index
    });
  }
}

export const decreaseQuantity = (index) => {
  return async (dispatch) => {
    let items = await AsyncStorage.getItem(StorageKeys.CART_ITEMS);
    items = JSON.parse(items);
    if (items[index].quantity > 1) {
      items[index].quantity -= 1;
      AsyncStorage.setItem(StorageKeys.CART_ITEMS, JSON.stringify(items));
      dispatch({
        type: Types.DECREASE_QUANTITY,
        index
      });
    }
  }
}

export const updateQuantity = (element) => {
  return async (dispatch) => {
    let storedCartItems = await AsyncStorage.getItem(StorageKeys.CART_ITEMS);
    storedCartItems = JSON.parse(storedCartItems);
    const item = storedCartItems.find((ele) => ele.variantId === element.variantId);
    const index = storedCartItems.indexOf(item);
    const oldQty = parseInt(storedCartItems[index].quantity, 10);
    const newQty = parseInt(element.quantity, 10);
    dispatch({
      type: Types.REMOVE_FROM_TOTAL_ITEMS,
      items: oldQty
    });
    dispatch({
      type: Types.ADD_TO_TOTAL_ITEMS,
      items: newQty
    });
    storedCartItems[index].quantity = parseInt(element.quantity, 10);
    await AsyncStorage.setItem(StorageKeys.CART_ITEMS, JSON.stringify(storedCartItems));
  }
}

export const removeFromCart = (index) => {
  return async (dispatch) => {
    let storedCartItems = await AsyncStorage.getItem(StorageKeys.CART_ITEMS);
    storedCartItems = JSON.parse(storedCartItems);
    const items = parseInt(storedCartItems[index].quantity, 10);
    storedCartItems.splice(index, 1);
    await AsyncStorage.setItem(StorageKeys.CART_ITEMS, JSON.stringify(storedCartItems));
    dispatch({
      type: Types.REMOVE_FROM_CART,
      index,
    });
    dispatch({
      type: Types.REMOVE_FROM_TOTAL_ITEMS,
      items
    });
  }
}

