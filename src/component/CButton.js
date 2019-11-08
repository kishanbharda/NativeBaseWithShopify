import React from 'react';
import { TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import CText from './CText'
import Colors from '../../config/Colors';
import { getShadow } from '../../config/Styles';

const CButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: props.color,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 100,
        opacity: (props.disabled) ? 0.5 : 1,
        flexDirection: 'row',
        backfaceVisibility: 'hidden',
        ...getShadow(),
        ...props.style
      }}
      activeOpacity={0.7}
      onPress={props.onPress}
      disabled={props.disabled || props.isLoading}
    >

      {
        !props.isLoading && (
          <>
            {
              props.iconLeft && (
                <Icon name={props.iconLeft} size={props.iconLeftSize} color={props.iconLeftColor} style={{ marginHorizontal: 5 }} />
              )
            }
            <CText
              style={{ fontWeight: '500', textAlign: 'center' }}
              color={props.textColor}
              size={props.textSize}
            >
              {props.children}
            </CText>
            {
              props.iconRight && (
                <Icon name={props.iconRight} size={props.iconRightSize} color={props.iconRightColor} style={{ marginHorizontal: 5 }} />
              )
            }
          </>
        )
      }

      {
        props.isLoading && (
          <ActivityIndicator size={Platform.OS === "ios" ? (props.textSize || 18) + 4 : (props.textSize || 18) + 6.5} color={props.textColor || "#ffffff"} style={{ marginHorizontal: 5 }} />
        )
      }
    </TouchableOpacity>
  )
}

CButton.propTypes = {
  style: PropTypes.instanceOf(PropTypes.any),
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  isLoading: PropTypes.bool,
  iconLeft: PropTypes.string,
  iconLeftSize: PropTypes.number,
  iconLeftColor: PropTypes.string,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  iconRight: PropTypes.string,
  iconRightSize: PropTypes.number,
  iconRightColor: PropTypes.string,
}

CButton.defaultProps = {
  style: null,
  color: Colors.primary,
  disabled: false,
  onPress: null,
  isLoading: false,
  iconLeft: null,
  iconLeftSize: 20,
  iconLeftColor: "#ffffff",
  textColor: "#ffffff",
  textSize: 18,
  iconRight: null,
  iconRightSize: 20,
  iconRightColor: "#ffffff",
}

export default CButton
