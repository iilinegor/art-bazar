import ReactDOM from 'react-dom';
import React from 'react';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';

import Galery from './Galery.jsx';
import typeList from './List.js';

import Notice from './Notice.jsx';


import './style.css';

var currntImg = 0;

function got(thing) {
	return (thing !== undefined);
};

function getStateFromFlux(productId) {
		let local = parseInt(localStorage.getItem('userId'));
    return {
			productId: productId,
	        isLoading: ProductStore.isLoading(),
	        products: ProductStore.getProduct(productId),
	        user: ProductStore.getProduct(productId)? UserStore.getUser(ProductStore.getProduct(productId).authorId) : "",
		    currentUser: UserStore.getUser(local)

		};
};

var ProductFull = React.createClass({
	contextTypes: {
        router: React.PropTypes.object.isRequired
    },

	getInitialState() {
	    return getStateFromFlux(this.props.params.productId);
	},

	componentWillMount() {
        ProductActions.loadProducts();
    },

    componentDidMount() {
        ProductStore.addChangeListener(this._onChange);
        UserStore.addChangeListener(this._onChange);
        // UserActions.getUsers();
    },

    componentWillUnmount() {
		ProductStore.removeChangeListener(this._onChange);
		UserStore.removeChangeListener(this._onChange);
    },

	componentWillReciveProps(nextProps) {
		const { productId: prevId } = this.props.params;
		const { productId: nextId } = nextProps.params;

		if (prevId !== nextId) {
			this.setState({
				productId: nextId
			});
		}
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

    handleBasket() {
    	let { user, currentUser, products } = this.state;

    	currentUser.basket.push({
    			productId: products.id,
    			authorId: products.authorId,
    			isOrder: false
    	});
    	UserActions.updateUserBasket(currentUser);

    	user.order.push({
    			productId: products.id,
    			userId: currentUser.id,
    			status: 0
    	});
    	UserActions.updateUserOrder(user);
    	console.log(currentUser);
    	console.log(user);

    	this.setState({is: true});

    },

    handleProduct(productId) {
    	let id = productId;
        this.context.router.push(`/product/${productId}`);
        this.setState(getStateFromFlux(productId));
    },

    handleTest() {
    	this.setState({is: !this.state.is});
    },

	render: function() {

		const { productId, products, user, currentUser } = this.state;
		var prof = [];
		let other = [];
		let category = [];
		let payList = ["Банковский перевод", "Денежный перевод", "Наложенный платёж", "Наличные"];
		let deliveryList = ["Почтой по Казахстану", "Доставка по городу", "Самовывоз"];

		for (let c of typeList) {
			for (let cat of c.cats)
				category.push(cat);
		};




		if (products && user){
				for (let p of ProductStore.getProducts()) {
					if (p.authorId === products.authorId)
						other.push(<img src={p.image[0]} onClick={this.handleProduct.bind(null, p.id)} className="other__min" title={p.name}/>);
				};

				// prof.push(<div className="other__minbox">{other}</div>);

				if (got(products.name))
					prof.push(<h1>{products.name}</h1>);

				prof.push( <div className="author" >
									<br/>
									<img src={user.photo} className="img" onClick={this.handleClickAuthor.bind(null, products.authorId)}/> 
									<br/>
										<h2>{user.name}</h2>
										<div className="other__minbox">{other}</div>
								</div> );

				if (got(products.image))
					prof.push( <Galery imagesArray={products.image}/> );

				if (got(products.price))
					prof.push( <div className="price"><b>Цена</b> {products.price} ₸</div> );



					prof.push( <div className="likes" onClick={this.handleLike.bind(null, products)} >{"❤"} {products.likes}</div> );

				if (got(products.description)){
						prof.push(<h2>Описание</h2>);
						prof.push(<p>{products.description}</p>);
					};

				
					if (got(products.type))
					prof.push( <div className="subfield">
											 <div className="subfield__title">Тип товара:</div> 
											 {category[products.type]}
										 </div>);

					if (got(products.craftTime))
					prof.push( <div className="subfield">
										 	<div className="subfield__title">Срок изготовления: </div> 
										 	{products.craftTime}
										 </div> );

					if (got(user.pay))
					prof.push( <div className="subfield">
											 <div className="subfield__title">Оплата: </div> 
											 {payList[parseInt(user.pay)]}
										 </div> );

					if (got(user.delivery))
					prof.push( <div className="subfield">
											 <div className="subfield__title">Доставка: </div>
											 {deliveryList[parseInt(user.delivery)]}
										 </div> );

					if (got(products.material))
					prof.push( <div className="subfield">
											 <div className="subfield__title">Материалы:</div> 
											 {products.material}
										 </div> );

					if (got(products.size))
					prof.push( <div className="subfield">
											 <div className="subfield__title">Размер: </div>
											 {products.size}
										 </div>	 );

					if (currentUser.id !== products.authorId)
						prof.push(<div><br/><button onClick={this.handleBasket}> В корзину </button></div>);

		};


		

		if (products){
				 return <div>
							 <div className="profile_header" >

							</div>
					 		<div className="product" >
				 				{ this.state.is ?  <Notice close={this.handleTest} code={0}/> : "" }
								{prof}
						 	</div>}
					 	</div>}
				else {
					return false;
				}
	},

    _onChange() {
        this.setState(getStateFromFlux(this.props.params.productId));
    }
});

export default ProductFull;