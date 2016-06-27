import ReactDOM from 'react-dom';
import React from 'react';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';


import './Profile.css';

function getStateFromFlux(userId) {
    return {
		isLoading: UserStore.isLoading(),
		user: UserStore.getUser(parseInt(userId))
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
			var user = UserStore.getUser(parseInt(userId));
			if (userId === undefined)
	    		this.context.router.push(`/all`)
	    	else			
				return {
					userId: userId,
					user: user,
					editMode: false
				};
		},

		handleEdit() {
			var { user } = this.state;
			this.setState({ editMode: true,
							location: user.location, 
			    			description: user.description,
			    			photo: user.photo, 
			    			lastName: user.lastName
							 });
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


	    handleNewLocation(event) {
	    	if (event.target.value !== "")
				this.setState({ location : event.target.value })
			else
				this.setState({ location : user.location });
		},

	    handleNewDescription(event) {
	    	if (event.target.value !== "")
				this.setState({ description : event.target.value })
			else
				this.setState({ description : user.description });
		},

	    handleNewPhoto(event) {
	    	if (event.target.value !== "")
				this.setState({ photo : event.target.value })
			else
				this.setState({ photo : user.photo });
		},

		handleNewLastName(event) {
	    	if (event.target.value !== "")
				this.setState({ lastName : event.target.value })
			else
				this.setState({ lastName : user.lastName });
		},

		handleSubmit() {
	    	var {	    user, 
		    			location, 
		    			description,
		    			photo, 
		    			lastName
		    					 		} = this.state;
	    	
	    	// if (name && email && password) {
	    		console.log(user.id);
	    		let newProduct = {
	    				id : user.id,
		    			location : location, 
		    			description : description,
		    			photo : photo, 
		    			lastName : lastName
	    		};
			//this.setState({ userId : length});
			console.log(newProduct);
    		UserActions.updateUser(newProduct);
			//localStorage.setItem('userId', newUser.id);
    		// this.context.router.push(`/all`);
	},

		render: function() {
			var { userId, editMode, user, 
		    			location, 
		    			description,
		    			photo, 
		    			lastName } = this.state;
			var info = [];
			if (editMode) {

			};

			info.push();


			if (user) {
				if (!editMode) {
					info.push(<button className="upgrade" onClick={this.handleEdit}>Стать мастером</button>);
					info.push(<img src={user.photo} />);
					if (got(user.lastName))
						info.push(<h1>{user.lastName + " " + user.name}</h1>)
					else
						info.push(<h1>{user.name} </h1>);

					if (got(user.location))
						info.push(<h3>Город: {user.location}</h3>);

					if (got(user.email))
						info.push(<h3>Почта: {user.email}</h3>);

					if (got(user.description)) {
						info.push(<h2>О себе</h2>);
						info.push(<p>{user.description}</p>);
					};
				}
				else {
					info.push(<img src={user.photo} />);
					if (got(user.lastName))
						info.push(<h1>{user.lastName + " " + user.name}</h1>)
					else
						info.push(<h1>{user.name} </h1>);

					info.push(<h2>Фамилия:</h2>);
					info.push(<input type="text" id="price" onChange={this.handleNewLastName} value={lastName}/>);

					info.push(<h2>О себе:</h2>);
					info.push(<input type="text" id="price" onChange={this.handleNewDescription} value={description}/>);

					info.push(<h2>Город:</h2>);
					info.push(<input type="text" id="price" onChange={this.handleNewLocation} value={location}/>);

					info.push(<h2>Ссылка на фотографию:</h2>);
					info.push(<input type="text" id="price" onChange={this.handleNewPhoto} value={photo}/>);

					info.push(<button onClick={this.handleSubmit}>Готово!</button>);					
				};



				return (
						<div className="profile_page">
							<div className="profile_header" >
								
							</div>
							<div className="profile">
								{info}
							</div>
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