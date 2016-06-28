import ReactDOM from 'react-dom';
import React from 'react';

import Masonry from 'react-masonry-component';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import './Profile.css';

var masonryOptions = {
	itemSelector: '.all__product',
	gutter: 20
};

function getStateFromFlux(userId) {
    return {
		isLoading: UserStore.isLoading(),
		user: UserStore.getUser(parseInt(userId)),
		products: ProductStore.getProducts()
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
					editMode: false,
					products: ProductStore.getProducts()
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
	        ProductStore.addChangeListener(this._onChange);
		},

		componentWillMount() {
	        UserActions.loadUsers();
			ProductActions.gotProducts(parseInt(this.props.params.userId));
	    },

	    componentWillUnmount() {
    		UserStore.removeChangeListener(this._onChange);
	        ProductStore.removeChangeListener(this._onChange);
	    },

	    handleClick(productId) {
	        this.context.router.push(`/product/${productId}`);
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
	    				password : user.password,
	    				name : user.name,
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
			var { userId, editMode, user, products, 
		    			location, 
		    			description,
		    			photo, 
		    			lastName } = this.state;
			var info = [];
			var prod = [];
			var tmpId = 0;


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

			if (products[0]) {
				for (let i of products)
				{
						prod.push(<Product onClick={this.handleClick.bind(null, i.id)} product={i} key={tmpId++} />);
				};
			};

				return (
						<div className="profile_page">
							<div className="profile_header" >
								
							</div>
							<div className="profile">
								{info}
							</div>
							<Masonry
				                className='NotesGrid-profile'
				                options={this.state.isInsta ? instaMasonryOptions : masonryOptions }
				                ref={function(c) {if (c) this.masonry = c.masonry;}.bind(this)}
				            >
			            
								<div className="profile__grid" ref="grid">{prod}</div>
							</Masonry>
						</div>
				)}
			else
				return null;
		},

		_onChange() {
	        this.setState(getStateFromFlux(this.state.userId));
	    }
});


var Product = React.createClass({

		render: function() {
			 return <div className="all__product" onClick={this.props.onClick}>
						 <div className="all__photo">
							 <img src={this.props.product.image[0]} width="100%" /><div className="all__price">{this.props.product.price}₸</div>
						 </div>
						 <div className="all__info">
						 	 <h2>{this.props.product.name}</h2>
							 
						 </div>
				 	</div>
			 }
	});

export default Profile;