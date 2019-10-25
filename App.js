import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { YellowBox } from 'react-native';
import configureStore from './src/store/configureStore';
import Router from './Router';

YellowBox.ignoreWarnings([
	'Warning: componentWillMount is deprecated',
	'Warning: componentWillUpdate is deprecated',
	'Warning: componentWillReceiveProps is deprecated'
]);

const store = configureStore();
console.disableYellowBox = true;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		)
	}
}

export default App;
