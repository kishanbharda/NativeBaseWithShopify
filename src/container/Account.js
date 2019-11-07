import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Tabs, Tab, ScrollableTab } from 'native-base';
import Login from './Login';
import SignUp from './SignUp';
import Header from '../component/Header';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="Login">
            <Login />
          </Tab>
          <Tab heading="SignUp">
            <SignUp />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Account;
