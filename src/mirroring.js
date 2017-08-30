import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import Intro from 'components/Intro';

function runapp() {
	if ( typeof mgame.name === 'undefined' ) {
		ReactDOM.render( <Intro />, document.getElementById( 'notloggedin' ) );
	} else {
		ReactDOM.render( <App />, document.getElementById( 'mirroring' ) );
	}
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
	run();
} else {
	window.addEventListener('DOMContentLoaded', runapp, false);
}