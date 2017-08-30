import React from 'react';
import Header from './Header';

export default class Intro extends React.Component {
	render() {
		return <div className="entry-content screen-welcome">
			<Header />
			<div className="content">
				<a href={mgame.login_link} className="c-btn  c-btn--primary  c-btn--invert  c-btn--shadowed  c-btn--facebook" >Sign Up with Facebook</a>
			</div>
			<div className="footer">
				<p>Start playing with your friends by signing up above.</p>
			</div>
		</div>
	}
}
