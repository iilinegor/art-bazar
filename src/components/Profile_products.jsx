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

var Profile_products = React.createClass({
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

			const { userId } = this.props;
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

		componentDidMount: function() {
	        UserStore.addChangeListener(this._onChange);
	        ProductStore.addChangeListener(this._onChange);
		},

		componentWillMount() {
	        UserActions.loadUsers();
			ProductActions.loadProducts();
	    },

	    componentWillUnmount() {
    		UserStore.removeChangeListener(this._onChange);
	        ProductStore.removeChangeListener(this._onChange);
	    },


	    handleClick(productId) {
	        this.context.router.push(`/product/${productId}`);
	    },

		render() {
			var { userId, editMode, upgradeMode, user, products, currentUserId,
		    			location, 
		    			description,
		    			photo, 
		    			lastName } = this.state;
			var info = [];
			var prod = [];
			var tmpId = 0;

			if (products[0]) {
				for (let i of products)
				{
					if (i.authorId === user.id)
						prod.push(<Product onClick={this.handleClick.bind(null, i.id)} product={i} key={tmpId++} />);
				};
			};

			return (<Masonry
                className='NotesGrid-profile'
                options={ masonryOptions }
                ref={function(c) {if (c) this.masonry = c.masonry;}.bind(this)}
            >
        
				<div className="profile__grid" ref="grid">{prod}</div>
			</Masonry>);
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

export default Profile_products;