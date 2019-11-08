import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import PropTypes from 'prop-types';
import { getShadow } from '../../config/Styles';
import Colors from '../../config/Colors';

class FormInput extends React.PureComponent {

  focus = () => { this.textInputField.focus(); }

  render() {
    const {props} = this;
    return (
      <View 
        style={[
          {
            flexDirection: 'row',
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginVertical: 10,
            height: 50,
            backgroundColor: "#ffffff",
            backfaceVisibility: 'hidden',
            borderRadius: 50,
            alignItems: 'center',
            ...getShadow()
          },
          props.containerStyle
        ]}
      >
        {
          props.icon && (
            <Icon 
              name={props.icon}
              solid={props.solid}
              color={props.iconColor}
              size={props.iconSize}
              style={{ width: 40, textAlign: 'center', color: props.iconColor }}
            />
          )
        }
        <TextInput
          ref={(ref) => { this.textInputField = ref }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...this.props}
          placeholder={props.placeholder}
          testID={props.placeholder}
          style={[
            {
              flex: 1,
              paddingHorizontal: 10,
              paddingVertical: 5,
              fontSize: 18,
              color: Colors.primary,
              borderLeftWidth: 0.5,
              borderLeftColor: "#dddddd",
            },
            props.textInputStyle
          ]}
        />  
      </View>
    )
  }
}

FormInput.propTypes = {
  containerStyle: PropTypes.instanceOf(PropTypes.any),
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  solid: PropTypes.bool,
  placeholder: PropTypes.string,
  textInputStyle: PropTypes.instanceOf(PropTypes.any),
}

FormInput.defaultProps = {
  containerStyle: null,
  icon: "",
  iconColor: Colors.primary,
  iconSize: 24,
  solid: false,
  placeholder: "",
  textInputStyle: null
}

export default FormInput

