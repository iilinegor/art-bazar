import ReactDOM from 'react-dom';
import React from 'react';

import Masonry from 'react-masonry-component';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import Profile_products from './Profile_products.jsx';

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

var Profile_basket = React.createClass({
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

	    handleNewPay(event) {
			this.setState({ pay : event.target.value.toString() });
		},

		handleNewDelivery(event) {
			this.setState({ delivery : event.target.value.toString() });
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
		    			lastName,
		    			pay,
		    			delivery
		    					 		} = this.state;
	    	
	    	// if (name && email && password) {
	    		console.log(user.id);
	    		let newProduct = {
	    				id : user.id,
	    				password : user.password,
	    				email : user.email,
	    				name : user.name,
		    			location : location, 
		    			description : description,
		    			photo : photo, 
		    			lastName : lastName,
		    			pay : pay,
		    			delivery : delivery

	    		};
			//this.setState({ userId : length});
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

					// if (got(user.order))
					// 	for (let o of user.order)
							// info.push(<div className="subfield"> <h2>{products[o.productId].name}</h2> <h3>{UserStore.getUser(parseInt(o.userId)).name}</h3> <h3>Статус: {o.status}</h3> </div>);
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
							
							if (user.access < 2){
								let payList = ["Банковский перевод", "Денежный перевод", "Наложенный платёж", "Наличные"];
								let deliveryList = ["Почтой по Казахстану", "Доставка по городу", "Самовывоз"];
								
								let pay = [], 
								delivery = [], 
								tmpId = 0;

								for (let p of payList)
									pay.push((tmpId.toString() === user.pay)
										? <option selected value={tmpId++}>{p}</option>
										: <option  value={tmpId++}>{p}</option>);

								tmpId = 0;
								for (let d of deliveryList)
									delivery.push((tmpId.toString() === user.delivery)
										? <option selected value={tmpId++}>{d}</option>
										: <option  value={tmpId++}>{d}</option>);

								info.push(<h2>Способ оплаты:</h2>);
								info.push(<select onChange={this.handleNewPay}>
									{pay}
								</select>);

								info.push(<h2>Способ доставки:</h2>);
								info.push(<select onChange={this.handleNewDelivery}>
									{delivery}
								</select>);
							}


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

				return (
						<div className="profile_page">
							<div className="profile_header" >
								
							</div>
							<div className="profile">
								{info}
							</div>	


							<Profile_products userId={userId}/>
						</div>
				)}
			else
				return null;
		},

		_onChange() {
	        this.setState(getStateFromFlux(this.state.userId));
	    }
});




export default Profile_basket;