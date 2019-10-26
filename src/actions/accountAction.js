import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import Shopify from '../../config/ShopifyJS';
import Messages from '../../config/Messages';
import * as StorageKeys from '../constants/StorageKeys';
import * as Types from '../constants/ActionKeys';

export const getAccountInfo = () => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem(StorageKeys.USER_DATA);
    if (!userData) {
      dispatch({
        type: Types.INFO_FETCHED,
        info: JSON.parse(userData)
      });
      return userData
    }
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      dispatch({
        type: Types.INFO_FETCHED,
        info: JSON.parse(userData)
      });
      return userData
    }
    const accessToken = await AsyncStorage.getItem(StorageKeys.USER_ACCESS_TOKEN);
    const query = Shopify.graphQLClient.query((root) => {
      root.add('customer', { args: { customerAccessToken: accessToken } }, (customer) => {
        customer.add('id');
      });
    });
    const { model } = await Shopify.graphQLClient.send(query);
    if (!model || model.customer === null) {
      await AsyncStorage.clear();
      dispatch({
        type: Types.INFO_FETCHED,
        info: JSON.parse(userData)
      });
      return userData
    }
    dispatch({
      type: Types.INFO_FETCHED,
      info: JSON.parse(userData)
    });
    return userData
  }
}

export const getOrders = () => {
  return async (dispatch) => {
    const userAccessToken = await AsyncStorage.getItem(StorageKeys.USER_ACCESS_TOKEN);
    const authStatus = await AsyncStorage.getItem(StorageKeys.IS_AUTHENTICATED_USER);
    if (authStatus === StorageKeys.USER_NOT_AUTHENTICATED || userAccessToken === null || userAccessToken === undefined) {
      const error = { message: Messages.account.retryLogin }
      throw error;
    }
    const query = Shopify.graphQLClient.query((root) => {
      root.add('customer', { args: { customerAccessToken: userAccessToken } }, (customer) => {
        customer.addConnection('orders', { args: { first: 10, reverse: true } }, (order) => {
          order.add('email');
          order.add('id');
          order.addConnection('lineItems', { args: { first: 250 } }, (lineItem) => {
            lineItem.add('quantity');
            lineItem.add('title');
            lineItem.add('variant', (variant) => {
              variant.add('image', (image) => {
                image.add('originalSrc');
              });
              variant.add('priceV2', (price) => {
                price.add('amount');
              });
              variant.add('price');
              variant.add('title');
            });
          })
          order.add('name');
          order.add('orderNumber');
          order.add('phone');
          order.add('shippingAddress', (shippingAddress) => {
            shippingAddress.add('address1');
            shippingAddress.add('city');
            shippingAddress.add('country');
            shippingAddress.add('firstName');
            shippingAddress.add('id');
            shippingAddress.add('lastName');
            shippingAddress.add('name');
            shippingAddress.add('phone');
            shippingAddress.add('zip');
          });
          order.add('totalPriceV2', (price) => {
            price.add('amount');
          });
          order.add('totalPrice');
          order.add('totalShippingPriceV2', (price) => {
            price.add('amount');
          });
          order.add('subtotalPriceV2', (price) => {
            price.add('amount');
          });
          order.add('processedAt');
        });
      });
    });
    const { model } = await Shopify.graphQLClient.send(query);
    if (model.customer !== null) {
      dispatch({
        type: Types.ORDERS_FETCHED,
        orders: model.customer.orders
      });
    } else {
      dispatch({
        type: Types.ORDERS_FETCHED,
        orders: []
      });
      await AsyncStorage.setItem(StorageKeys.IS_AUTHENTICATED_USER, StorageKeys.USER_NOT_AUTHENTICATED);
      await AsyncStorage.removeItem(StorageKeys.USER_ACCESS_TOKEN);
      await AsyncStorage.removeItem(StorageKeys.USER_DATA);
      const error = { message: Messages.account.retryLogin }
      throw error;
    }
  }
}

export const getAddresses = () => {
  return async (dispatch) => {
    const userAccessToken = await AsyncStorage.getItem(StorageKeys.USER_ACCESS_TOKEN);
    const authStatus = await AsyncStorage.getItem(StorageKeys.IS_AUTHENTICATED_USER);
    if (authStatus === StorageKeys.USER_NOT_AUTHENTICATED || userAccessToken === null || userAccessToken === undefined) {
      const error = { message: Messages.account.retryLogin }
      throw error;
    }
    const query = Shopify.graphQLClient.query((root) => {
      root.add('customer', { args: { customerAccessToken: userAccessToken } }, (customer) => {
        customer.addConnection('addresses', { args: { first: 250 } }, (address) => {
          address.add('address1');
          address.add('address2');
          address.add('city');
          address.add('company');
          address.add('country');
          address.add('firstName');
          address.add('countryCodeV2');
          address.add('id');
          address.add('lastName');
          address.add('name');
          address.add('phone');
          address.add('zip');
          address.add('province');
          address.add('formatted', { args: { withName: true, withCompany: false } });
        });
      });
    });
    const { model } = await Shopify.graphQLClient.send(query);
    if (model.customer !== null) {
      dispatch({
        type: Types.ADDRESSES_FETCHED,
        addresses: model.customer.addresses
      });
      return model.customer.addresses;
    }
    dispatch({
      type: Types.ADDRESSES_FETCHED,
      addresses: []
    });
    await AsyncStorage.setItem(StorageKeys.IS_AUTHENTICATED_USER, StorageKeys.USER_NOT_AUTHENTICATED);
    await AsyncStorage.removeItem(StorageKeys.USER_ACCESS_TOKEN);
    await AsyncStorage.removeItem(StorageKeys.USER_DATA);
    const error = { message: Messages.account.retryLogin }
    throw error;
  }
}

export const addAddress = (param) => {
  return async (dispatch) => {
    const userAccessToken = await AsyncStorage.getItem(StorageKeys.USER_ACCESS_TOKEN);
    const authStatus = await AsyncStorage.getItem(StorageKeys.IS_AUTHENTICATED_USER);
    if (authStatus === StorageKeys.USER_NOT_AUTHENTICATED || userAccessToken === null || userAccessToken === undefined) {
      const error = { message: Messages.account.retryLogin }
      throw error;
    }
    const address = Shopify.graphQLClient.variable('address', 'MailingAddressInput!');
    const mutation = Shopify.graphQLClient.mutation('myMutation', [address], (root) => {
      root.add('customerAddressCreate', { args: { customerAccessToken: userAccessToken, address } }, (adr) => {
        adr.add('customerAddress', (customerAddress) => {
          customerAddress.add('address1');
          customerAddress.add('address2');
          customerAddress.add('city');
          customerAddress.add('company');
          customerAddress.add('country');
          customerAddress.add('firstName');
          customerAddress.add('countryCodeV2');
          customerAddress.add('lastName');
          customerAddress.add('name');
          customerAddress.add('phone');
          customerAddress.add('zip');
          customerAddress.add('province');
          customerAddress.add('formatted', { args: { withName: true, withCompany: false } });
        });
      });
    });

    const { model } = await Shopify.graphQLClient.send(mutation, { address: param });
    if (model && model.customerAddressCreate && model.customerAddressCreate.customerAddress) {
      dispatch({
        type: Types.ADDRESS_ADDED,
        address: model.customerAddressCreate ?.customerAddress
            });
      return model.customerAddressCreate ?.customerAddress;
    }
    dispatch({
      type: Types.ADDRESS_ADDED,
      address: null
    });
    await AsyncStorage.setItem(StorageKeys.IS_AUTHENTICATED_USER, StorageKeys.USER_NOT_AUTHENTICATED);
    await AsyncStorage.removeItem(StorageKeys.USER_ACCESS_TOKEN);
    await AsyncStorage.removeItem(StorageKeys.USER_DATA);
    const error = { message: Messages.account.retryLogin }
    throw error;
  }
}

export const updateAddress = (addressId, param) => {
  return async () => {
    const userAccessToken = await AsyncStorage.getItem(StorageKeys.USER_ACCESS_TOKEN);
    const authStatus = await AsyncStorage.getItem(StorageKeys.IS_AUTHENTICATED_USER);
    if (authStatus === StorageKeys.USER_NOT_AUTHENTICATED || userAccessToken === null || userAccessToken === undefined) {
      const error = { message: Messages.account.retryLogin }
      throw error;
    }
    const id = Shopify.graphQLClient.variable('id', 'ID!');
    const address = Shopify.graphQLClient.variable('address', 'MailingAddressInput!');
    const mutation = Shopify.graphQLClient.mutation('myMutation', [id, address], (root) => {
      root.add('customerAddressUpdate', { args: { customerAccessToken: userAccessToken, id, address } }, (adr) => {
        adr.add('customerAddress', (customerAddress) => {
          customerAddress.add('address1');
          customerAddress.add('address2');
          customerAddress.add('city');
          customerAddress.add('company');
          customerAddress.add('country');
          customerAddress.add('firstName');
          customerAddress.add('countryCodeV2');
          customerAddress.add('lastName');
          customerAddress.add('name');
          customerAddress.add('phone');
          customerAddress.add('zip');
          customerAddress.add('province');
          customerAddress.add('formatted', { args: { withName: true, withCompany: false } });
        });
      });
    });

    const { model } = await Shopify.graphQLClient.send(mutation, { id: addressId, address: param });
    if (model && model.customerAddressUpdate && model.customerAddressUpdate.customerAddress) {
      return model.customerAddressUpdate.customerAddress;
    }
    await AsyncStorage.setItem(StorageKeys.IS_AUTHENTICATED_USER, StorageKeys.USER_NOT_AUTHENTICATED);
    await AsyncStorage.removeItem(StorageKeys.USER_ACCESS_TOKEN);
    await AsyncStorage.removeItem(StorageKeys.USER_DATA);
    const error = { message: Messages.account.retryLogin }
    throw error;
  }
}

export const deleteAddress = (addressId) => {
  return async () => {
    const userAccessToken = await AsyncStorage.getItem(StorageKeys.USER_ACCESS_TOKEN);
    const authStatus = await AsyncStorage.getItem(StorageKeys.IS_AUTHENTICATED_USER);
    if (authStatus === StorageKeys.USER_NOT_AUTHENTICATED || userAccessToken === null || userAccessToken === undefined) {
      const error = { message: Messages.account.retryLogin }
      throw error;
    }
    const id = Shopify.graphQLClient.variable('id', 'ID!');
    const mutation = Shopify.graphQLClient.mutation('myMutation', [id], (root) => {
      root.add('customerAddressDelete', { args: { customerAccessToken: userAccessToken, id } }, (adr) => {
        adr.add('deletedCustomerAddressId');
      });
    });

    const deletedAddressId = await Shopify.graphQLClient.send(mutation, { id: addressId });
    if (deletedAddressId !== null && deletedAddressId !== undefined) {
      return deletedAddressId
    }
    await AsyncStorage.setItem(StorageKeys.IS_AUTHENTICATED_USER, StorageKeys.USER_NOT_AUTHENTICATED);
    await AsyncStorage.removeItem(StorageKeys.USER_ACCESS_TOKEN);
    await AsyncStorage.removeItem(StorageKeys.USER_DATA);
    const error = { message: Messages.account.retryLogin }
    throw error;
  }
}

export const updateInfo = (param) => {
  return async (dispatch) => {
    const userAccessToken = await AsyncStorage.getItem(StorageKeys.USER_ACCESS_TOKEN);
    const authStatus = await AsyncStorage.getItem(StorageKeys.IS_AUTHENTICATED_USER);
    if (authStatus === StorageKeys.USER_NOT_AUTHENTICATED || userAccessToken === null || userAccessToken === undefined) {
      const error = { message: Messages.account.retryLogin }
      throw error;
    }
    const customer = Shopify.graphQLClient.variable('customer', 'CustomerUpdateInput!');
    const mutation = Shopify.graphQLClient.mutation('myMutation', [customer], (root) => {
      root.add('customerUpdate', { args: { customerAccessToken: userAccessToken, customer } }, (customerUpdate) => {
        customerUpdate.add('customer', (ctmr) => {
          ctmr.add('id');
          ctmr.add('firstName');
          ctmr.add('lastName');
          ctmr.add('email');
          ctmr.add('phone');
          ctmr.add('displayName');
        });
        customerUpdate.add('customerAccessToken', (customerAccessToken) => {
          customerAccessToken.add('accessToken');
        });
      });
    });

    const { model } = await Shopify.graphQLClient.send(mutation, { customer: param });

    if (model && model.customerUpdate && model.customerUpdate.customer) {
      dispatch({
        type: Types.INFO_UPDATED,
        info: model.customerUpdate.customer
      });
      await AsyncStorage.setItem(StorageKeys.USER_DATA, JSON.stringify(model.customerUpdate.customer));
      if (model.customerUpdate.customerAccessToken) {
        await AsyncStorage.setItem(StorageKeys.USER_ACCESS_TOKEN, model.customerUpdate.customerAccessToken ?.accessToken);
      }
    } else {
      await AsyncStorage.setItem(StorageKeys.IS_AUTHENTICATED_USER, StorageKeys.USER_NOT_AUTHENTICATED);
      await AsyncStorage.removeItem(StorageKeys.USER_ACCESS_TOKEN);
      await AsyncStorage.removeItem(StorageKeys.USER_DATA);
      const error = { message: Messages.account.retryLogin }
      throw error;
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    await AsyncStorage.clear();
    dispatch({
      type: Types.USER_LOGGED_OUT,
    });
  }
}
