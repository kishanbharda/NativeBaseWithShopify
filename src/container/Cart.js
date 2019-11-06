import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Button, Card, List, ListItem, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../actions/cartAction';
import { getShadow } from '../../config/Styles';
import CText from '../component/CText';
import Colors from '../../config/Colors';
import BtnRound from '../component/BtnRound';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
  }

  renderCartItem = ({item, index}) => {
    return (
      <TouchableOpacity 
        style={styles.cartItem} 
        activeOpacity={0.7}
      >
        {
          item.image?.src ? (
            <FastImage
              source={{uri: item.image?.src}}
              style={styles.image}
            />
          ) : (
            <Image 
              source={{uri: 'item_placeholder'}}
              style={styles.image}
            />
          )
        }
        
        
        <View style={{flex: 1, height: '100%', flexDirection: 'row'}}>
          <View style={{paddingRight: 10, flex: 1}}>
            <CText size={18} bold numberOfLines={1}>{item.productTitle}</CText>
            <CText size={16} color={Colors.price}>${item.price}</CText>

            <View style={styles.actionContainer}>
              <BtnRound icon="minus" size={30} onPress={() => this.props.decreaseQuantity(index)} />
              <View style={styles.quantity}><CText>{item.quantity}</CText></View>
              <BtnRound icon="plus" size={30} onPress={() => this.props.increaseQuantity(index)} />
            </View>
          </View>

          <View style={{justifyContent: 'space-between'}}>
            <CText size={16} bold color={Colors.price}>${parseFloat(parseFloat(item.price, 10) * parseInt(item.quantity, 10)).toFixed(2)}</CText>
            <BtnRound 
              icon="trash" 
              color="#ffffff" 
              iconColor="#ef5350" 
              iconSize={16} 
              size={30} 
              style={{alignSelf: 'flex-end'}} 
              onPress={() => this.props.removeFromCart(index)}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderSubTotal = () => {
		let total = 0;
		this.props.cart.data.forEach(element => {
			total += (element.price * element.quantity)
    });
		return parseFloat(total, 10).toFixed(2)
  }

  renderEmptyCart = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
        <CText size={34} style={{textAlign: 'center', margin: 10}}>Your cart is Empty.</CText>
        <Button block onPress={() => this.props.navigation.navigate('Home')}>
          <CText color="#ffffff">CONTINUE SHOPPING</CText>
        </Button>
      </View>
    )
  }
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.cart.data}
          extraData={this.props.cart}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 5, paddingBottom: 50}}
          keyExtractor={(item) => item.variantId}
          ListEmptyComponent={this.renderEmptyCart}
          renderItem={this.renderCartItem}
          ListFooterComponent={(
            this.props.cart.data.length > 0 && (
              <>
                <View style={styles.promoContainer}>
                  <TextInput 
                    style={{flex: 1, fontSize: 16}}
                    placeholder="Enter Promo Code here"
                  />
                  <Button style={{paddingHorizontal: 20}}><CText color="#ffffff">APPLY</CText></Button>
                </View>

                <View style={{margin: 5, borderWidth: 0.3, borderColor: "#dddddd", borderRadius: 10, overflow: 'hidden'}}>
                  <List>
                    <ListItem noIndent>
                      <Left>
                        <CText>Subtotal</CText>
                      </Left>
                      <Right>
                        <CText>${this.renderSubTotal()}</CText>
                      </Right>
                    </ListItem>
                    <ListItem noIndent>
                      <Left>  
                        <CText>Shipping</CText>
                      </Left>
                      <Right>
                        <CText>-</CText>
                      </Right>
                    </ListItem>
                    <ListItem noIndent>
                      <Left>  
                        <CText>Discount</CText>
                      </Left>
                      <Right>
                        <CText>$0</CText>
                      </Right>
                    </ListItem>
                    <ListItem noIndent>
                      <Left>
                        <CText>Total</CText>
                      </Left>
                      <Right>
                        <CText>${this.renderSubTotal()}</CText>
                      </Right>
                    </ListItem>
                  </List>
                </View>

                <Button block style={{margin: 5}}>
                  <CText color="#ffffff">CHECKOUT</CText>
                </Button>
              </>
            )
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartItem: {
    flex: 1,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: "#ffffff",
    height: 110,
    borderRadius: 10,
    ...getShadow({ height: 5, radius: 5})
  },
  image: {
    height: '100%',
    width: 80,
    marginRight: 10,
    backfaceVisibility: 'hidden',
    backgroundColor: '#ffffff',
    ...getShadow(),
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  quantity: {
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    backfaceVisibility: 'hidden',
    ...getShadow()
  },
  promoContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    backgroundColor: "#ffffff",
    backfaceVisibility: 'hidden',
    padding: 10,
    borderRadius: 10,
    ...getShadow({height: 3})
  }
});

const mapStateToProps = (state) => ({
  cart: state.cartReducer
});

const mapDispatchToProps = (dispatch) => ({
  increaseQuantity: (index) => dispatch(increaseQuantity(index)),
	decreaseQuantity: (index) => dispatch(decreaseQuantity(index)),
  removeFromCart:(index) => dispatch(removeFromCart(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
