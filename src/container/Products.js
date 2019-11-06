import React, { Component } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { Container, Content, Text, Card, CardItem, Title, Button, Tab, Tabs, ScrollableTab } from 'native-base';
import { connect } from 'react-redux';
import { fetchAllCollectionWithProducts } from '../actions/productsAction';
import ListLoader from '../component/ListLoader';
import ListEmpty from '../component/ListEmpty';
import Messages from '../../config/Messages';
import ProductItem from '../component/ProductItem';
import Colors from '../../config/Colors';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      initialPage: 0,
      isLoading: false
    };
  }

  componentDidMount = () => {
    const index = this.props.navigation.dangerouslyGetParent().getParam('collectionId');
    this.setState({ initialPage: index })
    this.fetchCollections();
  }

  fetchCollections = async () => {
    this.setState({ isLoading: true });
    const collections = await this.props.fetchAllCollectionWithProducts();
    this.setState({ collections, isLoading: false }, () => {
      // const index = this.props.navigation.dangerouslyGetParent().getParam('collectionId');
      // if (index) {
      //   // const collectionToDisplay = this.state.collections.find((ele) => ele.id === parentCollection);
      //   this.setState({
      //     initialPage: index,
      //     isLoading: false
      //   });
      // } else {
      //   this.setState({ isLoading: false });
      // }
    });
  }

  renderEmptyList = () => {
    if (this.state.isLoading) {
      return <ListLoader />
    }
    return (
      <ListEmpty message={Messages.products.emptyProducts} />
    )
  }

  renderProducts = ({item}) => {
    return (
      <ProductItem 
        key={item.id}
        product={item} 
        onPress={() => {
          this.props.navigation.navigate("ProductDetail", {
            id: item.id
          })
        }} 
      />
    )
  }

  render() {
    return (
      <Container>
        {/* <Header hasTabs /> */}
        {
          this.state.collections.length === 0 ? (
            <Tabs renderTabBar={() => <ScrollableTab />} initialPage={this.state.initialPage} page={this.state.initialPage}>
              {
                this.props.collections.data.map((item) => (
                  <Tab heading={item.title} key={item.id}>
                    <ListLoader />
                  </Tab>
                ))
              }
            </Tabs>
          ) : (
            <Tabs renderTabBar={() => <ScrollableTab />} initialPage={this.state.initialPage} page={this.state.initialPage}>
              {
                this.state.collections.map((collection) => (
                  <Tab 
                    heading={collection.title} 
                    key={collection.id}
                  >
                    <FlatList
                      data={collection.products}
                      style={{flex: 1, backgroundColor: "#ffffff"}}
                      contentContainerStyle={{flexGrow: 1, paddingBottom: 50, paddingHorizontal: 5, paddingTop: 5, backgroundColor: "#ffffff" }}
                      extraData={collection.products}
                      numColumns={2}
                      keyExtractor={productItem => productItem.id}
                      renderItem={this.renderProducts}
                      ListEmptyComponent={this.renderEmptyList}
                    />
                  </Tab>
                ))
              }
            </Tabs>
          )
        }
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productsReducer,
  collections: state.collectionsReducer
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllCollectionWithProducts: () => dispatch(fetchAllCollectionWithProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
