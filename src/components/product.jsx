import ReactDOM from 'react-dom';
import React from 'react';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import Galery from './Galery.jsx';

import './style.css';

var currntImg = 0;

var typeList = [	
	"Аксессуары",
	"Для дома и интерьера",
	"Для домашних животных",
	"Канцелярские товары",
	"Картины и панно",
	"Косметика ручной работы",
	"Куклы и игрушки",
	"Музыкальные инструменты",
	"Обувь ручной работы",
	"Одежда",
	"Открытки",
	"Подарки к праздникам",
	"Посуда",
	"Работы для детей",
	"Национальный стиль",
	"Свадебный салон",
	"Субкультуры",
	"Сувениры и подарки",
	"Сумки и аксессуары",
	"Украшения",
	"Фен-шуй и эзотерика",
	"Цветы и флористика"
	];

function got(thing) {
	return (thing !== undefined);
};

function getStateFromFlux(productId) {
    return {
			productId: productId,
	        isLoading: ProductStore.isLoading(),
	        products: ProductStore.getProduct(productId)
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
    },

    componentWillUnmount() {
		ProductStore.removeChangeListener(this._onChange);
    },

	componentWillReciveProps(nextProps) {
		const { productId: prevId } = this.props.params;
		const { productId: nextId } = nextProps.params;

		if (prevId !== nextId) {
			this.setState({
				productId: nextId
			})
		}
	},

	render: function() {

		const { productId, products } = this.state;
		var prof = [];

		if (products){
				if (got(products.name))
					prof.push(<h1>{products.name}</h1>);

				if (got(products.image))
					prof.push( <Galery imagesArray={products.image}/> );

				if (got(products.price))
					prof.push( <div className="price"><b>Цена</b> {products.price} ₸</div> );

				if (got(products.description)){
						prof.push(<h2>Описание</h2>);
						prof.push(<p>{products.description}</p>);
					};

				
					if (got(products.type))
					prof.push( <div className="subfield">
											 <div className="subfield__title">Тип товара:</div> 
											 {typeList[products.type]}
										 </div>);

					if (got(products.craftTime))
					prof.push( <div className="subfield">
										 	<div className="subfield__title">Срок изготовления: </div> 
										 	{products.craftTime}
										 </div> );

					if (got(products.pay))
					prof.push( <div className="subfield">
											 <div className="subfield__title">Оплата: </div> 
											 {products.pay}
										 </div> );

					if (got(products.delivery))
					prof.push( <div className="subfield">
											 <div className="subfield__title">Доставка: </div>
											 {products.delivery}
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