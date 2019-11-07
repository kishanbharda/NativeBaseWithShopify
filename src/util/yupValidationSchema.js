import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const signUpValidationSchema = yup.object().shape({
  firstName: yup
    .string(),
  lastName: yup
    .string(),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Email is require"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Please enter valid phone"),
  password: yup
    .string()
    .min(6, "Password should be min 6 character")
    .required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required')
});

export const loginValidationScheme = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be min 6 character")
    .required("Password is required"),
});
