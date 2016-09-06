import ReactDOM from 'react-dom';
import React from 'react';

import USERS from './components/users.js';
import Login from './components/Login.jsx';

import UserStore from './stores/UserStore';
import UserActions from './actions/UserActions';

import './App.css';
import './components/fonts/font.css';

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
		                	
		                		<div className="logo" onClick={this.handleLogoClick}><img src="https://habrastorage.org/files/45b/28d/7ff/45b28d7ffebc4c5ea04db11ca5a66e6c.png"/></div>
		                		
		                	<AuthButton />
		                </div>

						<div className='content'>
		                    {this.props.children}
		                </div>

		                <div className="all_footter">
							<div className="logo"> 
								<Footter />
								<p>Все права защищены.</p>
								<p>Арт-Базар 2016</p>
							</div>
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

	    handleBasket: function() {
	    	this.context.router.push("/basket");
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

		handleLikes() { 
			this.context.router.push(`/likes`);
		},

		render: function() {
			var { user  } = this.state;
			let useCase = [];
			if ( user === undefined)
					return (
							<div className="singIn"  >
								<div key={0} onClick={this.handleHelp}>Правила</div>
								<div key={1} onClick={this.handleSingIn}> Войти </div>
							</div>
					)
			else 
					// if (user.access === 0)
					// 	useCase.push(<div onClick={this.handlePromote}>Одобрение</div>);

					if (user.access < 2) 
						useCase.push(<div key={2} onClick={this.handleNew}>
										<img src="https://habrastorage.org/files/e2b/b1e/484/e2bb1e48428848d5bf4b3b873f5becc1.png" className="add_button" title="Добавить новый продукт" /> 
									</div>);
					if (user.likes === [])
						useCase.push(<div key={3} onClick={this.handleLikes}>Избранное</div>);

						//this.context.router.push(`/Promoute`)

						useCase.push( <div key={4} onClick={this.handleBasket}>Корзина ({user.basket.length + user.order.length})</div> );
						useCase.push( <div key={5} onClick={this.handleLikes}> Избранное </div> );
						useCase.push( <img key={6} onClick={this.handleProfile} src={user.photo}  /> );
						useCase.push( <div key={7} onClick={this.handleProfile} className="name"> {user.name}</div> );
						useCase.push( <div key={8} onClick={this.handleLogOut}> Выйти</div> );

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
								<div onClick={this.handleHelp}>Правила</div>
							</div>
		}
});




export default App;