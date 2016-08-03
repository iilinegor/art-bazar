import ReactDOM from 'react-dom';
import React from 'react';

import Masonry from 'react-masonry-component';
import typeList from './List.js';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';

import Notice from './Notice.jsx';

import './all.css';

function got(thing) {
	return (thing !== undefined);
};

	function getStateFromFlux(first) {
		let local = parseInt(localStorage.getItem('userId'));
	    return {
		        isLoading: ProductStore.isLoading(),
		        Market: ProductStore.getProducts(),
		        currentMarket: ProductStore.getProducts(),
		        users: UserStore.getUsers(),
		        currentUser: UserStore.getUser(local),
		        is: true
			};
	};


	var masonryOptions = {
			itemSelector: '#asd',
			gutter: 20
		};

	var All = React.createClass({
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

		    return {
		        currentMarket: [],
		        currentUser: UserStore.getUser(local),
		        users: UserStore.getUsers(),
		        isInsta: false,
		        type: -1,
		        is: true
			};
		},

		componentWillMount() {
			ProductActions.loadProducts();
			UserActions.loadUsers();
	    },

	    componentWillUnmount() {
    		ProductStore.removeChangeListener(this._onChange);
    		UserStore.removeChangeListener(this._onChange);
	    },

		handleSearch: function(event) {
			var searchQuery = event.target.value.toLowerCase();
			var { Market, type } = this.state;
			var CurrentMarket = Market.filter( function (el){
				// let location = el.location.toLowerCase();
				let name = el.name.toLowerCase();
				let description = el.description ? el.description.toLowerCase() : "";
				let material = el.material ? el.material.toLowerCase() : "";
				return (((name.indexOf(searchQuery) !== -1) || (description.indexOf(searchQuery) !== -1) || (material.indexOf(searchQuery) !== -1)) && (type === el.type || type === -1));
			});
			this.setState({
				currentMarket: CurrentMarket
			});
		},

		componentDidMount: function() {
	        ProductStore.addChangeListener(this._onChange);
	        UserStore.addChangeListener(this._onChange);
		},

		handleClick(productId) {
	        this.context.router.push(`/product/${productId}`);
	    },

	    handleLike(data) {
	    	let { currentUser } = this.state;
	    	if (data.authorId !== currentUser.id && currentUser !== undefined)
		    	if (!currentUser.likes.some((x) => {return x === data.id}) || currentUser.likes === []){
					ProductActions.ProductLikesInc(data);
					currentUser.likes.push(data.id);
					UserActions.updateUserLikes(currentUser);
		    	}
		    	else {
		    		ProductActions.ProductLikesDec(data);
		    		currentUser.likes = currentUser.likes.filter((x) => {return x !== data.id});
					UserActions.updateUserLikes(currentUser);
		    	}
		},

	    handleClickAuthor(authorId) {
	        this.context.router.push(`/profile/${authorId}`);
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
	    	this.render();
	    },

	    handleDefaultType() {
	    	this.setState({type : -1});
	    	this.handleCategory(-1);
	    },

	    handleTest() {
	    	this.setState({is: !this.state.is});
	    },

		render() {
			var rows = [];
			var category = [];
			var tmpCat = [];
			var viewButton = [];
			var catlist = [];
			var tmpId = 0;
			var Mark = this.state.currentMarket;
			let { isInsta, type, is } = this.state; 

			for (let i of Mark)
				{
					isInsta
						? rows.push(<InstaProduct onClickProduct={this.handleClick.bind(null, i.id)} 
												  onClickAuthor={this.handleClickAuthor.bind(null, i.authorId)} 
												  onClickLike={this.handleLike.bind(null, i)} 
												  product={i} 
												  key={tmpId++} 
												  users={UserStore.getUsers()} />)
						: rows.push(<Product onClick={this.handleClick.bind(null, i.id)} 
											 product={i} 
											 key={tmpId++} />);
				};

				
			tmpId = 0;

			for (let c of typeList) {
				if (got(c.title)) category.push(<p className="list_title">{c.title}</p>)
				for (let cat of c.cats){
						tmpCat.push(<li key={tmpId} onClick={this.handleCategory.bind(null, tmpId++)}>{cat}</li>);
						catlist.push(cat);
					}
				if ( c.group !== "")
					category.push(<details><summary>{c.group}</summary> {tmpCat} </details> )
				else 
					category.push(tmpCat);
				tmpCat = [];
			}

			!isInsta
						? viewButton.push(<img src="https://habrastorage.org/files/252/597/360/2525973609d443808e4c7adff2f51635.png" />)
						: viewButton.push(<img src="https://habrastorage.org/files/6ca/207/06d/6ca20706d9fe42dd8fe091ef308c830c.png" />);

			return 	<div>
						<img className="sublogo" src="https://habrastorage.org/files/a73/493/c21/a73493c2123345fab0c322ae2dc39344.png"/>
						<div className="all_header" >
							<div className="slider">
								<div className="slider_header">
									Заголовок
								</div>
								<div className="slider_text">
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  
								</div>
								<button>Подписаться</button>
							</div>
						</div>

						<div className="all__search">
							<div className="all__searchField">	
								<div onClick={this.handleChangeView} className="all__viewButton">
									{viewButton} 
								</div>
								<input type="text" onChange={this.handleSearch} />
							</div>
						</div>
						<div className="all__category_title" onClick={this.handleDefaultType}> {type === -1 ? "Каталог" : "Каталог > " + catlist[type]}</div>
						<div className="all__category">
							<ul>
								{category}
							</ul>
						</div>
						<Masonry
			                className='NotesGrid'
			                options={masonryOptions}
			                ref={function(c) {if (c) this.masonry = c.masonry;}.bind(this)}
			            >
			            
							<div className="all__all" ref="grid">{rows.reverse()}</div>
						</Masonry>
					</div>
			
		},

	    _onChange() {
	        this.setState(getStateFromFlux());
	    }
	});

	var Product = React.createClass({

		render: function() {
			 return <div className="all__product" id="asd" onClick={this.props.onClick}>
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

		render: function() {
			let { users, product } = this.props;
			let author;
			( product.authorId === undefined ) 
				? author = 0 
				: author = product.authorId;
			return (users[0] !== undefined)
				? (<div className="all__product-insta" id="asd">
							<div className="all__author" >
				 				<img src={users[author].photo} onClick={this.props.onClickAuthor} />
				 				<p>{users[author].name}</p>
				 			</div>
							<div className="all__photo-insta">
								<img src={product.image[0]} width="100%" onClick={this.props.onClickProduct} /><div className="all__price-insta">{product.price}₸</div>
							</div>
							<div className="all__info-insta">
								<h2 onClick={this.props.onClickLike}> {"❤"} {product.likes}</h2>
								<h2>{product.name}</h2>
								<p>{product.description}</p>
							</div>
					 	</div>)
				: false;
			 }
	});

export default All;