import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { Button, Text, Icon, Content } from 'native-base';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { addToCart, updateQuantity } from '../actions/cartAction';
import { addToWishlist, removeFromWishlist } from '../actions/wishlistAction';
import { fetchSingleProduct } from '../actions/productsAction';
import Header from '../component/Header';
import Loader from '../component/Loader';
import Colors from '../../config/Colors';
import { getShadow } from '../../config/Styles';
import CText from '../component/CText';
import Hr from '../component/Hr';
import BtnRound from '../component/BtnRound';
import showError from '../component/showError';

class ProductDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    header: <Header
      title={navigation.state.params.title || "Detail"}
      requireBackButton={true}
      onBackButtonPress={() => navigation.goBack()}
      onCartPress={() => navigation.navigate('Cart')}
      onWishlistPress={() => navigation.navigate('Wishlist')} 
      noShadow
    />
  });

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      isLoading: true,
      selectedOptions: [],
      selectedVariant: null,
      isAddingToCart: false,
      quantity: 1
    };
  }

  componentDidMount = () => {
    this.setData();
  }

  setData = async () => {
    this.setState({ isLoading: true });
    const productId = this.props.navigation.getParam("id");
    const product = await this.props.fetchSingleProduct(productId);
    this.props.navigation.setParams({ title: (product) ? product.title : "Detail" });
    this.setState({ product }, () => {
      this.setState({ selectedVariant: this.state.product.variants[0] });
      this.setInitialVariant();
      this.setState({ isLoading: false });
    });
  }

  setInitialVariant = () => {
    const { selectedOptions } = this.state.product.variants[0];
    const temp = [];
    selectedOptions.forEach(element => {
      temp.push({
        name: element.name,
        value: element.value
      });
    });
    this.setState({ selectedOptions: temp });
  }

  onVariantPress = (variantIndex, value) => {
    const { selectedOptions } = this.state;
    selectedOptions[variantIndex].value = value;
    this.setState({ selectedOptions }, () => {
      this.setSelectedVariant();
    });
  }

  setSelectedVariant = () => {  
    let selectedVariantTitle = "";
    this.state.selectedOptions.forEach((element, index) => {
      if (index !== this.state.selectedOptions.length - 1) {
        selectedVariantTitle += `${element.value} / `
      } else {
        selectedVariantTitle += `${element.value}`
      }
    });
    for (let i = 0; i < this.state.product.variants.length; i++) {
      if (this.state.product.variants[i].title === selectedVariantTitle) {
        this.setState({ selectedVariant: this.state.product.variants[i] });
        break;
      }
    }
  }

  addToCart = async () => {
    this.setState({ isAddingToCart: true });
    const {selectedVariant} = this.state;
    const exist = this.props.cartItems.data.find((item) => item.variantId === selectedVariant.id);
    if (exist) {
      const index = this.props.cartItems.data.indexOf(exist);
      exist.quantity = parseInt(exist.quantity, 10) + parseInt(this.state.quantity, 10);
      await this.props.updateQuantity(exist, index);
      this.setState({ isAddingToCart: false });
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
        variant: this.state.selectedOptions,
        image: selectedVariant.image,
        price: selectedVariant.price,
        quantity: parseInt(this.state.quantity, 10),
      }
      this.props.addToCart(cartItem).then(() => {
        this.setState({ isAddingToCart: false });
      }).catch((error) => {
        this.setState({ isAddingToCart: false }, () => {
          setTimeout(() => {
            showError(error.message);
          }, 100);
        })
      });
    }
  }

  addToWishlist = () => {
    const selectedVariant = this.state.product.variants[0];
    const wishlistItem = {
      productId: this.state.product.id,
      productTitle: this.state.product.title,
      variantId: selectedVariant.id,
      variant: selectedVariant,
      image: selectedVariant.image,
      price: selectedVariant.price,
      quantity: 1,
      isAvailable: selectedVariant.available
    }
    this.props.addToWishlist(wishlistItem);
  }

  removeFromWishlist = () => {
    this.props.removeFromWishlist(this.state.product.id);
  }

  renderWishlistButton = () => {
    const exist = this.props.wishlist.data.find((item) => item.productId === this.state.product?.id);
    if (exist) {
      return (
        <BtnRound
          icon="heart"
          solid
          iconSize={30}
          size={50}
          style={styles.btnWishlist}
          onPress={this.removeFromWishlist}
        />
      )
    }
    return (
      <BtnRound
        icon="heart"
        iconSize={30}
        size={50}
        style={styles.btnWishlist}
        onPress={this.addToWishlist}
      />
    )
  }
  
  render() {
    if (this.state.isLoading) {
      return (
        <Loader />
      )
    }
    return (
      <>
        <Content
          style={[styles.container]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 70 }}
        >

          {/* Product images slider */}
          <View>
            <FlatList
              data={this.state.product.images}
              extraData={this.state}
              horizontal={true}
              contentContainerStyle={{ paddingVertical: 20, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={(
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: 'item_placeholder' }}
                    style={styles.image}
                  />
                </View>
              )}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.imageContainer}
                  key={item.id}
                  activeOpacity={0.8}
                >
                  <FastImage
                    source={{ uri: item?.src }}
                    style={styles.image}
                  />
                </TouchableOpacity>
              )}
            />
            {this.renderWishlistButton()}
          </View>

          {/* Title / Pricing */}
          <View style={styles.detailContainer}>
            <CText style={{flex: 1, paddingRight: 10}} size={24} bold color="#000000">
              {this.state.product.title}
            </CText>
            <CText size={24} color={Colors.price}>${this.state.selectedVariant.price}</CText>
          </View>
            
          {/* Variants */}
          <View>
            {
              this.state.product.options.map((option, variantIndex) => (
                option.name !== "Title" && (
                  <>
                    <Hr />
                    <View key={option.id} style={styles.variantContainer}>
                      <CText style={{marginLeft: 20, width: 80}}>{option.name}</CText>
                      <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 5}}
                        style={{}}
                      >
                        {
                          option.values.map((value, index) => (
                            <TouchableOpacity 
                              key={index.toString()}
                              style={[
                                styles.variantBadge,
                                this.state.selectedOptions[variantIndex].value === value.value ? {
                                  borderWidth: 0.5,
                                  borderColor: Colors.primary,
                                } : {}
                              ]}
                              onPress={() => this.onVariantPress(variantIndex, value.value)}
                            >
                              <CText>{value.value}</CText>
                            </TouchableOpacity>
                          ))
                        }
                      </ScrollView>
                    </View>
                  </>
                )
              ))
            }
          </View>

          {/* Product Description */}
          <Hr />
          <View style={{marginVertical: 10, paddingHorizontal: 20}}>
            <CText size={20} bold>Description</CText>
            <CText>{this.state.product.description}</CText>
          </View>

        </Content>
      
        <Button activeOpacity={1} dark block style={styles.btnAddToCart} iconLeft onPress={this.addToCart}>
          {
            this.state.isAddingToCart ? (
              <ActivityIndicator animating={true} />
            ) : (
              <>
                <Icon name="cart-plus" type="FontAwesome5" />
                <Text>ADD TO CART</Text>
              </>
            )
          }
        </Button>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignSelf: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
    height: 400,
    width: Dimensions.get('screen').width - 100,
    ...getShadow({ color: "#aaaaaa", height: 0, width: 0, radius: 10, opacity: 0.5 })
  },  
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 5
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center'
  },
  variantContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  variantBadge: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    minWidth: 100,
    backgroundColor: "#ffffff",
    ...getShadow({ color: "#aaaaaa", radius: 5, opacity: 0.3 }),
    marginRight: 10
  },
  btnAddToCart: {
    marginHorizontal: 20, 
    marginVertical: 10, 
    position: 'absolute', 
    bottom: 10, 
    left: 0, 
    right: 0,
    borderRadius: 50,
    ...getShadow({ color: "#000000", radius: 10, opacity: 0.8, height: 5 }),
  },
  btnWishlist: {
    position: 'absolute',
    bottom: 30,
    right: 10
  }
});

const mapStateToProps = (state) => ({
  products: state.productsReducer,
  cartItems: state.cartReducer,
  wishlist: state.wishlistReducer
});

const mapDispatchToProps = (dispatch) => ({
  fetchSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
  addToCart: (cartItem) => dispatch(addToCart(cartItem)),
  updateQuantity: (element, index) => dispatch(updateQuantity(element, index)),
  addToWishlist: (wishlistItem) => dispatch(addToWishlist(wishlistItem)),
  removeFromWishlist: (productId) => dispatch(removeFromWishlist(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
