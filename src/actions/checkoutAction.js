import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Api from '../../config/ShopifyApi';
import * as Types from '../constants/ActionKeys';
import Shopify from '../../config/ShopifyJS';
import * as StorageKeys from '../constants/StorageKeys';

export const fetchCheckout = (checkoutId) => {
    return async (dispatch) => {
        const checkout = await Shopify.checkout.fetch(checkoutId);
        dispatch({
            type: Types.CHECKOUT_UPDATED,
            checkout
        });
    }
}

export const createCheckout = () => {
    return async (dispatch) => {
        const { id } = await Shopify.checkout.create();
        dispatch({
            type: Types.EMPTY_CHECKOUT_CREATED,
            checkoutId: id
        });
        return id;
    }
}

export const addLineItems = (checkoutId, lineItems) => {
    return async (dispatch) => {
        const checkout = await Shopify.checkout.addLineItems(checkoutId, lineItems);
        dispatch({
            type: Types.CHECKOUT_UPDATED,
            checkout
        });
        return checkout; 
    }
}

export const addShippingAddress = (address, checkoutId) => {
    return async (dispatch) => {
        const checkout = await Shopify.checkout.updateShippingAddress(checkoutId, address);
        dispatch({
            type: Types.CHECKOUT_UPDATED,
            checkout
        });
        return checkout; 
    }
}

export const addDiscount = (checkoutId, discountCode) => {
    return async (dispatch) => {
        const checkout = await Shopify.checkout.addDiscount(checkoutId, discountCode);
        dispatch({
            type: Types.CHECKOUT_UPDATED,
            checkout
        });
    }
}

export const applyShipping = (checkoutId, method) => {
    return async () => {
        const id = Shopify.graphQLClient.variable('id', 'ID!');

        const mutation = Shopify.graphQLClient.mutation('myMutation', [id], (root) => {
            root.add('checkoutShippingLineUpdate', {args: {checkoutId: id, shippingRateHandle: method }}, (res) => {
                res.add('checkout', (checkout) => {
                    checkout.add('shippingLine', (sl) => {
                        sl.add('priceV2', (price) => {
                            price.add('amount');
                        });
                        sl.add('title');
                    });
                });
            });
        });

        await Shopify.graphQLClient.send(mutation, { id: checkoutId });   
    }
}

export const fetchShippingRates = (checkoutId) => {
    return async (dispatch) => {
        const id = Shopify.graphQLClient.variable('id', 'ID!');
        const query = Shopify.graphQLClient.query([id], (root) => {
            root.add('node', { args: { id } }, (node) => {
                node.addInlineFragmentOn('Checkout', (checkout) => {
                    checkout.add('availableShippingRates', (rate) => {
                        rate.add('shippingRates', (sr) => {
                            sr.add('handle');
                            sr.add('priceV2', (price) => {
                                price.add('amount');
                            });
                            sr.add('title');
                        });
                    });
                });
            });
        });
        
        const { model } = await Shopify.graphQLClient.send(query, {id: checkoutId});
        dispatch({
            type: Types.FETCHED_SHIPPING_RATES,
            shippingRates: model.node?.availableShippingRates?.shippingRates
        });
        return model.node.availableShippingRates.shippingRates;
    }
}

export const updateEmail = (checkoutId, email) => {
    return async (dispatch) => {
        const checkout = await Shopify.checkout.updateEmail(checkoutId, email);
        dispatch({
            type: Types.CHECKOUT_UPDATED,
            checkout
        });
    }
}

export const generateVault = (param) => {
    return async (dispatch) => {
        const { data } = await axios.post('https://elb.deposit.shopifycs.com/sessions', param);
        dispatch({
            type: Types.VAULT_ID_GENERATED,
            id: data.id
        });
        return data.id
    }
}

export const completeCheckout = (checkoutId, amount, idempotencyKey, billingAddress, vaultId) => {
    return async () => {
        // const id = Shopify.graphQLClient.variable('id', 'ID!');
        // const payment = Shopify.graphQLClient.variable('payment', 'CreditCardPaymentInputV2!');

        // const mutation = Shopify.graphQLClient.mutation('myMutation', [id, payment], (root) => {
        //     root.add('checkoutCompleteWithCreditCardV2', {args: {checkoutId: id, payment }}, (res) => {
        //         res.add('checkout', (checkout) => {
        //             checkout.add('shippingLine', (sl) => {
        //                 sl.add('priceV2', (price) => {
        //                     price.add('amount');
        //                 });
        //                 sl.add('title');
        //             });
        //         });
        //     });
        // });

        // const res = await Shopify.graphQLClient.send(mutation, { id: checkoutId, payment: param });   
        // console.log(res);

        const isTest = true;

        const query = `
            mutation {
                checkoutCompleteWithCreditCardV2(checkoutId: "${checkoutId}", payment:{
                    paymentAmount:{
                        amount: "${amount}"
                        currencyCode: USD
                    }
                    idempotencyKey: "${idempotencyKey}"
                    billingAddress:{
                        address1: "${billingAddress.address1}"
                        address2: "${billingAddress.address2}"
                        city: "${billingAddress.city}"
                        company: "${billingAddress.company}"
                        country: "${billingAddress.country}"
                        firstName: "${billingAddress.firstName}"
                        lastName: "${billingAddress.lastName}"
                        phone: "${billingAddress.phone}"
                        province: "${billingAddress.province}"
                        zip: "${billingAddress.zip}"
                    }
                    vaultId: "${vaultId}"
                    test: ${isTest}
                }) {
                    checkout{
                        id
                        totalPriceV2{
                          amount
                        }
                    }
                    checkoutUserErrors{
                      message
                      code
                    }
                    payment{
                      amountV2{
                        amount
                      }
                    }
                }
            }
        `;
        
        const res = await axios.post(Api.url, query, {headers: Api.header});
    }
}

export const getWebUrl = (checkoutId) => {
    return async () => {
        const query = `{
            node(id:"${checkoutId}" ) {
              ... on Checkout {
                id
                webUrl
              }
            }
        }`;

        const { data } = await axios.post(Api.url, query, {headers: Api.header});
        return data.data.node.webUrl;
    }
}

export const checkoutCompleted = () => {
    return async (dispatch) => {
        await AsyncStorage.setItem(StorageKeys.CART_ITEMS, JSON.stringify([]));
        dispatch({
            type: Types.CHECKOUT_COMPLETED,
        });
    }
}

export const associateCustomer = (id, accessToken) => {
    return async () => {
        const checkoutId = Shopify.graphQLClient.variable('checkoutId', 'ID!');

        const mutation = Shopify.graphQLClient.mutation('myMutation', [checkoutId], (root) => {
            root.add('checkoutCustomerAssociateV2', {args: {checkoutId, customerAccessToken: accessToken }}, (adr) => {
                adr.add('checkout', (checkout) => {
                    checkout.add('webUrl');
                });
            });
        });

        const { model } = await Shopify.graphQLClient.send(mutation, { checkoutId: id });
        console.log("Asssososososososo...........");
        return model?.checkoutCustomerAssociateV2?.checkout?.webUrl
    } 
}
