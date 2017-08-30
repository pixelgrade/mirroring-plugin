import React from 'react';

export default class UsersOnline extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			users: null
		}

		this.get_data = this.get_data.bind(this)
	}

	render() {
		if ( this.state.users !== null ) {
			return <div>
				<ul>
					{Object.values(this.state.users).map(function (user) {
						return <li data-userid={user.user_id} key={user.user_id} >
							{user.user_name}
						</li>
					})}
				</ul>
			</div>
		}

		return <div>No one</div>
	}

	componentWillMount() {
		var comp = this;
		var timeout = parseInt(useronlineL10n.timeout);

		comp.get_data('json');

		setInterval( function() { comp.get_data('json'); }, timeout );
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
			comp.setState({
				users: JSON.parse(response)
			})
		});
	}
}