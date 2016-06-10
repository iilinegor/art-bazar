import ReactDOM from 'react-dom';
import React from 'react';

import USERS from './components/users.js';
import Login from './components/Login.jsx';

import UserStore from './stores/UserStore';
import UserActions from './actions/UserActions';

import './App.css';

var App = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

	    handleLogoClick: function(){
	    	this.context.router.push(`/all`);
	    },

		render: function() {
			return (
					<div className="app">
						<div className='header'>
							<img onClick={this.handleLogoClick} src="http://static.wixstatic.com/media/a026b6_c9cca4ab2ae748ad93e6886864d8518f.jpg/v1/fill/w_620,h_107/a026b6_c9cca4ab2ae748ad93e6886864d8518f.jpg"/>
		                	<AuthButton />
		                </div>

						<div className='content'>
		                    {this.props.children}
		                </div>
					</div>
			);
		}
});

function getStateFromFlux(userId) {
    return {
			isLoading: UserStore.isLoading(),
			user: UserStore.getUser(userId)[userId],
			userId: userId
		};
};

function inLocalStorage() {
	let local = -1;
	/*if (localStorage.getItem('userId') === undefined)
		localStorage.setItem("userId", -1);
	else {
    	local = localStorage.getItem('userId');
    };*/
    	local = localStorage.getItem('userId');
    return getStateFromFlux(local);
};

var AuthButton = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },


	    getInitialState: function() {
	    	return inLocalStorage();
	    },

	    	// Вынести аутх отдельным модулем, 
	    	// чтобы принимал (а, б, в) и со-
	    	// держал методы для проверки.
	    	// Тогда он и будет тем auth-FLUX.
	    	// 	И вообще, давай-ка думай
	    	// головой, а не доками по реакту.

	    componentDidMount: function() {
	        UserStore.addChangeListener(this._onChange);
		},

		componentWillMount() {
	        UserActions.loadUsers();
	    },

	    componentWillUnmount() {
    		UserStore.removeChangeListener(this._onChange);
	    },


	    handleProfile: function() {
	    	this.context.router.push(`/profile/${this.state.userId}`);
	    },

	    handleSingIn: function() {
	    	this.context.router.push("/logIn");
	    },

	    handleLogOut: function() {
	    	localStorage.setItem("userId", -1);
	    	this.setState({ user: undefined});
	    },

		render: function() {
			var { user } = this.state;
			if ( user === undefined)
					return (
							<div className="singIn"  >
								<div onClick={this.handleSingIn}> Войти </div>
							</div>
					)
			else 
					return (
							<div className="logIn" >								
								<img src={user.photo} onClick={this.handleProfile} />
								<div onClick={this.handleLogOut} > {user.name}</div>
							</div>
					)
		},

		_onChange() {
	        this.setState(inLocalStorage());
	    }
});

export default App;