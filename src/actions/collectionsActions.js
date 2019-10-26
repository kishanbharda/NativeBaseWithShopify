import Shopify from '../../config/ShopifyJS';
import * as Types from '../constants/ActionKeys';

export const fetchCollections = () => {
  return async (dispatch) => {
    try {
      const collections = await Shopify.collection.fetchAll();
      dispatch({
        type: Types.COLLECTION_FETCHED,
        collections
      });
      return collections;
    } catch (error) {
      dispatch({
        type: Types.COLLECTION_ERROR,
        error: error.message
      });
      return [];
    }
  }
}

export const fetchNewArrivals = () => {
  return async (dispatch) => {
    const { id } = await Shopify.collection.fetchByHandle("new-arrivals");
    const { products } = await Shopify.collection.fetchWithProducts(id);
    dispatch({
      type: Types.NEW_ARRIVALS_FETCHED,
      products
    });
  }
}
