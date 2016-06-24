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
		        isInsta: true,
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
						<div className="all__search">
							<div className="all__searchField">
								<input type="text" onChange={this.handleSearch} />
								<div className="all__add" onClick={this.handleNew}>Добавить</div>
								<div className="all__add" onClick={this.handleChangeView}>Изменить отображение</div>
							</div>
						</div>
						<div className="all__category">
							<ul>
								<li onClick={this.handleCategory.bind(null, -1)}>Все</li>
								<li onClick={this.handleCategory.bind(null, 0)}>Аксессуары</li>
								<li onClick={this.handleCategory.bind(null, 1)}>Для дома и интерьера</li>
								<li onClick={this.handleCategory.bind(null, 2)}>Для домашних животных</li>
								<li onClick={this.handleCategory.bind(null, 3)}>Канцелярские товары</li>
								<li onClick={this.handleCategory.bind(null, 4)}>Картины и панно</li>
								<li onClick={this.handleCategory.bind(null, 5)}>Косметика ручной работы</li>
								<li onClick={this.handleCategory.bind(null, 6)}>Куклы и игрушки</li>
								<li onClick={this.handleCategory.bind(null, 7)}>Музыкальные инструменты</li>
								<li onClick={this.handleCategory.bind(null, 8)}>Обувь ручной работы</li>
								<li onClick={this.handleCategory.bind(null, 9)}>Одежда</li>
								<li onClick={this.handleCategory.bind(null, 10)}>Открытки</li>
								<li onClick={this.handleCategory.bind(null, 11)}>Подарки к праздникам</li>
								<li onClick={this.handleCategory.bind(null, 12)}>Посуда</li>
								<li onClick={this.handleCategory.bind(null, 13)}>Работы для детей</li>
								<li onClick={this.handleCategory.bind(null, 14)}>Национальный стиль</li>
								<li onClick={this.handleCategory.bind(null, 15)}>Свадебный салон</li>
								<li onClick={this.handleCategory.bind(null, 16)}>Субкультуры</li>
								<li onClick={this.handleCategory.bind(null, 17)}>Сувениры и подарки</li>
								<li onClick={this.handleCategory.bind(null, 18)}>Сумки и аксессуары</li>
								<li onClick={this.handleCategory.bind(null, 19)}>Украшения</li>
								<li onClick={this.handleCategory.bind(null, 20)}>Фен-шуй и эзотерика</li>
								<li onClick={this.handleCategory.bind(null, 21)}>Цветы и флористика</li>
							</ul>
						</div>
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
				? (<div className="all__product-insta" onClick={this.props.onClick}>
							<div className="all__author" >
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