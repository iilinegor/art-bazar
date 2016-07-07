import ReactDOM from 'react-dom';
import React from 'react';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';

import Galery from './Galery.jsx';
import typeList from './List.js';

import './style.css';

var currntImg = 0;

function got(thing) {
	return (thing !== undefined);
};

function getStateFromFlux(productId) {
    return {
			productId: productId,
	        isLoading: ProductStore.isLoading(),
	        products: ProductStore.getProduct(productId),
	        user: ProductStore.getProduct(productId)? UserStore.getUser(ProductStore.getProduct(productId).authorId) : "",

		};
};

var ProductFull = React.createClass({
	getInitialState() {
	    return getStateFromFlux(this.props.params.productId);
	},

	componentWillMount() {
        ProductActions.loadProduct(this.props.params.productId);
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

	render: function() {

		const { productId, products, user } = this.state;
		var prof = [];
		let payList = ["Банковский перевод", "Денежный перевод", "Наложенный платёж", "Наличные"];
		let deliveryList = ["Почтой по Казахстану", "Доставка по городу", "Самовывоз"];

		if (products && user){
				if (got(products.name))
					prof.push(<h1>{products.name}</h1>);

				prof.push( <div className="author">
									<br/>
									<img src={user.photo} onClick={this.handleProfile} /> 
									<br/>
										<h2>{user.name}</h2>
								</div> );

				if (got(products.image))
					prof.push( <Galery imagesArray={products.image}/> );

				if (got(products.price))
					prof.push( <div className="price"><b>Цена</b> {products.price} ₸</div> );



					prof.push( <div className="likes">{"❤"} {products.likes}</div> );

				if (got(products.description)){
						prof.push(<h2>Описание</h2>);
						prof.push(<p>{products.description}</p>);
					};

				
					if (got(products.type))
					prof.push( <div className="subfield">
											 <div className="subfield__title">Тип товара:</div> 
											 {products.type}
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
		};
		

		if (products){
				 return <div className="product" >
							 {prof}
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