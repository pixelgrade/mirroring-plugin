import React from 'react';

export default class StartGame extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			users: null
		}

		this.startGame = this.startGame.bind(this)
	}

	render() {
		return <div>
			<h3>
				Hello, {mgame.name}!
				<img draggable='false' className="emoji" alt="👋" src="https://s.w.org/images/core/emoji/2.3/svg/1f44b.svg" />
			</h3>
			<a className="c-btn  c-btn--primary  c-btn--invert  c-btn--shadowed" href="#" onClick={this.startGame}>Start Game</a>
		</div>
	}

	startGame (ev){
		ev.preventDefault();
		console.log('ok, let\'s start');

		jQuery.post(useronlineL10n.ajax_url, data, function(response) {

			console.log(response);
		});
	}
}