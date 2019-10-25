import AsyncStorage from '@react-native-community/async-storage';
import Shopify from '../../config/ShopifyJS';
import * as Types from '../constants/ActionKeys';
import { FilterBy } from '../constants/Common';
import * as StorageKeys from '../constants/StorageKeys';

const PRODUCT_COUNT_TO_FETCH = 20;

const ProductSortKeys = {
    TITLE: 'TITLE',
    BEST_SELLING: 'BEST_SELLING',
    PRICE: 'PRICE',
    RELEVANCE: 'RELEVANCE'
}

export const fetchProducts = () => {
    return async (dispatch) => {
        dispatch({
            type: Types.PRODUCT_FETCHED,
            products: []
        });
        const productsQuery = Shopify.graphQLClient.query((root) => {
            root.addConnection('products', {args: {first: PRODUCT_COUNT_TO_FETCH}}, (product) => {
                product.add('title');
                product.add('id');
                product.addConnection('images', {args: {first: 250}}, (images) => {
                    images.add('src');
                    images.add('transformedSrc', { args: { scale: 3 }});
                });
                product.addConnection('variants', {args: {first: 250}}, (variant) => {
                    variant.add('priceV2', (price) => {
                        price.add('amount');
                    });
                    variant.add('compareAtPriceV2', (cp) => {
                        cp.add('amount');
                    });
                    variant.add('price');
                });
                product.add('options', {args: {first: 250}}, (option) => {
                    option.add("name");
                    option.add("values");
                });
                product.add('availableForSale');
                product.add('handle');
            });
        });
        
        const { model } = await Shopify.graphQLClient.send(productsQuery);
        console.log(model);
        dispatch({
            type: Types.PRODUCT_FETCHED,
            products: (model.products) ? model.products : []
        });
    }
}

export const fetchProductsByCollection = (collectionId) => {
    return async (dispatch) => {
        dispatch({
            type: Types.PRODUCT_FETCHED,
            products: []
        });
        const { products } = await Shopify.collection.fetchWithProducts(collectionId);
        dispatch({
            type: Types.PRODUCT_FETCHED,
            products
        }); 
        return products;
    }
}

export const fetchHomePageCollectionProducts = (collectionId) => {
    return async () => {
        const { products } = await Shopify.collection.fetchWithProducts(collectionId);
        return products;
    }
}

export const fetchSingleProduct = (productId) => {
    return async () => {
        const product = await Shopify.product.fetch(productId);
        return product;
    }
}

export const fetchSingleProductByHandle = (handle) => {
    return async () => {
        const product = await Shopify.product.fetchByHandle(handle).catch(() => {
            return null;    
        });
        return product;
    }
}

export const loadMoreProducts = (products) => {
    return async (dispatch) => {
        try {
            const { model } = await Shopify.fetchNextPage(products);
            dispatch({
                type: Types.ADD_MOTE_PRODUCTS,
                products: model
            });
            return model
        } catch (error) {
            Promise.reject(error);
            return []
        } 
    }
}

/**
 * Filter the products by provided key
 * @param {FilterBy} valueToFilter value like A_TO_Z, Z_TO_A etc. of FilterBy constant in constant/common.js file
 */
export const applyFilterOnCollectionProducts = (valueToFilter, collectionId) => {

    return async (dispatch) => {
        const sortKey = Shopify.graphQLClient.variable('sortKey', 'ProductCollectionSortKeys');
        const id = Shopify.graphQLClient.variable('id', 'ID!');
        let sortBy = "";
        let queryArgs = {};
        switch (valueToFilter) {
            case FilterBy.A_TO_Z: {
                queryArgs = {first: PRODUCT_COUNT_TO_FETCH, reverse: false, sortKey}
                sortBy = ProductSortKeys.TITLE;
                break;
            }
            case FilterBy.Z_TO_A: {
                queryArgs = {first: PRODUCT_COUNT_TO_FETCH, reverse: true, sortKey}
                sortBy = ProductSortKeys.TITLE;
                break;
            }
            case FilterBy.BEST_SELLING: {
                queryArgs = {first: PRODUCT_COUNT_TO_FETCH, reverse: false, sortKey}
                sortBy = ProductSortKeys.BEST_SELLING;
                break;
            }
            case FilterBy.HIGH_TO_LOW: {
                queryArgs = {first: PRODUCT_COUNT_TO_FETCH, reverse: true, sortKey}
                sortBy = ProductSortKeys.PRICE;
                break;
            }
            case FilterBy.LOW_TO_HIGH: {
                queryArgs = {first: PRODUCT_COUNT_TO_FETCH, reverse: false, sortKey}
                sortBy = ProductSortKeys.PRICE;
                break;
            }
            case FilterBy.RELEVANCE: {
                queryArgs = {first: PRODUCT_COUNT_TO_FETCH, reverse: false, sortKey}
                sortBy = ProductSortKeys.RELEVANCE;
                break;
            }
            default: {
                queryArgs = {first: PRODUCT_COUNT_TO_FETCH, reverse: false, sortKey}
                sortBy = ProductSortKeys.BEST_SELLING;
            }
        }

        const productsQuery = Shopify.graphQLClient.query([sortKey, id], (root) => {
            root.add('node', { args: { id } }, (node) => {
                node.addInlineFragmentOn('Collection', (collection) => {
                    collection.addConnection('products', {args: queryArgs}, (product) => {
                        product.add('title');
                        product.add('id');
                        product.addConnection('images', {args: {first: 10}}, (images) => {
                            images.add('src');
                            images.add('transformedSrc', { args: { scale: 3 }});
                        });
                        product.addConnection('variants', {args: {first: 250}}, (variant) => {
                            variant.add('priceV2', (price) => {
                                price.add('amount');
                            });
                            variant.add('price');
                        });
                        product.add('options', {args: {first: 250}}, (option) => {
                            option.add("name");
                            option.add("values");
                        });
                        product.add('availableForSale');
                    });
                });
            });
        });
        
        const { model } = await Shopify.graphQLClient.send(productsQuery, {sortKey: sortBy, id: collectionId});
        dispatch({
            type: Types.FILTER_APPLIED,
            products: model.node.products
        });
    }
}

export const applyFilterOnAllProducts = (valueToFilter) => {

    return async (dispatch) => {
        const sortKey = Shopify.graphQLClient.variable('sortKey', 'ProductSortKeys');
        
        let sortBy = "";
        let queryArgs = {};
        switch (valueToFilter) {
            case FilterBy.A_TO_Z: {
                queryArgs = {first: PRODUCT_COUNT_TO_FETCH, reverse: false, sortKey}
                sortBy = ProductSortKeys.TITLE;
                break;
            }
            case FilterBy.Z_TO_A: {
                queryArgs = {first: PRODUCT_COUNT_TO_FETCH, reverse: true, sortKey}
                sortBy = ProductSortKeys.TITLE;
                break;
            }
            case FilterBy.BEST_SELLING: {
                queryArgs = {first: PRODUCT_COUNT_TO_FETCH, reverse: false, sortKey}
                sortBy = ProductSortKeys.BEST_SELLING;
                break;
            }
            case FilterBy.HIGH_TO_LOW: {
                queryArgs = {first: PRODUCT_COUNT_TO_FETCH, reverse: true, sortKey}
                sortBy = ProductSortKeys.PRICE;
                break;
            }
            case FilterBy.LOW_TO_HIGH: {
                queryArgs = {first: PRODUCT_COUNT_TO_FETCH, reverse: false, sortKey}
                sortBy = ProductSortKeys.PRICE;
                break;
            }
            case FilterBy.RELEVANCE: {
                queryArgs = {first: PRODUCT_COUNT_TO_FETCH, reverse: false, sortKey}
                sortBy = ProductSortKeys.RELEVANCE;
                break;
            }
            default: {
                queryArgs = {first: PRODUCT_COUNT_TO_FETCH, reverse: false, sortKey}
                sortBy = ProductSortKeys.BEST_SELLING;
            }
        }

        const productsQuery = Shopify.graphQLClient.query([sortKey], (root) => {
            root.addConnection('products', {args: queryArgs}, (product) => {
                product.add('title');
                product.add('id');
                product.addConnection('images', {args: {first: 10}}, (images) => {
                    images.add('src');
                    images.add('transformedSrc', { args: { scale: 3 }});
                });
                product.addConnection('variants', {args: {first: 250}}, (variant) => {
                    variant.add('priceV2', (price) => {
                        price.add('amount');
                    });
                    variant.add('price');
                });
                product.add('options', {args: {first: 250}}, (option) => {
                    option.add("name");
                    option.add("values");
                });
                product.add('availableForSale');
            });
        });
        
        const { model } = await Shopify.graphQLClient.send(productsQuery, {sortKey: sortBy});
        
        dispatch({
            type: Types.FILTER_APPLIED,
            products: model.products
        });
    }
}

export const addToRecentlyViewed = (productId) => {
    return async () => {
        let ids = await AsyncStorage.getItem(StorageKeys.RECENTLY_VIEWED_IDS);
        if (ids) {
            ids = JSON.parse(ids);
            if (ids.indexOf(productId) < 0) {
                ids.unshift(productId);
                if (ids.length === 21) {
                    ids.splice(20, 1);
                }
                AsyncStorage.setItem(StorageKeys.RECENTLY_VIEWED_IDS, JSON.stringify(ids));
            }
        } else {
            AsyncStorage.setItem(StorageKeys.RECENTLY_VIEWED_IDS, JSON.stringify([productId]));
        }
    }
}

export const getRecentlyViewedProducts = () => {
    return async () => {
        let ids = await AsyncStorage.getItem(StorageKeys.RECENTLY_VIEWED_IDS);
        if (ids) {
            ids = JSON.parse(ids);
            const products = await Shopify.product.fetchMultiple(ids).catch(() => {
                return []
            });
            return products
        } 
        return []
    }
}
