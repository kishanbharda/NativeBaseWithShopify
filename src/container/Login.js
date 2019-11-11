import React, { Component } from 'react';
import { Formik } from 'formik';
import CText from '../component/CText';
import { loginValidationScheme } from '../util/yupValidationSchema';
import CButton from '../component/CButton';
import SafeScrollView from '../component/SafeScrollView';
import { Form, FormField } from '../component/FormikForm';
import FormFieldError from '../component/FormFieldError';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <SafeScrollView>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => { console.log(values) }}
          validationSchema={loginValidationScheme}
          render={({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <Form>
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

              <CButton onPress={handleSubmit} disable={!isValid}>
                SIGN IN
              </CButton>
            </Form>
          )}
        />
      </SafeScrollView>
    );
  }
}

export default Login;
