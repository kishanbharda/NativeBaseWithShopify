import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { removeFromWishlist } from '../actions/wishlistAction';
import CText from '../component/CText';
import { getShadow } from '../../config/Styles';
import Colors from '../../config/Colors';
import BtnRound from '../component/BtnRound';

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  removeFromWishlist = (productId) => {
    this.props.removeFromWishlist(productId);
  }

  renderEmptyList = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
        <CText size={34} style={{textAlign: 'center', margin: 10}}>Your wishlist is Empty.</CText>
        <Button block onPress={() => this.props.navigation.navigate('Home')}>
          <CText color="#ffffff">CONTINUE SHOPPING</CText>
        </Button>
      </View>
    )
  }

  renderItem = ({item}) => {
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
            <CText size={18} bold numberOfLines={3}>{item.productTitle}</CText>
            <CText size={16} color={Colors.price}>${item.price}</CText>
          </View>

          <View style={{justifyContent: 'center'}}>
            <BtnRound 
              icon="heart" 
              color="#ffffff" 
              solid
              iconColor="#ef5350" 
              iconSize={20} 
              size={40} 
              style={{alignSelf: 'flex-end'}} 
              onPress={() => this.removeFromWishlist(item.productId)}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.props.wishlist.data}
          extraData={this.props.wishlist}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 5, paddingBottom: 50}}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={this.renderEmptyList}
          renderItem={this.renderItem}
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
  wishlist: state.wishlistReducer
});

const mapDispatchToProps = (dispatch) => ({
  removeFromWishlist: (productId) => dispatch(removeFromWishlist(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
