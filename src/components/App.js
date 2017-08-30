import React from 'react';

import Header from './Header';
import UsersOnline from './UsersOnline';
import DevicePreview from './DevicePreview';

export default class App extends React.Component {
	render() {

		return <div id="app">
			<Header />
			<UsersOnline/>
			</div>
	}
}