import React from 'react';
import { Header, Left, Right, Button, Body, Title, Icon, Badge, Text } from 'native-base';
import PropTypes from 'prop-types'
import Colors from '../../config/Colors';

const CommonHeader = (props) => {
  return (
    <Header 
      hasTabs={props.hasTabs} 
      // eslint-disable-next-line react/jsx-props-no-spreading
      transparent={props.transparent}
      // style={props.style}
    >
      {
        props.requireBackButton ? (
          <Left>
            <Button transparent onPress={props.onBackButtonPress} tintColor="#ff0000">
              <Icon type="Ionicons" name="arrow-back" style={{color:(props.transparent) ? Colors.primary : "#ff0000"}} />
              {/* <Text>Back</Text> */}
            </Button>
          </Left>
        ) : (
          <Left>
            <Button transparent onPress={props.onMenuPress}>
              <Icon type="Ionicons" name="menu" style={{color:(props.transparent) ? Colors.primary : "#ff0000"}} />
            </Button>
          </Left>
        )
      }
     
      <Body>
        <Title style={{color: "#ff0000"}}>{props.title}</Title>
      </Body>
      <Right>
        <Button transparent onPress={props.onWishlistPress}>
          <Icon name="heart" active={false} style={{color:(props.transparent) ? Colors.primary : "#ff0000"}} />
        </Button>
        <Button transparent onPress={props.onCartPress} icon>
          <Icon name="cart" active={false} style={{color:(props.transparent) ? Colors.primary : "#ff0000"}} />
          {
            props.badge !== 0 && (
              <Badge style={{ position: 'absolute', right: 0, height: 25, width: 25, padding: 0}}>
                <Text style={{fontSize: 12, fontWeight: "bold"}}>{props.badge}</Text>
              </Badge>
            )
          }
        </Button>
      </Right>
    </Header>
  )
}

CommonHeader.propTypes = {
  requireBackButton: PropTypes.bool,
  onBackButtonPress: PropTypes.func,
  onMenuPress: PropTypes.func,
  title: PropTypes.string,
  onWishlistPress: PropTypes.func,
  onCartPress: PropTypes.func,
  badge: PropTypes.number,
  transparent: PropTypes.bool
}

CommonHeader.defaultProps = {
  requireBackButton: false,
  onBackButtonPress: null,
  onMenuPress: null,
  title: "Native Base",
  onWishlistPress: null,
  onCartPress: null,
  badge: 0,
  transparent: false
}

export default CommonHeader
