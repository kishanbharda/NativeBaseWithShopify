import React from 'react';
import { Header, Left, Right, Button, Body, Title, Icon, Badge, Text } from 'native-base';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

const CommonHeader = (props) => {
  return (
    <Header hasTabs={props.hasTabs}>
      {
        props.requireBackButton ? (
          <Left>
            <Button transparent onPress={props.onBackButtonPress}>
              <Icon type="Ionicons" name="arrow-back" />
              {/* <Text>Back</Text> */}
            </Button>
          </Left>
        ) : (
          <Left>
            <Button transparent onPress={props.onMenuPress}>
              <Icon type="Ionicons" name="menu" />
            </Button>
          </Left>
        )
      }
     
      <Body>
        <Title>{props.title}</Title>
      </Body>
      <Right>
        <Button transparent onPress={props.onWishlistPress}>
          <Icon name="heart" active={false} />
        </Button>
        <Button transparent onPress={props.onCartPress}>
          <Icon name="cart" active={false} />
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
  badge: PropTypes.number
}

CommonHeader.defaultProps = {
  requireBackButton: false,
  onBackButtonPress: null,
  onMenuPress: null,
  title: "Native Base",
  onWishlistPress: null,
  onCartPress: null,
  badge: 0
}

export default CommonHeader
