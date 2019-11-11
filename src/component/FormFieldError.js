import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CText from './CText';

const FormFieldError = (props) => (
  <View style={{
    marginLeft: 10,
    marginTop: -5
  }}>
    <CText color="red" size={props.textSize}>{props.error}</CText>
  </View>
)

FormFieldError.propTypes = {
  error: PropTypes.string,
  textSize: PropTypes.number
}

FormFieldError.defaultProps = {
  error: "",
  textSize: 14
}

export default FormFieldError
