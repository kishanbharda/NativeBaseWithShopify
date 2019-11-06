import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Dimensions, Text } from 'react-native';
import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCart, updateQuantity } from '../actions/cartAction';
import Colors from '../../config/Colors';
import { getShadow } from '../../config/Styles';
import BtnRound from './BtnRound';

const BORDER_RADIUS = 10;

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product
    }
  }

  addToCart = async () => {
    const selectedVariant = this.state.product.variants[0];
    const exist = this.props.cart.data.find((item) => item.variantId === selectedVariant.id);
    if (exist) {
      const index = this.props.cart.data.indexOf(exist);
      exist.quantity = parseInt(exist.quantity, 10) + 1;
      await this.props.updateQuantity(exist, index);
    } else {
      /*
          Here variant is the selected options. For example if user 
          has selected "size: small" and "color: red" then 
          selectedOptions is [{name: 'size', value: 'small'}, {name: color, value: 'red'}]
      */
      const cartItem = {
        productId: this.state.product.id,
        productTitle: this.state.product.title,
        variantId: selectedVariant.id,
        variant: selectedVariant,
        image: selectedVariant.image,
        price: selectedVariant.price,
        quantity: 1,
      }
      this.props.addToCart(cartItem);
    }
  }

  render() {
    const { product } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, { ...this.props.style }]}
        activeOpacity={0.8}
        onPress={this.props.onPress}
      >
        {
          product.images[0] ? (
            <FastImage
              source={{ uri: product.images[0].src }}
              style={styles.image}
            />
          ) : (
            <Image
              source={{ uri: 'item_placeholder' }}
              style={styles.image}
            />
          )
        }

        <View style={styles.actionButtonContainer}>
          <BtnRound
            icon="cart-plus"
            size={35}
            style={styles.btnCart}
            onPress={this.addToCart}
          />
          <BtnRound
            icon="heart"
            size={35}
            style={styles.btnWishlist}
          />
        </View>
        <View style={styles.detailContainer}>
          <View style={{ flex: 7 }}>
            <Text style={{ fontSize: 14, color: "#616161" }}>{product.title}</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 14, color: "#2e7d32" }}>${product.variants[0] ?.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: (Dimensions.get('screen').width - 30) / 2,
    alignItems: 'center',
    borderWidth: 0,
    borderColor: Colors.productItemBorder,
    margin: 5,
    backgroundColor: "#ffffff",
    borderRadius: BORDER_RADIUS,
    backfaceVisibility: 'hidden',
    ...getShadow({ color: "#aaaaaa", height: 0, width: 0, radius: 4 }),
  },
  image: {
    width: '100%',
    height: 240,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS
  },
  detailContainer: {
    padding: 5,
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  actionButtonContainer: {
    position: 'absolute',
    bottom: 55,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    width: '100%'
  },
  btnCart: {
    marginHorizontal: 5
  },
  btnWishlist: {
    marginHorizontal: 5
  }
});


ProductItem.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  onPress: PropTypes.func,
  style: PropTypes.instanceOf(PropTypes.any)
}

ProductItem.defaultProps = {
  style: null,
  onPress: null
}

const mapStateToProps = (state) => ({
  cart: state.cartReducer
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (cartItem) => dispatch(addToCart(cartItem)),
  updateQuantity: (element) => dispatch(updateQuantity(element))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)
