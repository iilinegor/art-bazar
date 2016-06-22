import ReactDOM from 'react-dom';
import React from 'react';
import jquery from 'jquery';

import Masonry from 'react-masonry-component';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';


import './all.css';

var msnry;

	function getStateFromFlux(first) {
	    return {
		        isLoading: ProductStore.isLoading(),
		        Market: ProductStore.getProducts(),
		        currentMarket: ProductStore.getProducts(),
		        users: UserStore.getUsers()
			};
	};


	var masonryOptions = {
			itemSelector: '.all__product',
			gutter: 20
		};

	var instaMasonryOptions = {
			itemSelector: '.all__product-insta',
			gutter: 20
		};

	var All = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

		getInitialState() {
		    return {
		        currentMarket: [],
		        users: UserStore.getUsers(),
		        isInsta: false,
		        type: -1
			};
		},

		componentWillMount() {
			ProductActions.loadProducts();
			UserActions.loadUsers();
	    },

	    componentWillUnmount() {
    		ProductStore.removeChangeListener(this._onChange);
	    },

		handleSearch: function(event) {
			var searchQuery = event.target.value.toLowerCase();
			var { Market, type } = this.state;
			var CurrentMarket = Market.filter( function (el){
				// let location = el.location.toLowerCase();
				let name = el.name.toLowerCase();
				let description = el.description.toLowerCase();
				let material = el.material ? el.material.toLowerCase() : "gggggggggggggggggggggggggggg";
				return (((name.indexOf(searchQuery) !== -1) || (description.indexOf(searchQuery) !== -1) || (material.indexOf(searchQuery) !== -1)) && (type === el.type || type === -1));
			});
			this.setState({
				currentMarket: CurrentMarket
			});
		},

		handleNew() {
			this.context.router.push(`/add`);
		},

		componentDidMount: function() {
	        ProductStore.addChangeListener(this._onChange);
		},

		handleClick(productId) {
	        this.context.router.push(`/product/${productId}`);
	    },

	    handleChangeView() {
	    	let isInsta = !this.state.isInsta;
	        this.setState({ isInsta : isInsta});
	    },

	    handleCategory(number) {
	    	let { Market, type } = this.state;
	    	(type !== number  && number !== -1)
	    		? this.setState({ Market : ProductStore.getProducts().filter(function (el){ return (parseInt(el.type) === number) }), currentMarket : ProductStore.getProducts().filter(function (el){ return (parseInt(el.type) === number) }), type : number })
	    		: this.setState({ Market : ProductStore.getProducts(), currentMarket : ProductStore.getProducts(), type : -1 });
	    	/*this.state.type 
	    		? this.setState({ Market : ProductStore.getProducts().filter(function (el){ return (parseInt(el.type) === type) }) })
	    		: this.setState({ Market : ProductStore.getProducts() });*/
	    	this.render();

	    },

		render() {
			var rows = [];
			var tmpId = 0;
			var Mark = this.state.currentMarket;
			let { isInsta } = this.state; 
			for (let i of Mark) {
				{
					isInsta
						? rows.push(<InstaProduct onClick={this.handleClick.bind(null, i.id)} product={i} key={tmpId++} users={UserStore.getUsers()} />)
						: rows.push(<Product onClick={this.handleClick.bind(null, i.id)} product={i} key={tmpId++} />);
					//tmpId++;
				}
			};

			return 	<div>
						
						<Masonry
			                className='NotesGrid'
			                options={this.state.isInsta ? instaMasonryOptions : masonryOptions }
			                ref={function(c) {if (c) this.masonry = c.masonry;}.bind(this)}
			            >
			            
							<div className="all__all" ref="grid">{rows}</div>
						</Masonry>
					</div>
			
		},

	    _onChange() {
	        this.setState(getStateFromFlux());
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

	var InstaProduct = React.createClass({

		handleLike() {
			console.log(this.props.product);
			ProductActions.ProductLikesInc(this.props.product);
		},

		render: function() {
			let { users, product } = this.props;
			let author;
			( product.authorId === undefined ) 
				? author = 0 
				: author = product.authorId;
			return (users[0] !== undefined)
				? (<div className="all__product-insta" >
							<div className="all__author">
				 				<img src={users[author].photo} onClick={this.props.onClick} />
				 				<p>{users[author].name}</p>
				 			</div>
							<div className="all__photo-insta">
								<img src={product.image[0]} width="100%" /><div className="all__price-insta">{product.price}₸</div>
							</div>
							<div className="all__info-insta">
								<h2 onClick={this.handleLike}> {"<3"} {product.likes}</h2>
								<h2>{product.name}</h2>
								<p>{product.description}</p>
							</div>
					 	</div>)
				: false;
			 }
	});

export default All;