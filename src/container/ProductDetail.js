import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { Button, Text, Left, Icon, List, ListItem, Right, Container, Content } from 'native-base';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../actions/productsAction';
import Header from '../component/Header';
import Loader from '../component/Loader';
import Colors from '../../config/Colors';
import { getShadow } from '../../config/Styles';
import CText from '../component/CText';
import Hr from '../component/Hr';
import BtnRound from '../component/BtnRound';

class ProductDetail extends Component {
  // eslint-disable-next-line react/sort-comp
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      isLoading: true,
      selectedOptions: [],
      selectedVariant: null,
    };
  }

  componentDidMount = () => {
    this.setData();
  }

  setData = async () => {
    this.setState({ isLoading: true });
    const productId = this.props.navigation.getParam("id");
    const product = await this.props.fetchSingleProduct(productId);
    console.log(product);
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
  
  render() {
    return (
      <Container>
        {/* Header */}
        <Header
          title={this.state.product.title || "Detail"}
          requireBackButton={true}
          onBackButtonPress={() => this.props.navigation.goBack()}
          noShadow
          transparent
        />

        {
          this.state.isLoading ? (
            <Loader />
          ) : (
            <Content 
              padder
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
                <BtnRound
                  icon="heart"
                  iconSize={30}
                  size={50}
                  style={styles.btnWishlist}
                />
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

            )
          }
      
        <Button dark block style={styles.btnAddToCart} iconLeft>
          <Icon name="cart-plus" type="FontAwesome5" />
          <Text>ADD TO CART</Text>
        </Button>

      </Container>
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

const mapDispatchToProps = (dispatch) => ({
  fetchSingleProduct: (productId) => dispatch(fetchSingleProduct(productId))
});

export default connect(null, mapDispatchToProps)(ProductDetail);
