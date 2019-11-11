import React, { Component } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import CText from '../component/CText';
import { signUpValidationSchema } from '../util/yupValidationSchema';
import CButton from '../component/CButton';
import SafeScrollView from '../component/SafeScrollView';
import { Form, FormField } from '../component/FormikForm';
import FormFieldError from '../component/FormFieldError';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <SafeScrollView>
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' }}
          onSubmit={values => { console.log(values) }}
          validationSchema={signUpValidationSchema}
          render={({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <Form>
              <FormField
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
                <FormFieldError error={errors.firstName} />
              )}

              <FormField
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
                <FormFieldError error={errors.lastName} />
              )}

              <FormField
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
                <FormFieldError error={errors.email} />
              )}

              <FormField
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
                <FormFieldError error={errors.phone} />
              )}

              <FormField
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
                <FormFieldError error={errors.password} />
              )}

              <FormField
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
                <FormFieldError error={errors.confirmPassword} />
              )}

              <CButton onPress={handleSubmit} disable={!isValid}>
                SIGN UP
              </CButton>
            </Form>
          )}
        />
      </SafeScrollView>
    );
  }
}

export default SignUp
