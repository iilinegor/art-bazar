import ReactDOM from 'react-dom';
import React from 'react';

import USERS from './users.js';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';


import './Login.css';


	function getStateFromFlux() {
	    return {
		        isLoading: UserStore.isLoading(),
			};
	};

var Login = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

	    getInitialState: function() {
		    return {
		        isLoading: UserStore.isLoading(),
	    		isKnown: -1,
	    		user: UserStore.inBase(-1)
			};
	    },

	    handleLogIn: function(event) {
	    	var currentPass = event.target.value;
	    	var { user } = this.state;
	    	if ( currentPass === user.password ){
	    		localStorage.setItem('userId', user.id); 
	    		this.context.router.push(`/all`);
	    	};
	    },

	    handlePassCheck: function(event) {
	    	if (event.target.value === document.getElementById("firstPassword").value)
	    		this.setState({ password : event.target.value });
	    },

	    handleNewName(event) {
	    	this.setState({ name : event.target.value });
	    },

	    handleSubmit() {
	    	let { name, email, password } = this.state;
	    	if (name && email && password) {
	    		const newUser = {
	    			name : name,
	    			email : email,
	    			password : password
	    		};
	    		console.info(newUser);
	    		UserActions.createUser(newUser)
	    	};
	    },

	    handleCheck: function(event){
	    	var searchQuery = event.target.value.toLowerCase();

			let isKnown;
			let userId;
			var user;
			let domens = [".ru", ".kz", ".com", ".org"];
			
			var isEmail = function(Query) {
				if (Query.indexOf("@") !== -1) {
					for (let dom of domens) {
						if (Query.indexOf(dom) !== -1) {
			 				UserActions.inBase(Query);
							return true;
						};
					};
				};
				return false;
			 };

			 var inBase = function (email) {
			 	//UserActions.inBase(email);
		        user = UserStore.inBase(email)[0];
		        if (user)
					if (user.email === email) {
						userId = user.id;
						return true;
					}
				return false;
			 };

			if (isEmail(searchQuery)) {
				if (inBase(searchQuery)){
					isKnown = 1;
					this.setState({ user : user });
				}
				else {
					isKnown = 0;
					this.setState({ email : searchQuery });
				}
			}
			else 
				isKnown = -1;

			this.setState({ isKnown: isKnown, userId: userId });
			//console.log(isknown);

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
								<input type="text"onChange={this.handleNewName} />
								<p>Придумайте пароль</p>
								<input type="password" id="firstPassword"/>
								<p>Закрепим </p>
								<input type="password" onChange={this.handlePassCheck} />				
								<button onClick={this.handleSubmit}>Поехали!</button>
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