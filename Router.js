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
import Cart from './src/container/Cart';

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Cart: {
    screen: Cart,
    navigationOptions: ({navigation}) => {
      return {
        header: <Header title={"Cart"} requireBackButton onBackButtonPress={() => navigation.goBack()} onCartPress={() => navigation.navigate('Cart')} />
      }
    }
  }
}, {
  defaultNavigationOptions: ({navigation}) => {
    const {routeName} = navigation.state;
    return {
      header: <Header hasTabs={false} title={routeName} onMenuPress={() => navigation.openDrawer()} onCartPress={() => navigation.navigate('Cart')} />
    }
  }
});

const ProductsStackNavigator = createStackNavigator({
  Products: {
    screen: Products,
    navigationOptions: ({navigation}) => {
      return {
        header: <Header hasTabs={true} title={"Products"} onMenuPress={() => navigation.openDrawer()} onCartPress={() => navigation.navigate('Cart')} />
      }
    }
  },
  ProductDetail: {
    screen: ProductDetail
  },
  Cart: {
    screen: Cart,
    navigationOptions: ({navigation}) => {
      return {
        header: <Header title={"Cart"} requireBackButton onBackButtonPress={() => navigation.goBack()} onCartPress={() => navigation.navigate('Cart')} />
      }
    }
  }
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
