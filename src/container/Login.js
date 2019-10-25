import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Title } from 'native-base';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>

            <Button block style={{margin: 10}}>
              <Title style={{color: "#ffffff"}}>SING IN</Title>
            </Button>
            
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Login;
