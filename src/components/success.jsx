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

function inLocalStorage() {
	
    return ;
};

var Profile = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

    	getInitialState() {
    		let local = parseInt(localStorage.getItem('userId'));
			if (local === undefined){
				local = -1;
				localStorage.setItem("userId", local);
			}
			else {
		    	local = parseInt(localStorage.getItem('userId'));
		    };

			const { userId } = this.props.params;
			var user = UserStore.getUser(parseInt(userId));
			if (userId === undefined)
	    		this.context.router.push(`/all`)
	    	else			
				return {
					userId: userId,
					user: user,
					editMode: false,
					upgradeMode: false,
					products: ProductStore.getProducts(),
					currentUserId: local
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

		handleUpgrade() {
			var { user } = this.state;
			this.setState({ upgradeMode: true });
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

		handleSubmit() {
	    	var {	    user, 
		    			location, 
		    			description,
		    			photo, 
		    			lastName
		    					 		} = this.state;
	    		let newProduct = user;
	    		newProduct.access = 2;
	    		
			console.log(newProduct);
    		UserActions.updateUser(newProduct);
    		this.setState({ editMode: false, user: newProduct });
			//localStorage.setItem('userId', newUser.id);
    		// this.context.router.push(`/all`);
	},

		render: function() {
			var { userId, editMode, upgradeMode, user, products, currentUserId,
		    			location, 
		    			description,
		    			photo, 
		    			lastName } = this.state;
			var info = [];
			var prod = [];
			var tmpId = 0;


			if (user) {
				if (!editMode && !upgradeMode) {
					if (user.id === currentUserId) {
						info.push(<button className="upgrade" onClick={this.handleEdit}>Редактировать</button>);
						if (user.access > 1)
						info.push(<button className="open_store" onClick={this.handleUpgrade}>Открыть лавку</button>);
					};

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
					if (editMode){
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
					} 
					else {
							info.push(<img src={user.photo} />);
							if (got(user.lastName))
								info.push(<h1>{user.lastName + " " + user.name}</h1>)
							else
								info.push(<h1>{user.name} </h1>);
							info.push(<iframe frameborder="0" allowtransparency="true" scrolling="no" src="https://money.yandex.ru/embed/shop.xml?account=410011343826671&quickpay=shop&payment-type-choice=on&writer=seller&targets=%D0%98%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5+%D1%82%D0%B8%D0%BF%D0%B0+%D0%B0%D0%BA%D0%BA%D0%B0%D1%83%D0%BD%D1%82%D0%B0&default-sum=250&button-text=01&comment=on&hint=%D0%A7%D1%82%D0%BE+%D0%B2%D1%8B+%D0%BF%D0%BB%D0%B0%D0%BD%D0%B8%D1%80%D1%83%D0%B5%D1%82%D0%B5+%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%89%D0%B0%D1%82%D1%8C+%D0%BD%D0%B0+%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%B5%3F&fio=on&mail=on&successURL=%2Fsuccess" width="450" height="268"></iframe>);
					}				
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
				                options={ masonryOptions }
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