import ReactDOM from 'react-dom';
import React from 'react';

import MARKET from './db.js';
import USERS from './users.js';


import './Profile.css';

var Profile = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

    	getInitialState() {
			const { userId } = this.props.params;
			if (userId === undefined)
	    		this.context.router.push(`/profile/0`)
	    	else			
				return {
					userId: userId
				};
		},

		render: function() {
			var { userId } = this.state;

			return (
					<div className="profile">
						<img src={USERS[userId].photo} />
						<h1 >{USERS[userId].lastName + " " + USERS[userId].name}</h1>
						<h3>Город: {USERS[userId].lacation}</h3>
						<h3>Почта: {USERS[userId].email}</h3>
						<h2>О себе</h2>
						<p> {USERS[userId].description}</p>
					</div>
				);
		}
});

export default Profile;