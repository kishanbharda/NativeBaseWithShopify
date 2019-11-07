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
import Wishlist from './src/container/Wishlist';

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Cart: {
    screen: Cart,
    navigationOptions: ({navigation}) => {
      return {
        header: <Header 
          title={"Cart"} 
          requireBackButton 
          onBackButtonPress={() => navigation.goBack()} 
          onCartPress={() => navigation.navigate('Cart')} 
          onWishlistPress={() => navigation.navigate('Wishlist')} 
        />
      }
    }
  },
  Wishlist: {
    screen: Wishlist,
    navigationOptions: ({navigation}) => {
      return {
        header: <Header 
          title={"Wishlist"} 
          requireBackButton 
          onBackButtonPress={() => navigation.goBack()} 
          onCartPress={() => navigation.navigate('Cart')} 
          onWishlistPress={() => navigation.navigate('Wishlist')} 
        />
      }
    }
  }
}, {
  defaultNavigationOptions: ({navigation}) => {
    const {routeName} = navigation.state;
    return {
      header: <Header 
        hasTabs={false} 
        title={routeName} 
        onMenuPress={() => navigation.openDrawer()} 
        onCartPress={() => navigation.navigate('Cart')} 
        onWishlistPress={() => navigation.navigate('Wishlist')} 
      />
    }
  }
});

const ProductsStackNavigator = createStackNavigator({
  Products: {
    screen: Products,
    navigationOptions: ({navigation}) => {
      return {
        header: <Header 
          hasTabs={true} 
          title={"Products"} 
          onMenuPress={() => navigation.openDrawer()} 
          onCartPress={() => navigation.navigate('Cart')} 
          onWishlistPress={() => navigation.navigate('Wishlist')} 
        />
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
        header: <Header 
          title={"Cart"} 
          requireBackButton 
          onBackButtonPress={() => navigation.goBack()} 
          onCartPress={() => navigation.navigate('Cart')} 
          onWishlistPress={() => navigation.navigate('Wishlist')} 
        />
      }
    }
  },
  Wishlist: {
    screen: Wishlist,
    navigationOptions: ({navigation}) => {
      return {
        header: <Header 
          title={"Wishlist"} 
          requireBackButton 
          onBackButtonPress={() => navigation.goBack()} 
          onCartPress={() => navigation.navigate('Cart')} 
          onWishlistPress={() => navigation.navigate('Wishlist')} 
        />
      }
    }
  }
});

const AccountStack = createStackNavigator({
  Account: {
    screen: Account,
    navigationOptions: ({navigation}) => {
      return {
        header: <Header 
          hasTabs={true} 
          title={"Account"} 
          onMenuPress={() => navigation.openDrawer()} 
          onCartPress={() => navigation.navigate('Cart')} 
          onWishlistPress={() => navigation.navigate('Wishlist')} 
        />
      }
    }
  },
  Cart: {
    screen: Cart,
    navigationOptions: ({navigation}) => {
      return {
        header: <Header 
          title={"Cart"} 
          requireBackButton 
          onBackButtonPress={() => navigation.goBack()} 
          onCartPress={() => navigation.navigate('Cart')} 
          onWishlistPress={() => navigation.navigate('Wishlist')} 
        />
      }
    }
  },
  Wishlist: {
    screen: Wishlist,
    navigationOptions: ({navigation}) => {
      return {
        header: <Header 
          title={"Wishlist"} 
          requireBackButton 
          onBackButtonPress={() => navigation.goBack()} 
          onCartPress={() => navigation.navigate('Cart')} 
          onWishlistPress={() => navigation.navigate('Wishlist')} 
        />
      }
    }
  }
})

const StackNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStackNavigator,
  },
  Products: {
    screen: ProductsStackNavigator
  },
  Account: {
    screen: AccountStack,
  }
}, {
  unmountInactiveRoutes: true
});

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer
