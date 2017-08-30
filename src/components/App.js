import React from 'react';

import Header from './Header';
import Footer from './Footer';
import UsersOnline from './UsersOnline';
import DevicePreview from './DevicePreview';
import StartGame from './StartGame';

export default class App extends React.Component {

	gn: null;

	constructor(props) {
		super(props)

		this.state = {
			game: {
				status: 'waiting'
			},
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
			do: null,
			x: "0",
			y: null,
			z: null,
			rotation: null,
			landscape: false
		}

		this.gn = new GyroNorm();

		// this.handleAcceleration = this.handleAcceleration.bind(this)
		// this.handleOrientation = this.handleOrientation.bind(this)
	}

	render() {

		return <div id="app" className="entry-content">
			<Header/>
			<DevicePreview dm={this.state.dm} do={this.state.do}/>
			<UsersOnline/>
			<Footer/>
		</div>
	}

	componentDidMount() {

		var args = {
			frequency: 500,					// ( How often the object sends the values - milliseconds )
			gravityNormalized: true,			// ( If the gravity related values to be normalized )
			orientationBase: GyroNorm.GAME,		// ( Can be GyroNorm.GAME or GyroNorm.WORLD. gn.GAME returns orientation values with respect to the head direction of the device. gn.WORLD returns the orientation values with respect to the actual north direction of the world. )
			decimalCount: 2,					// ( How many digits after the decimal point will there be in the return values )
			logger: null,					// ( Function to be called to log messages from gyronorm.js )
			screenAdjusted: false			// ( If set to true it will return screen adjusted values. )
		};

		var comp = this;


		comp.gn.init(args).then(function () {
			comp.gn.start(function (data) {
				// console.log(data)
				comp.setState({
					dm: data.dm,
					do: data.do
				})
			})
		});

		// this.handleOrientation()
		// window.addEventListener('devicemotion', this.handleAcceleration)
		// window.addEventListener('orientationchange', this.handleOrientation)
	}

	componentWillUnmount() {
		this.gn.stopLogging();

		// window.removeEventListener('devicemotion', this.handleAcceleration)
		// window.removeEventListener('orientationchange', this.handleOrientation)
	}


	handleOrientation(event) {
		const {orientation} = window
		this.setState({landscape: orientation === 90 || orientation === -90})
	}

	handleAcceleration(event) {
		const {landscape} = this.state
		const {useGravity, multiplier} = this.props
		const acceleration = useGravity ? event.accelerationIncludingGravity : event.acceleration
		const rotation = event.rotationRate || null
		const {x, y, z} = acceleration

		this.setState({
			rotation,
			x: (landscape ? y : x) * 3,
			y: (landscape ? x : y) * 3,
			z: z * 3
		})
	}

}

