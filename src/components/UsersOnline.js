import React from 'react';

export default class UsersOnline extends React.Component {

	html: null

	render() {
		return <div dangerouslySetInnerHTML={{__html: this.html}}>
		</div>
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
			console.log(response)

			comp.html = response

			comp.forceUpdate()

			// jQuery('#useronline-' + mode).html(response);
		});
	}
}