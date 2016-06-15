import ReactDOM from 'react-dom';
import React from 'react';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';


import './Profile.css';

function getStateFromFlux(userId) {
    return {
		isLoading: UserStore.isLoading(),
		user: UserStore.getUser(parseInt(userId))[0]
	};
};

function got(thing) {
	return (thing !== undefined);
};

var Profile = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

    	getInitialState() {
			const { userId } = this.props.params;
			if (userId === undefined)
	    		this.context.router.push(`/all`)
	    	else			
				return {
					userId: userId,
					user: UserStore.getUser(parseInt(this.props.params.userId))[0],
					editMode: false
				};
		},

		handleEdit() {
			this.setState({ editMode: true });
		},

		componentDidMount: function() {
	        UserStore.addChangeListener(this._onChange);
		},

		componentWillMount() {
	        UserActions.loadUser(this.state.userId);
	    },

	    componentWillUnmount() {
    		UserStore.removeChangeListener(this._onChange);
	    },

		render: function() {
			var { userId, editMode, user } = this.state;
			var info = [];
			if (editMode) {

			};


			if (user) {
				info.push(<button className="upgrade" onClick={this.handleEdit}>Стать мастером</button>);
				info.push(<img src={user.photo} />);
				if (got(user.lastName))
					info.push(<h1>{user.lastName + " " + user.name}</h1>)
				else
					info.push(<h1>{user.name} </h1>);

				if (got(user.lacation))
					info.push(<h3>Город: {user.lacation}</h3>);

				if (got(user.email))
					info.push(<h3>Почта: {user.email}</h3>);

				if (got(user.description)) {
					info.push(<h2>О себе</h2>);
					info.push(<p>{user.description}</p>);
				};

				return (

						<div className="profile">
							{info}
						</div>
				)}
			else
				return null;
		},

		_onChange() {
	        this.setState(getStateFromFlux(this.state.userId));
	    }
});

export default Profile;