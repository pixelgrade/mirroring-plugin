import React from 'react';

import Header from './Header';
import UsersOnline from './UsersOnline';
import DevicePreview from './DevicePreview';

export default class App extends React.Component {

	constructor (props) {
	    super(props)

	    this.state = {
	      x: "0",
	      y: null,
	      z: null,
	      rotation: null,
	      landscape: false
	    }

	    this.handleAcceleration = this.handleAcceleration.bind(this)
	    this.handleOrientation = this.handleOrientation.bind(this)
	 }

	render() {

		console.log(this.state);

		return <div id="app">
			<Header />
			<DevicePreview device_data={this.state}/>
			</div>
	}

	componentDidMount () {
	    this.handleOrientation()
	    window.addEventListener('devicemotion', this.handleAcceleration)
	    window.addEventListener('orientationchange', this.handleOrientation)
	}

	componentWillUnmount () {
	    window.removeEventListener('devicemotion', this.handleAcceleration)
	    window.removeEventListener('orientationchange', this.handleOrientation)
	}


	handleOrientation (event) {
	    const { orientation } = window
	    this.setState({ landscape: orientation === 90 || orientation === -90 })
	}

	handleAcceleration (event) {
	    const { landscape } = this.state
	    const { useGravity, multiplier } = this.props
	    const acceleration = useGravity ? event.accelerationIncludingGravity : event.acceleration
	    const rotation = event.rotationRate || null
	    const { x, y, z } = acceleration

	    this.setState({
	      rotation,
	      x: (landscape ? y : x) * multiplier,
	      y: (landscape ? x : y) * multiplier,
	      z: z * multiplier
	    })
	}

}

