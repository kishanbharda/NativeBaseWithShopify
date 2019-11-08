import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { compose } from "recompose";
import { Formik } from 'formik';
import { handleTextInput, withNextInputAutoFocusForm, withNextInputAutoFocusInput } from "react-native-formik";
import FormInput from '../component/FormInput';
import Colors from '../../config/Colors';
import CText from '../component/CText';
import { signUpValidationSchema } from '../util/yupValidationSchema';
import CButton from '../component/CButton';

const FormInput2 = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(FormInput);
const Form = withNextInputAutoFocusForm(View);

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="interactive"
      >
        {/* <View style={styles.fillContainer} /> */}
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' }}
          onSubmit={values => { }}
          validationSchema={signUpValidationSchema}
          render={({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <Form>
              <FormInput2
                icon="user"
                placeholder="First Name"
                value={values.firstName}
                label="First Name" 
                name="firstName" 
                type="name"
                onChangeText={handleChange('firstName')}
                onBlur={() => setFieldTouched('firstName')}
              />
              {touched.firstName && errors.firstName && (
                <CText style={{ fontSize: 10, color: 'red' }}>{errors.firstName}</CText>
              )}

              <FormInput2
                label="Last Name" 
                name="lastName" 
                type="name"
                icon="user"
                placeholder="Last Name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={() => setFieldTouched('lastName')}
              />
              {touched.lastName && errors.lastName && (
                <CText style={{ fontSize: 10, color: 'red' }}>{errors.lastName}</CText>
              )}

              <FormInput2
                label="Email" 
                name="email" 
                type="email"
                icon="envelope"
                placeholder="E-Mail"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />
              {touched.email && errors.email && (
                <CText style={{ fontSize: 10, color: 'red' }}>{errors.email}</CText>
              )}

              <FormInput2
                label="Phone" 
                name="phone" 
                type="digit"
                icon="mobile-alt"
                placeholder="Phone"
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={() => setFieldTouched('phone')}
              />
              {touched.phone && errors.phone && (
                <CText style={{ fontSize: 10, color: 'red' }}>{errors.phone}</CText>
              )}

              <FormInput2
                label="Password" 
                name="password" 
                type="password"
                icon="key"
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
              />
              {touched.password && errors.password && (
                <CText style={{ fontSize: 10, color: 'red' }}>{errors.password}</CText>
              )}

              <FormInput2
                label="Confirm Password" 
                name="confirmPassword" 
                type="password"
                icon="key"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <CText style={{ fontSize: 10, color: 'red' }}>{errors.confirmPassword}</CText>
              )}

              <CButton onPress={handleSubmit} disable={!isValid}>
                SIGN UP
              </CButton>
            </Form>
          )}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20
  },
  contentContainer: {
    flex: 1,
  },
  fillContainer: {
    flex: 1
  },
  image: {
    alignSelf: "center",
    resizeMode: "contain"
  }
});

export default SignUp;
