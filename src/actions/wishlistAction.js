import AsyncStorage from '@react-native-community/async-storage';
import * as Types from '../constants/ActionKeys';
import * as StorageKeys from '../constants/StorageKeys';

type WishlistItem = {
  productId: String,
  productTitle: String,
  variantId: String,
  variant: Object,
  image: String,
  price: String,
  quantity: Number,
  isAvailable: Boolean
}

export const setWishlistFromStorage = () => {
  return async (dispatch) => {
    const storedItems = await AsyncStorage.getItem(StorageKeys.WISHLIST_ITEMS);
    if (storedItems) {
      dispatch({
        type: Types.SET_TO_WISHLIST_ITEMS,
        items: JSON.parse(storedItems)
      });
    }
  }
}

/**
 * Add item to wishlist
 * @param {WishlistItem} wishlistItem Wishlist item to add
 */
export const addToWishlist = (wishlistItem: WishlistItem) => {
  return async (dispatch) => {
    let storedItems = await AsyncStorage.getItem(StorageKeys.WISHLIST_ITEMS);
    if (storedItems) {
      storedItems = JSON.parse(storedItems);
      storedItems.push(wishlistItem);
      await AsyncStorage.setItem(StorageKeys.WISHLIST_ITEMS, JSON.stringify(storedItems));
    } else {
      await AsyncStorage.setItem(StorageKeys.WISHLIST_ITEMS, JSON.stringify([wishlistItem]));
    }
    dispatch({
      type: Types.ADD_TO_WISHLIST,
      item: wishlistItem
    });
  }
}

/**
 * Remove Wishlist item from wishlist
 * @param {String} productId Product id to remove from wishlist
 */
export const removeFromWishlist = (productId) => {
  return async (dispatch) => {
    let storedItems = await AsyncStorage.getItem(StorageKeys.WISHLIST_ITEMS);
    storedItems = JSON.parse(storedItems);
    const index = storedItems.indexOf(storedItems.filter((item) => item.productId === productId)[0]);
    storedItems.splice(index, 1);
    await AsyncStorage.setItem(StorageKeys.WISHLIST_ITEMS, JSON.stringify(storedItems));
    dispatch({
      type: Types.REMOVE_FROM_WISHLIST,
      index
    });
  }
}
