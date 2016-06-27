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
		                	<div className="logo" onClick={this.handleLogoClick}><img src="https://habrastorage.org/files/52c/1ab/9bd/52c1ab9bdd364f6e8a297aea7dd68684.png"/></div>
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
			user: UserStore.getUser(parseInt(userId)),
			userId: userId
		};
};

function inLocalStorage() {
	let local = parseInt(localStorage.getItem('userId'));
	if (local === undefined){
		local = -1;
		localStorage.setItem("userId", local);
	}
	else {
    	local = parseInt(localStorage.getItem('userId'));
    };
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

	    handleLikes: function() {
	    	this.context.router.push("/likes");
	    },

	    handleHelp: function() {
	    	this.context.router.push("/help");
	    },

	    handleLogOut: function() {
	    	localStorage.setItem("userId", -1);
	    	this.setState({ user: undefined});
	    },

	    handleNew() {
			this.context.router.push(`/add`);
		},

		render: function() {
			var { user,  } = this.state;
			if ( user === undefined)
					return (
							<div className="singIn"  >
								<div onClick={this.handleHelp}>Помощь</div>
								<div onClick={this.handleSingIn}> Войти </div>
							</div>
					)
			else 
					return (
							<div className="logIn" >
								<div onClick={this.handleNew}>
									<img src="https://habrastorage.org/files/e2b/b1e/484/e2bb1e48428848d5bf4b3b873f5becc1.png" /> 
								</div>
								<div onClick={this.handleLikes}>Избранное</div>
								<div onClick={this.handleHelp}>Помощь</div>							
								<img src={user.photo} onClick={this.handleProfile} />
								<div onClick={this.handleProfile} className="name"> {user.name}</div>
								<div onClick={this.handleLogOut}> Выйти</div>
							</div>
					)
		},

		_onChange() {
	        this.setState(inLocalStorage());
	    }
});

export default App;