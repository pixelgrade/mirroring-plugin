import React from 'react';
import PropTypes from 'prop-types';

export default class DevicePreview extends React.Component {

	positions: {
		left:0,
		right:0
	}

	propTypes: {
		VendorSpecificProp: 'value',
		// children: PropTypes.number,
		children: "10",
		multiplier: PropTypes.number,
		useGravity: PropTypes.bool,
		device_data: PropTypes.object,
		dm: PropTypes.object,
		do: PropTypes.object
	}

	static get defaultProps() {
		return {
			multiplier: 1,
			useGravity: true,
		}
	}

	render() {

		// console.log(this.props.dm.alpha);
		console.log(this.props.dm.alpha);
		// console.log(this.props.dm.gamma);

		// translate3d(
		// 						${this.props.dm.x}px, 
		// 						${this.props.dm.y}px, 
		// 						0)

		return <div className="content">
			<div className="device-preview">

				<div style={{ transform: `

								translateX(-50%) 
								translateY(-50%)


								rotateX(${this.props.do.beta}deg)
								rotateY(${this.props.do.alpha}deg)
								rotateZ(${this.props.do.gamma}deg)

								`}} 

								className="device">
					Card
				</div>
			</div>
		</div>
	}

	componentWillMount() {
		var comp = this;
		var timeout = parseInt(useronlineL10n.timeout);

		comp.get_data('json');

		setInterval( function() { comp.get_data('json'); }, timeout );


		function on_event() {
			comp.setState({

			})
		}

	}

	get_data(mode) {
		var data = {
			'action': 'useronline',
			'mode': mode,
			'page_url': location.protocol + '//' + location.host + location.pathname + location.search,
			'page_title': jQuery('title').text()
		};

		var comp = this;

		jQuery.post(useronlineL10n.ajax_url, data, function(response) {
			console.log(response)

			comp.html = response

			comp.forceUpdate()

			// jQuery('#useronline-' + mode).html(response);
		});
	}
}