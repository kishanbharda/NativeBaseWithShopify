import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from './src/container/Home';
import Products from './src/container/Products';
import Account from './src/container/Account';
import ProductDetail from './src/container/ProductDetail';
import Categories from './src/container/Categories';
import Header from './src/component/Header';

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: Home
  }
}, {
  defaultNavigationOptions: ({navigation}) => {
    const {routeName} = navigation.state;
    return {
      header: <Header hasTabs={false} title={routeName} onMenuPress={() => navigation.openDrawer()} />
    }
  }
});

const ProductsStackNavigator = createStackNavigator({
  Products: {
    screen: Products,
    navigationOptions: ({navigation}) => {
      return {
        header: <Header hasTabs={true} title={"Products"} onMenuPress={() => navigation.openDrawer()} />
      }
    }
  },
  ProductDetail: {
    screen: ProductDetail,
    // navigationOptions: {
    //   header: null
    // }
  },
});

const StackNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStackNavigator,
  },
  Products: {
    screen: ProductsStackNavigator
  },
  Account: {
    screen: Account
  }
}, {
  unmountInactiveRoutes: true
});

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer
