import ReactDOM from 'react-dom';
import React from 'react';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';


import './Login.css';


function getStateFromFlux() {
	
    return {
				users: UserStore.getUsers(),
	        isLoading: UserStore.isLoading(),
				length: UserStore.getUsers().length
		};
};


function sleep(ms) {
	ms += new Date().getTime();
	while (new Date() < ms){}
};


var Login = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

	    getInitialState: function() {
		    return {
				isLoading: UserStore.isLoading(),
				isKnown: -1,
				users: UserStore.getUsers(),
				length: UserStore.getUsers().length
			};
	    },

	    handleLogIn: function(event) {
	    	var currentPass = event.target.value;
	    	var { user } = this.state;
	    	if ( currentPass === user.password ){
	    		localStorage.setItem('userId', this.state.user.id);
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

	    handleNewLastName(event) {
	    	this.setState({ lastName : event.target.value });
	    },

	    handleNewLocation(event) {
	    	this.setState({ location : event.target.value });
	    },

	    handleSubmit() {
	    	let { name, email, password, lastName, location, length } = this.state;
	    	let access = 3;
	    	
	    	if (length < 3) access = 0;
	    	if (name && email && password) {
	    		let newUser = {
	    			id: length,
	    			name : name,
	    			email : email,
	    			password : password,
	    			lastName: lastName,
	    			location: location,
	    			photo: "http://mediascapeproject.eu/images/user.png",
	    			access: access
	    		};
	    		console.log(newUser);
	    	this.setState({ userId : length});
    		UserActions.createUser(newUser);
    		localStorage.setItem('userId', newUser.id);
    		this.context.router.push(`/all`);
	    	};
	    },

	    handleCheck: function(event){
	    	var searchQuery = event.target.value.toLowerCase();
	    	var { isLoading, users } = this.state;
			let isKnown;
			let userId;
			var user;
			
			let domens = [".ru", ".kz", ".com", ".org"];
			for (var c = 0; c < 10; c++)
			{

			var isEmail = function(Query) {
				if (Query.indexOf("@") !== -1) {
					for (let dom of domens) {
						if (Query.indexOf(dom) !== -1) {
			 				//UserActions.inBase(Query);
							return true;
						};
					};
				};
				return false;
			 };

			 var inBase = function (email) {
			 	//UserActions.inBase(email);
		        // user = UserStore.inBase(email)[0];
				// console.log(users);
		        for (let u of users)
					if (u.email === email) {
						userId = u.id;
						user = u;
						return true;
					}
				//UserActions.loadUsers();
				return false;
			 };

			if (isEmail(searchQuery)) {			
				if (inBase(searchQuery)){
					isKnown = 1;
					this.setState({ user : user, userId: userId});
				}
				else {
					isKnown = 0;
					this.setState({ email : searchQuery });
				};
			}
			else 
				isKnown = -1;

			
			this.setState({ isKnown: isKnown});

			//console.log(isknown);
		};

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

	    handleLogoClick: function(){
	    	this.context.router.push(`/all`);
	    },

		render: function() {
			var { isKnown, user, isLoading, email } = this.state;
			
			switch ( isKnown ) {
				case -1: {
							return (
									<div className="auth_container">

										<div className='header'>
		                					<div className="logo" onClick={this.handleLogoClick}><img src="https://habrastorage.org/files/45b/28d/7ff/45b28d7ffebc4c5ea04db11ca5a66e6c.png"/></div>
						                	<AuthButton />
						                </div>					                


										<div className="auth">
											<p className="first">Введите email</p>
											<input type="text" onChange={this.handleCheck} />
										</div>


										<div className="all_footter bgless">
											<div className="logo"> 
												<Footter />
												<p>Все права защищены.</p>
												<p>Арт-Базар 2016</p>
											</div>
										</div>
									</div>
								);
						};

				case 0: {
							return (
								<div className="auth_container">
									<div className='header'>
	                					<div className="logo" onClick={this.handleLogoClick}><img src="https://habrastorage.org/files/45b/28d/7ff/45b28d7ffebc4c5ea04db11ca5a66e6c.png"/></div>
					                	<AuthButton />
					                </div>		

									<div className="auth">
										<p className="first">Кажется, мы не знакомы</p>
										<input type="text" onChange={this.handleCheck} />
										<p>Как Вас зовут?</p>
										<input type="text"onChange={this.handleNewName} />
										<p>Ваша фамилия</p>
										<input type="text"onChange={this.handleNewLastName} />
										<p>Из какого Вы города?</p>
										<input type="text"onChange={this.handleNewLocation} />
										<p>Придумайте пароль</p>
										<input type="password" id="firstPassword"/>
										<p>Закрепим </p>
										<input type="password" onChange={this.handlePassCheck} />				
										<button onClick={this.handleSubmit}>Поехали!</button>
									</div>

									<div className="all_footter bgless">
										<div className="logo"> 
											<Footter />
											<p>Все права защищены.</p>
											<p>Арт-Базар 2016</p>
										</div>
									</div>
								</div>
							);
						};

				case 1: {
							return (
								<div className="auth_container">

									<div className='header'>
	                					<div className="logo" onClick={this.handleLogoClick}><img src="https://habrastorage.org/files/45b/28d/7ff/45b28d7ffebc4c5ea04db11ca5a66e6c.png"/></div>
					                	<AuthButton />
					                </div>	

									<div className="auth">
										<p className="first">Здравствуйте, {user.name}!</p>
										<input type="text" onChange={this.handleCheck} />
										<p>Введите пароль</p>
										<input type="password" onChange={this.handleLogIn} />
									</div>

									<div className="all_footter bgless">
										<div className="logo"> 
											<Footter />
											<p>Все права защищены.</p>
											<p>Арт-Базар 2016</p>
										</div>
									</div>
								</div>
							);
						};	
			};	
		},

		_onChange() {
	        this.setState(getStateFromFlux());
	    }
});

export default Login;








var AuthButton = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

	    handleSingIn: function() {
	    	this.context.router.push("/logIn");
	    },

	    handleHelp: function() {
	    	this.context.router.push("/help");
	    },

		render: function() {
				return  (
							<div className="singIn"  >
								<div onClick={this.handleHelp}>Помощь</div>
								<div onClick={this.handleSingIn}> Войти </div>
							</div>
						)
		}
});



var Footter = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

	    handleHelp: function() {
	    	this.context.router.push("/help");
	    },

	    handleAll: function() {
	    	this.context.router.push("/all");
	    },


		render: function() {
			
					return 	<div className="footter_container">
								<div onClick={this.handleAll}>Каталог</div>
								<div onClick={this.handleHelp}>Помощь</div>
							</div>
		}
});