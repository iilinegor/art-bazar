import ReactDOM from 'react-dom';
import React from 'react';

import USERS from './components/users.js';

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


var AuthButton = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },


	    getInitialState: function() {
	    	return {
	    		userId: -1
	    	};
	    },

	    componentWillMount: function() {
	    	if (localStorage.length === 0)
	    		localStorage.setItem("userId", " ");
	    	else {
		    	let local = localStorage.getItem('userId');
		    	console.log(local);
		    	if (local !== " ") 
		    		this.setState({ userId: local });
		    };
	    },

	    componentWillUpdate: function() {
	    	/*let local = localStorage.getItem('userId');
	    	if (local !== " ") 
	    		this.setState({ userId: local });*/
	    },




	    handleSingIn: function() {
	    	this.context.router.push("/logIn");
	    },

	    handleLogOut: function() {
	    	localStorage.setItem("userId", " ");
	    	this.setState({ userId: -1 });
	    },

		render: function() {
			var userId = this.state.userId;
			
				if ( userId === -1)
						return (
								<div className="singIn" onClick={this.handleSingIn} >
									Войти
								</div>
						)
				else 
						return (
								<div className="logIn" onClick={this.handleLogOut} >
									Привет, {USERS[userId].name}!
								</div>
						)
		}
});

export default App;