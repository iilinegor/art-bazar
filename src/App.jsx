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
		                	<div className="logo" onClick={this.handleLogoClick}><img src="https://habrastorage.org/files/8a3/902/733/8a390273365a4628a8cd17c54caf75c4.png"/></div>
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
	    	let local = localStorage.getItem('userId');
			if (local === ""){
				local = -1;
				localStorage.setItem("userId", local);
			}
			else {
		    	local = parseInt(localStorage.getItem('userId'));
		    };

		     if (local === -1 || local != 0)
			    			this.context.router.push(`/all`)
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

	    handlePromote: function() {
	    	this.context.router.push("/Promoute");
	    },

	    handleLogOut: function() {
	    	localStorage.setItem("userId", -1);
	    	this.setState({ user: undefined});
	    },

	    handleNew() {
			this.context.router.push(`/add`);
		},

		render: function() {
			var { user  } = this.state;
			let useCase = [];
			if ( user === undefined)
					return (
							<div className="singIn"  >
								<div onClick={this.handleHelp}>Помощь</div>
								<div onClick={this.handleSingIn}> Войти </div>
							</div>
					)
			else 
					if (user.access === 0)
						useCase.push(<div onClick={this.handlePromote}>Одобрение</div>);

					if (user.access < 2) 
						useCase.push(<div onClick={this.handleNew}>
										<img src="https://habrastorage.org/files/e2b/b1e/484/e2bb1e48428848d5bf4b3b873f5becc1.png" className="add_button" /> 
									</div>);
					if (user.likes === [])
						useCase.push(<div onClick={this.handleLikes}>Избранное</div>);

						useCase.push( <div onClick={this.handleHelp}>Помощь</div> );
						useCase.push( <img src={user.photo} onClick={this.handleProfile} /> );
						useCase.push( <div onClick={this.handleProfile} className="name"> {user.name}</div> );
						useCase.push( <div onClick={this.handleLogOut}> Выйти</div> );

					return (
							<div className="logIn" >
								{useCase}
							</div>
					)
		},

		_onChange() {
	        this.setState(inLocalStorage());
	    }
});

export default App;