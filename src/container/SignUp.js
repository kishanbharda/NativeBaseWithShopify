import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Button, Title } from 'native-base';

class SignUp extends Component {
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
              <Label>First Name</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Last Name</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Phone Number</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry />
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Password</Label>
              <Input secureTextEntry />
            </Item>

            <Button block style={{margin: 10}}>
              <Title style={{color: "#ffffff"}}>SING UP</Title>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
