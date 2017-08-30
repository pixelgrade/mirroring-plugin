import React from 'react';

import Header from './Header';
import Footer from './Footer';
import UsersOnline from './UsersOnline';
import DevicePreview from './DevicePreview';

export default class App extends React.Component {

    gn: null;

	constructor (props) {
	    super(props)

	    this.state = {
	      dm: {
	     	alpha: 3,
	     	beta: 3,
	     	gamma: 3,
	     	gx: 3,
	     	gy: 3,
	     	gz: 3,
	     	x: 3,
	     	y: 3,
	     	z: 3
	      },
	      do: {
	      	alpha: 25,
	      	beta: 15,
	      	gamma: 15,
	      	absolute: 5
	      },
	      x: "0",
	      y: null,
	      z: null,
	      rotation: null,
	      landscape: false
	    }

	    this.gn = new GyroNorm();
	 }

	render() {

		// console.log(this.state);

		return <div id="app" className="entry-content">
			<Header />
			<DevicePreview dm={this.state.dm} do={this.state.do}/>
			<Footer />
			</div>
	}

	componentDidMount () {

		var args = {
			frequency:50,					// ( How often the object sends the values - milliseconds )
			gravityNormalized:true,			// ( If the gravity related values to be normalized )
			orientationBase:GyroNorm.WORLD,		// ( Can be GyroNorm.GAME or GyroNorm.WORLD. gn.GAME returns orientation values with respect to the head direction of the device. gn.WORLD returns the orientation values with respect to the actual north direction of the world. )
			decimalCount:2,					// ( How many digits after the decimal point will there be in the return values )
			logger:null,					// ( Function to be called to log messages from gyronorm.js )
			screenAdjusted:false			// ( If set to true it will return screen adjusted values. )
		};

		var comp = this;
		

		comp.gn.init(args).then(function(){ 
			comp.gn.start(function(data){
				// console.log(data)
				comp.setState({
					do: data.do,
					dm: data.dm
				})
			})
		});
	}

	componentWillUnmount () {
		this.gn.stopLogging();
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
	      x: (landscape ? y : x) * 3,
	      y: (landscape ? x : y) * 3,
	      z: z * 3
	    })
	}

}

