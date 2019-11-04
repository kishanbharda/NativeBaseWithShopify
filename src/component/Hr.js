import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Hr = (props) => {
  return (
    <View 
      style={{
        height: props.size,
        backgroundColor: props.color,
        marginVertical: props.vMargin,
        marginHorizontal: props.hMargin,
        ...props.style
      }}  
    />
  )
}

Hr.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  vMargin: PropTypes.number,
  hMargin: PropTypes.number,
  style: PropTypes.instanceOf(PropTypes.any)
}

Hr.defaultProps = {
  size: 0.3,
  color: "#aaaaaa",
  vMargin: 10,
  hMargin: 20,
  style: null
}

export default Hr
