import ReactDOM from 'react-dom';
import React from 'react';

import Masonry from 'react-masonry-component';

import './AboutMe.css';


var AboutMe = React.createClass({

	render() {
		return	<div className="me_back">
					<div className="me_card">
						<img />
						<h1>Ильин Егор</h1>
						<h2>Web-Apps, React, React Native, JavaScript, C++11, Hardware Designer <span>@ Novosibirsk, RU</span></h2>
						<h2>
							<a href="iilinegor@gmail.com" id="first">iilinegor@gmail.com</a> 
								*
							<a href="https://github.com/iilinegor">github</a> 
								*
							<a href="https://twitter.com/iilinegor">twitter</a> 
								*
							<a href="https://habrahabr.ru/users/iilinegor/">habr</a>
						</h2>
					</div>

					<div className="me_works">
						<h1>Работы</h1>
						<Work />
						<Work />
						<Work />
						<Work />
						<Work />
					</div>
				</div>
	}
});

export default AboutMe;

var Work = React.createClass({

	render() {
		return	<div className="me_card">
						<img />
						<h1>Ильин Егор</h1>
						<h2>Web-Apps, React, React Native, JavaScript, C++11, Hardware Designer <span>@ Novosibirsk, RU</span></h2>
						<h2>
							<a href="iilinegor@gmail.com" id="first">iilinegor@gmail.com</a> 
								*
							<a href="https://github.com/iilinegor">github</a> 
								*
							<a href="https://twitter.com/iilinegor">twitter</a> 
								*
							<a href="https://habrahabr.ru/users/iilinegor/">habr</a>
						</h2>
					</div>
	}
});