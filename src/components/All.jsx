import ReactDOM from 'react-dom';
import React from 'react';
import jquery from 'jquery';

import Masonry from 'react-masonry-component';
import typeList from './List.js';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';


import './all.css';

// var typeList = [	
// 	"Аксессуары",
// 	"Для дома и интерьера",
// 	"Для домашних животных",
// 	"Канцелярские товары",
// 	"Картины и панно",
// 	"Косметика ручной работы",
// 	"Куклы и игрушки",
// 	"Музыкальные инструменты",
// 	"Обувь ручной работы",
// 	"Одежда",
// 	"Открытки",
// 	"Подарки к праздникам",
// 	"Посуда",
// 	"Работы для детей",
// 	"Национальный стиль",
// 	"Свадебный салон",
// 	"Субкультуры",
// 	"Сувениры и подарки",
// 	"Сумки и аксессуары",
// 	"Украшения",
// 	"Фен-шуй и эзотерика",
// 	"Цветы и флористика"
// 	];

// var typeList = [	
// 		{
// 			id: 0,
// 			group: "Аксессуары",
// 			cats: [
// 				"Головные уборы",
// 				"Брелоки",
// 				"Галстуки",
// 				"Наборы",
// 				"Сумки"
// 			]
// 		},

// 		{
// 			id: 1,
// 			group: "Интерьер",
// 			cats: [
// 				"Статуэтки",
// 				"Картины",
// 				"Светильники",
// 				"Кухня",
// 				"Прихожая"
// 			]
// 		},

// 		{
// 			id: 2,
// 			group: "Косметика",
// 			cats: [
// 				"Тело",
// 				"Лицо",
// 				"Волосы",
// 				"Наборы"
// 			]
// 		},

// 		{
// 			id: 3,
// 			group: "Куклы и игрушки",
// 			cats: [
// 				"Тильды",
// 				"Тыквоголовки",
// 				"Животые",
// 				"Развивающие"
// 			]
// 		},

// 		{
// 			id: 4,
// 			group: "Обувь",
// 			cats: [
// 				"Летняя",
// 				"Зимняя",
// 				"Демисезонная"
// 			]
// 		},

// 		{
// 			id: 5,
// 			group: "Материалы для творчества",
// 			cats: [
// 				"Шитьё",
// 				"Вязание",
// 				"Валяние",
// 				"Скрапбукинг",
// 				"Флористика",
// 				"Упаковка",
// 				"Куклы",
// 				"Декупаж",
// 				"Украшения",
// 				"Вышивка",
// 				"Обучающие материалы",
// 				"Другое",
// 			]
// 		},
// 	];

var msnry;

	function isBiggerThan10(element, index, array) {
		  return element > 10;
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
		        type: -1
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

		render() {
			var rows = [];
			var category = [];
			var viewButton = [];
			var tmpId = 0;
			var Mark = this.state.currentMarket;
			let { isInsta } = this.state; 

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

				category.push(<li onClick={this.handleCategory.bind(null, -1)}>Все</li>);

			for (let c of typeList) {
				category.push(<p>{c.group}</p>)
				for (let cat of c.cats)
					category.push(<li key={tmpId} onClick={this.handleCategory.bind(null, tmpId++)}>{cat}</li>);

			}

			!isInsta
						? viewButton.push(<img src="https://habrastorage.org/files/252/597/360/2525973609d443808e4c7adff2f51635.png" />)
						: viewButton.push(<img src="https://habrastorage.org/files/6ca/207/06d/6ca20706d9fe42dd8fe091ef308c830c.png" />);

			return 	<div>
						<div className="all__search">
							<div className="all__searchField">	
								<div onClick={this.handleChangeView} className="all__viewButton">
									{viewButton} 
								</div>
								<input type="text" onChange={this.handleSearch} />
							</div>
						</div>
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