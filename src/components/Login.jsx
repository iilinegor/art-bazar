import ReactDOM from 'react-dom';
import React from 'react';

import USERS from './users.js';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';


import './Login.css';


	function getStateFromFlux(first) {
		if (first) var isKnown = -1;
	    return {
		        isLoading: UserStore.isLoading(),
	    		isKnown: -1,
	    		user: UserStore.inBase(-1)
			};
	};

var Login = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

	    getInitialState: function() {
		    return getStateFromFlux(true);
	    },

	    handleLogIn: function(event) {
	    	var currentPass = event.target.value;
	    	var { user } = this.state;
	    	if ( currentPass === user.password ){
	    		localStorage.setItem('userId', user.id); 
	    		this.context.router.push(`/all`, 1000);
	    	};
	    },

	    handlePassCheck: function(event) {
	    	if (event.target.value === document.getElementById("firstPassword").value)
	    		console.log("correct");
	    },

	    handleCheck: function(event){
	    	var searchQuery = event.target.value.toLowerCase();

			console.log(searchQuery);

			let isKnown;
			let userId;
			var user;
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
		        user = UserStore.inBase(email)[0];
					if (user) {
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
				this.setState({ user : user });

			}
			else 
				isKnown = -1;

			this.setState({ isKnown: isKnown, userId: userId });
			console.log(isKnown);

	    },

	    componentDidMount: function() {
	        UserStore.addChangeListener(this._onChange);
		},

		componentWillMount() {
	        UserActions.loadUsers();
	    },

	    componentWillUnmount() {
    		UserStore.removeChangeListener(this._onChange);
	    },

		render: function() {
			var { isKnown, user } = this.state;

			switch ( isKnown ) {
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
								<p className="first">Здравствуйте, {user.name}!</p>
								<input type="text" onChange={this.handleCheck} />
								<p>Введите пароль</p>
								<input type="password" onChange={this.handleLogIn} />
							</div>
						);
			};	
		},

		_onChange() {
	        this.setState(getStateFromFlux(false));
	    }
});

export default Login;