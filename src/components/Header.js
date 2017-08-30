import React from 'react';

export default class Header extends React.Component {
	render() {
		return 	<div className="header">
			<div className="logo">
				<img src="https://pixelgrade.com/wp-content/uploads/2017/08/m-logo.png" />
			</div>
			<p className="description">Device Mirroring Game</p>
		</div>
	}
}