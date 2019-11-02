import React from 'react';
import { Header, Left, Right, Button, Body, Title, Icon, Badge, Text } from 'native-base';

const HeaderRight = (props) => {
  return (
    <Right>
      <Button transparent>
        <Icon name="heart" active={false} />
      </Button>
      <Button transparent>
        <Icon name="cart" active={false} />
        <Badge style={{ position: 'absolute', right: 0, height: 25, width: 25, padding: 0}}>
          <Text style={{fontSize: 12, fontWeight: "bold"}}>2</Text>
        </Badge>
      </Button>
    </Right>
  )
}

export default HeaderRight
