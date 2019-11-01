import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const ListEmpty = (props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={[{
        fontSize: 24,
        textAlign: 'center',
        color: "#bdbdbd"
      }, {
        ...props.textStyle
      }
      ]}>
        {props.message}
      </Text>
    </View>
  )
}

ListEmpty.propTypes = {
  message: PropTypes.string.isRequired,
  textStyle: PropTypes.objectOf(PropTypes.object).isRequired
};

export default ListEmpty
