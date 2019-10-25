import React, { Component } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { Container, Content, Text, Card, CardItem, Title, Segment, Button, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productsAction';
import collections from '../data/collections';

const Temp = () => {
  return (
    <FlatList
      data={collections}
      extraData={collections}
      numColumns={2}
      keyExtractor={item => item.title}
      renderItem={({item, index}) => (
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
      )}
    />
  )
}

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    this.props.fetchProducts();
  }

  render() {
    return (
      <Container>
        {/* <Header hasTabs /> */}
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="Men">
            {
              <FlatList
                data={this.props.products.data}
                extraData={this.props.products.data}
                numColumns={2}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                  <Card style={Styles.category} key={index.toString()}>
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
                )}
              />
            }
          </Tab>
          <Tab heading="Women">
            <Temp />
          </Tab>
          <Tab heading="Kids">
            <Temp />
          </Tab>
          <Tab heading="New Arrivals">
            <Temp />
          </Tab>
          <Tab heading="Best Selling">
            <Temp />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const Styles = StyleSheet.create({
  category: {
    flex: 0.5,
    // width: (Dimensions.get('screen').width / 2) - 20,
    overflow: 'hidden',
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => ({
  products: state.productsReducer
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
