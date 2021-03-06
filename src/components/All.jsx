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

var truth = false;

function got(thing) {
	return (thing !== undefined);
};

function searchTruth(param, query){
	if (got(param))
		return param.toLowerCase().indexOf(query) !== -1;
	return false;
};

	function getStateFromFlux(first) {
		let local = parseInt(localStorage.getItem('userId'));
	    return {
		        isLoading: ProductStore.isLoading(),
		        Market: ProductStore.getProducts(),
		        currentMarket: ProductStore.getProducts(),
		        users: UserStore.getUsers(),
		        currentUser: UserStore.getUser(local)
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
			let local = localStorage.getItem('userId');
			if (!local){
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
		        is: false
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
			var { Market, type, users } = this.state;

			truth = false;
			var CurrentMarket = Market.filter( function (el){
				if (searchTruth(UserStore.getUser(el.authorId).location, searchQuery)) return true;
				if (searchTruth(el.name, searchQuery)) return true;
				if (searchTruth(el.description, searchQuery)) return true;
				if (searchTruth(UserStore.getUser(el.authorId).name, searchQuery)) return true;
				if (searchTruth(UserStore.getUser(el.authorId).lastName, searchQuery)) return true;
				if (searchTruth(el.material, searchQuery)) return true;
				
				return false;
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
												  currentUser={this.state.currentUser} 
												  product={i} 
												  key={tmpId++} 
												  users={UserStore.getUsers()} />)
						: rows.push(<Product onClick={this.handleClick.bind(null, i.id)} 
											 product={i} 
											 key={tmpId++} />);
				};

				
			tmpId = 0;

			for (let c of typeList) {
				if (got(c.title)) category.push(<p key={tmpId} className="list_title">{c.title}</p>)
				for (let cat of c.cats){
						tmpCat.push(<li key={tmpId} onClick={this.handleCategory.bind(null, tmpId++)}>{cat}</li>);
						catlist.push(cat);
					}
				if ( c.group !== "")
					category.push(<details key={c.group}><summary>{c.group}</summary> {tmpCat} </details> )
				else 
					category.push(tmpCat);
				tmpCat = [];
			}

			!isInsta
						? viewButton.push(<img key={0} src="https://habrastorage.org/files/252/597/360/2525973609d443808e4c7adff2f51635.png" />)
						: viewButton.push(<img key={1} src="https://habrastorage.org/files/6ca/207/06d/6ca20706d9fe42dd8fe091ef308c830c.png" />);

			return 	<div>
						<img key={2} className="sublogo" src="https://habrastorage.org/files/a73/493/c21/a73493c2123345fab0c322ae2dc39344.png"/>
						{ this.state.is ?  <Notice close={this.handleTest} code={4}/> : "" }
						<div className="all_header" >
							<div className="slider">
								<div className="slider_header">
									Привет! 
								</div>
								<div className="slider_text">
									Подпишитесь на обновления и первыми узнавайте о новых материалах сайта!
								</div>
								<button onClick={this.handleTest}>Подписаться</button>
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
						<div className="all_page_long">
							<Masonry
				                className='NotesGrid'
				                options={masonryOptions}
				                ref={function(c) {if (c) this.masonry = c.masonry;}.bind(this)}
				            >
				            
								<div className="all__all" ref="grid">{rows.reverse()}</div>
							</Masonry>
						</div>
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
			let { users, product, currentUser } = this.props;
			let author;
			( product.authorId === undefined ) 
				? author = 0 
				: author = product.authorId;
			return (users[0] !== undefined)
				? (<div className="all__product-insta" id="asd">
							<div className="all__author" >
				 				<img key={users[author].photo} src={users[author].photo} onClick={this.props.onClickAuthor} />
				 				<p>{users[author].name}</p>
				 			</div>
							<div className="all__photo-insta">
								<img key={product.image[0]} src={product.image[0]} width="100%" onClick={this.props.onClickProduct} /><div className="all__price-insta">{product.price}₸</div>
							</div>
							<div className="all__info-insta">
								<h2 onClick={(currentUser !== undefined) ? this.props.onClickLike : ""} 
									className={ (currentUser !== undefined) ? (currentUser.likes.some( x => {return x === product.id}) ? "all__liked" : "all__like") : "all__like"}>{product.likes}</h2>
								<h2>{product.name}</h2>
								<p>{product.description}</p>
							</div>
					 	</div>)
				: false;
			 }
	});

export default All;