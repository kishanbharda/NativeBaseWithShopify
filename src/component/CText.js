import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const CText = (props) => {
  return (
    <Text 
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}  
      style={{
        color: props.color,
        fontSize: props.size,
        fontWeight: props.bold ? 'bold' : 'normal',
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  )
}

CText.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  bold: PropTypes.bool,
  style: PropTypes.instanceOf(PropTypes.any),
}

CText.defaultProps = {
  color: "#555555",
  size: 16,
  bold: false,
  style: null
}

export default CText
