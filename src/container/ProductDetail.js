import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../actions/productsAction';
import Header from '../component/Header';
import Loader from '../component/Loader';
import Colors from '../../config/Colors';
import { getShadow } from '../../config/Styles';

class ProductDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <Header
        title="Detail"
        requireBackButton={true}
        onBackButtonPress={() => navigation.goBack()}
      />
    }
  }
  
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      isLoading: true
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
      console.log(this.state.product.images);
      this.setState({ isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Loader loading={this.state.isLoading} />
      )
    }
    return (
      <ScrollView style={styles.container}>
        {/* <Swiper
          style={styles.swiper}
          autoplay={false}
          showsPagination={false}
          activeDotColor={Colors.primary}
        >
          {
            this.state.product.images.map((image) => (
              <TouchableOpacity
                style={styles.imageContainer}
                key={image.id}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: image.src }}
                  style={styles.image}
                />
              </TouchableOpacity>
            ))
          }
        </Swiper> */}

          <Carousel
            ref={(c) => { this.carousel = c; }}
            data={this.state.product.images}
            containerCustomStyle={{
              backgroundColor: "#ffffff",
              padding: 20,
              alignSelf: 'center'
            }}
            activeSlideAlignment="center"
            contentContainerCustomStyle={{
              alignItems: 'center',
              justifyContent: 'center'
            }}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.imageContainer}
                key={item.id}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: item.src }}
                  style={styles.image}
                />
              </TouchableOpacity>
            )}
            inactiveSlideScale={0.9}
            inactiveSlideOpacity={0.6}
            firstItem={0}
            sliderWidth={Dimensions.get('screen').width}
            itemWidth={Dimensions.get('screen').width - 100}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  swiper: {
    height: 450,
  },
  imageContainer: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 400,
    width: Dimensions.get('screen').width - 100,
    ...getShadow({ color: "#aaaaaa", height: 0, width: 0, radius: 5, opacity: 0.5 })
  },  
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 5
  },
});

const mapDispatchToProps = (dispatch) => ({
  fetchSingleProduct: (productId) => dispatch(fetchSingleProduct(productId))
});

export default connect(null, mapDispatchToProps)(ProductDetail);
