import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Card, CardItem, Title, Text } from 'native-base';
import PropTypes from 'prop-types';
import Colors from '../../config/Colors';
import { getShadow } from '../../config/Styles';

const BORDER_RADIUS = 10;

const ProductItem = ({product, style = {}}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, {...style}]}
      activeOpacity={0.8}
    >
        <Image 
          source={{uri: product.images[0].src}}
          style={styles.image}
        /> 
        <View style={styles.detailContainer}>
          <View style={{flex: 1}}>
            <Text>{product.title}</Text>
          </View>
          <View>
            <Text>{product.variants[0]?.price}</Text>
          </View>
        </View>
    </TouchableOpacity>
  )
}

ProductItem.propTypes = {
  product: PropTypes.instanceOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/require-default-props
  style: PropTypes.instanceOf(PropTypes.object)
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
    ...getShadow({ color: "#aaaaaa", height: 0, width: 0, radius: 4 })
  },
  image: {
    width: '100%', 
    height: 200, 
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS
  },
  detailContainer: {
    padding: 5,
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'row'
  }
});

export default ProductItem
