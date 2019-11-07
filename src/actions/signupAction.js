import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import * as Types from '../constants/ActionKeys';
import * as StorageKeys from '../constants/StorageKeys';
import ShopifyApi from '../../config/ShopifyApi';
import { getSignupQuery } from '../graphql/Queries'
import showError from '../component/showError';

export const doSignUp = (param) => {
  return async () => {
    const query = getSignupQuery(param);
    const response = await axios.post(ShopifyApi.url, query, { headers: ShopifyApi.header });
    const { customerUserErrors } = response.data.data.customerCreate;
    if (customerUserErrors.length > 0) {
      showError(customerUserErrors[0].message);
    } else {
      this.props.doLogin(this.state.email, this.state.password).then((result) => {
        if (result.isValid) {
          this.setUserData(result.accessToken);
        } else {
          this.showError(result.message);
        }
      }).catch((error) => {
        this.showError(error.message);
      });
    } 
  }
}

export const setData = () => {
  return () => {

  }
}
