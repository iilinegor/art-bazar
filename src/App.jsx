import ReactDOM from 'react-dom';
import React from 'react';

import USERS from './components/users.js';
import Login from './components/Login.jsx';

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

	    	// Вынести аутх отдельным модулем, 
	    	// чтобы принимал (а, б, в) и со-
	    	// держал методы для проверки.
	    	// Тогда он и будет тем auth-FLUX.
	    	// 	И вообще, давай-ка думай
	    	// головой, а не доками по реакту.
	    },


	    handleProfile: function() {
	    	this.context.router.push(`/profile/${this.state.userId}`);
	    },

	    handleSingIn: function() {
	    	this.context.router.push("/logIn");
	    },

	    handleLogOut: function() {
	    	localStorage.setItem("userId", " ");
	    	this.setState({ userId: -1 });
	    },

		render: function() {
			var { userId } = this.state;
			
				if ( userId === -1)
						return (
								<div className="singIn" onClick={this.handleSingIn} >
									<div> Войти </div>
								</div>
						)
				else 
						return (
								<div className="logIn" >								
									<img src={USERS[userId].photo} onClick={this.handleProfile} />
									<div onClick={this.handleLogOut} > {USERS[userId].name}</div>
								</div>
						)
		}
});

export default App;