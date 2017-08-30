import React from 'react';

export default class StartGame extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			users: null
		}
	}

	render() {

		return <a className="btn" href="#">Start Game</a>
	}

	componentWillMount() {

	}
}