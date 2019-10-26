import React, { Component } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { Container, Content, Text, Card, CardItem, Title, Button, Tab, Tabs, ScrollableTab } from 'native-base';
import { connect } from 'react-redux';
import { fetchAllCollectionWithProducts } from '../actions/productsAction';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      initialPage: 0
    };
  }

  componentDidMount = () => {
    this.fetchCollections();
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.initialPage !== prevState.initialPage) {
  //     return { initialPage: nextProps.someValue};
  //   }
  //   return null;
  // }

  fetchCollections = async () => {
    const collections = await this.props.fetchAllCollectionWithProducts();
    this.setState({ collections }, () => {
      const parentCollection = this.props.navigation.dangerouslyGetParent().getParam('collectionId');
      // const parentCollection = this.props.navigation.getParam("collectionId");
      console.log(parentCollection);
      if (parentCollection) {
        const collectionToDisplay = this.state.collections.find((ele) => ele.id === parentCollection);
        this.setState({
          initialPage: this.state.collections.indexOf(collectionToDisplay)
        });
      }
    });
  }

  renderProducts = ({item}) => {
    return (
      <Card style={Styles.category}>
        <CardItem>
          <Image 
            source={{uri: item.images[0].src}}
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
        {/* <Header hasTabs /> */}
        <Tabs renderTabBar={() => <ScrollableTab />} initialPage={this.state.initialPage} page={this.state.initialPage}>
          {
            this.state.collections.map((collection) => (
              <Tab heading={collection.title}>
                <FlatList
                  data={collection.products}
                  extraData={collection.products}
                  numColumns={2}
                  keyExtractor={productItem => productItem.id}
                  renderItem={this.renderProducts}
                />
              </Tab>
            ))
          }
        </Tabs>
      </Container>
    );
  }
}

const Styles = StyleSheet.create({
  category: {
    flex: 0.5,
    overflow: 'hidden',
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => ({
  products: state.productsReducer
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllCollectionWithProducts: () => dispatch(fetchAllCollectionWithProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
