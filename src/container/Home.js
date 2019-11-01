import React, { Component } from 'react';
import { StyleSheet, Dimensions, ImageBackground, View, Image, FlatList } from 'react-native';
import { Container, Content, Footer, Left, Icon, Body, Button, Title, FooterTab, Text, Right, Card, CardItem } from 'native-base';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { fetchCollections } from '../actions/collectionsActions';
import banner from '../data/banner';
import collection from '../data/collections';
import Colors from '../../config/Colors';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: []
    };
  }

  componentDidMount = async () => {
    const collections = await this.props.fetchCollections();
    this.setState({ collections });
  }

  renderBanner = ({item, index}) => {
    return (
      <ImageBackground
        source={item.image}
        style={Styles.bannerContainer}
        key={index.toString()}
      >
        <View style={{padding: 10, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: 'center', flex: 1}}>
          <Title style={{ color: "#ffffff"}}>{item.title}</Title>
          <Text style={{ color: "#ffffff"}}>{item.description}</Text>
        </View>
      </ImageBackground>
    )
  }  

  navigateToProducts = (collectionId) => {
    this.props.navigation.navigate("Products", {
      collectionId
    });
  }
  
  renderCategories = ({item}) => {
    return (
      <Card style={Styles.category}>
        <CardItem button onPress={() => this.navigateToProducts(item.id)}>
          <Image 
            source={{uri: item.image?.src}}
            style={{width: '100%', height: 200}}
          />  
        </CardItem>
        <CardItem button onPress={() => this.navigateToProducts(item.id)}>
          <Title style={{color: "#000000"}}>{item.title}</Title>
        </CardItem>
      </Card>
    )
  }

  renderBestSelling = ({item, index}) => {
    return (
      <Card style={Styles.category} key={index.toString()}>
        <CardItem>
          <Image 
            source={item.image}
            style={{width: '100%', height: 200}}
          />  
        </CardItem>
        <CardItem>
          <Title style={{color: "#000000"}}>{item.title}</Title>
        </CardItem>
      </Card>
    )
  }  


  render() {
    return (
      <Container>
        <Content contentContainerStyle={Styles.container}>
          
          {/* Banner Slider */}
          <Carousel
            ref={(c) => { this.carousel = c; }}
            data={banner}
            containerCustomStyle={{
              backgroundColor: Colors.homeBannerBg,
              padding: 10
            }}
            contentContainerCustomStyle={{
              alignItems: 'flex-start',
            }}
            renderItem={this.renderBanner}
            inactiveSlideScale={0.98}
            inactiveSlideOpacity={0.6}
            sliderHeight={300}
            firstItem={1}
            sliderWidth={Dimensions.get('screen').width}
            itemWidth={Dimensions.get('screen').width - 100}
          />

          {/* Categories */}
          <View style={{margin: 10}}>
            <FlatList
              data={this.state.collections}
              extraData={this.state}
              numColumns={2}
              keyExtractor={item => item.id}
              renderItem={this.renderCategories}
            />
          </View>

          <View style={{backgroundColor: "#000011", padding: 10}}>
            <Title style={{color: "#ffffff"}}>Our Best Selling</Title>
          </View>
          <Carousel
            ref={(c) => { this.carousel2 = c; }}
            data={collection}
            containerCustomStyle={{
              paddingBottom: 10,
              backgroundColor: "#000011"
            }}
            renderItem={this.renderBestSelling}
            inactiveSlideScale={0.9}
            inactiveSlideOpacity={0.6}
            sliderHeight={300}
            activeSlideAlignment="center"
            sliderWidth={Dimensions.get('screen').width}
            itemWidth={(Dimensions.get('screen').width / 2) - 10}
          />
        </Content>
      </Container>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
  },
  bannerContainer: {
    height: 200,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  category: {
    flex: 0.5,
    overflow: 'hidden',
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => ({
  collections: state.collectionsReducer
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollections: () => dispatch(fetchCollections())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
