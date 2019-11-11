import { View } from 'react-native';
import { compose } from "recompose";
import { handleTextInput, withNextInputAutoFocusForm, withNextInputAutoFocusInput } from "react-native-formik";
import FormInput from './FormInput';

export const FormField = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(FormInput);

export const Form = withNextInputAutoFocusForm(View)
