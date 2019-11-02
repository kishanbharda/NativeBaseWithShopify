import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Colors from '../../config/Colors';

const ListLoader = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" animating={true} color={Colors.primary} />
    </View>
  )
}

export default ListLoader
