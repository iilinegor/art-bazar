import ReactDOM from 'react-dom';
import React from 'react';

import MARKET from './db.js';
import USERS from './users.js';


import './Login.css';

var Login = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

	    getInitialState: function() {
	    	return {
	    		isKnown: -1,
	    		userId: -1
	    	};
	    },

	    handleLogIn: function(event) {
	    	var currentPass = event.target.value;
	    	var { userId } = this.state;
	    	console.log(currentPass);
	    	console.log(USERS[userId].password);
	    	if ( currentPass === USERS[userId].password ){
	    		localStorage.setItem('userId', this.state.userId); 
	    		this.context.router.push(`/all`);
	    	}
	    },

	    handlePassCheck: function(event) {
	    	if (event.target.value === document.getElementById("firstPassword").value)
	    		console.log("correct");
	    },

	    handleCheck: function(event){
	    	var searchQuery = event.target.value.toLowerCase();

			console.log(searchQuery);

			let isKnown = false;
			let userId;
			let domens = [".ru", ".kz", ".com", ".org"];
			
			var isEmail = function(Query) {
				if (Query.indexOf("@") !== -1) {
					for (let dom of domens) {
						if (Query.indexOf(dom) !== -1) {
							return true;
						};
					};
				};
				return false;
			 };

			 var inBase = function (email) {
			 	for (let user of USERS)
					if (email === user.email){
						userId = user.id;
						return true;
					}
				return false;
			 };


			if (isEmail(searchQuery)) {
				if (inBase(searchQuery)){
					isKnown = 1;
				}
				else
					isKnown = 0;
			}
			else 
				isKnown = -1;

			this.setState({ isKnown: isKnown, userId: userId });
			console.log(isKnown);


	    },

		render: function() {
			var { isKnown, userId} = this.state;
			if (isKnown === 1) 
				var userName = USERS[userId].name;

			switch ( this.state.isKnown ) {
				case -1:
					return (
							<div className="auth">
								<p className="first">Введите email</p>
								<input type="text" onChange={this.handleCheck} />
								
							</div>
						);

				case 0:
					return (
							<div className="auth">
								<p className="first">Кажется, мы не знакомы</p>
								<input type="text" onChange={this.handleCheck} />
								<p>Как Вас зовут?</p>
								<input type="text" />
								<p>Придумайте пароль</p>
								<input type="password" id="firstPassword"/>
								<p>Закрепим </p>
								<input type="password" onChange={this.handlePassCheck} />				

							</div>
						);

				case 1:
					return (
							<div className="auth">
								<p className="first">Здравствуйте, {userName}!</p>
								<input type="text" onChange={this.handleCheck} />
								<p>Введите пароль</p>
								<input type="password" onChange={this.handleLogIn} />
							</div>
						);
			};	
		}
});

export default Login;