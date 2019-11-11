import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SafeScrollView = (props) => {
	return (
    <KeyboardAwareScrollView 
      contentContainerStyle={{padding: 10}}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
    >
			{props.children}
    </KeyboardAwareScrollView>
	)
}

export default SafeScrollView
