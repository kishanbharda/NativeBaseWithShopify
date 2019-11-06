import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header, Left, Right, Button, Body, Title, Icon } from 'native-base';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { setCartFromStorage } from '../actions/cartAction';
import { setWishlistFromStorage } from '../actions/wishlistAction';
import Colors from '../../config/Colors';

class CommonHeader extends Component {
  componentDidMount = () => {
    this.props.setCartFromStorage();
    this.props.setWishlistFromStorage();
  }

  render() {
    const {props} = this;
    return (
      <Header 
        hasTabs={props.hasTabs} 
        transparent={props.transparent}
      >
        {
          props.requireBackButton ? (
            <Left>
              <Button transparent onPress={props.onBackButtonPress}>
                <Icon type="Ionicons" android="md-arrow-round-back" ios="ios-arrow-back" />
                {/* <Text>Back</Text> */}
              </Button>
            </Left>
          ) : (
            <Left>
              <Button transparent onPress={props.onMenuPress}>
                <Icon type="Ionicons" name="menu" />
              </Button>
            </Left>
          )
        }
       
        <Body>
          <Title>{props.title}</Title>
        </Body>
        <Right>
          <Button transparent onPress={props.onWishlistPress} icon>
            <Icon name="heart" active={false} />
            {
              props.wishlist.data.length !== 0 && (
                <View style={{
                  height: 25,
                  width: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  backgroundColor: Colors.primary,
                  overflow: 'hidden',
                  borderRadius: 25,
                  borderWidth: 1,
                }}> 
                  <Text style={{fontSize: 12, fontWeight: 'bold', color: "#ffffff"}}>{props.wishlist.data.length}</Text>
                </View>
              )
            }
          </Button>
          <Button transparent onPress={props.onCartPress} icon>
            <Icon name="cart" active={false} />
            {
              props.cart.totalItems !== 0 && (
                <View style={{
                  height: 25,
                  width: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  backgroundColor: Colors.primary,
                  overflow: 'hidden',
                  borderRadius: 25,
                  borderWidth: 1,
                }}> 
                  <Text style={{fontSize: 12, fontWeight: 'bold', color: "#ffffff"}}>{props.cart.totalItems}</Text>
                </View>
              )
            }
          </Button>
        </Right>
      </Header>
    )
  }
}

CommonHeader.propTypes = {
  requireBackButton: PropTypes.bool,
  onBackButtonPress: PropTypes.func,
  onMenuPress: PropTypes.func,
  title: PropTypes.string,
  onWishlistPress: PropTypes.func,
  onCartPress: PropTypes.func,
  transparent: PropTypes.bool
}

CommonHeader.defaultProps = {
  requireBackButton: false,
  onBackButtonPress: null,
  onMenuPress: null,
  title: "Native Base",
  onWishlistPress: null,
  onCartPress: null,
  transparent: false
}

const mapStateToProps = (state) => ({
  cart: state.cartReducer,
  wishlist: state.wishlistReducer
});

const mapDispatchToProps = (dispatch) => ({
  setCartFromStorage: () => dispatch(setCartFromStorage()),
  setWishlistFromStorage: () => dispatch(setWishlistFromStorage())
});

export default connect(mapStateToProps, mapDispatchToProps)(CommonHeader)
