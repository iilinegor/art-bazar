import ReactDOM from 'react-dom';
import React from 'react';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import Galery from './Galery.jsx';

import './style.css';

var currntImg = 0;

function getStateFromFlux(productId) {
    return {
			productId: productId,
	        isLoading: ProductStore.isLoading(),
	        products: ProductStore.getProduct(productId)
		};
};

var ProductAdd = React.createClass({
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
		if (products){
						var pay = [];
						for (let item of products.pay)
									pay.push(<li key={item}>{item}</li>);
		
						var delivery = [];
						var del = 0;
						switch (products.delivery) {
							case "world":
							delivery.push(<li key={del}>Доставка по миру</li>);
							del++;

							case "country":
							delivery.push(<li key={del}>Доставка по Казахстану</li>);
							del++;
		
							case "region":
							delivery.push(<li key={del}>Доставка по области</li>);
							del++;
		
							case "city":
							delivery.push(<li key={del}>Доставка по городу ({products.location})</li>);
							del++;
		
							case "self":
							delivery.push(<li key={del}>Самовывоз</li>);
						}
		
						var material = [];
						for (let item of products.material)
									material.push(<li key={item}><a href={"http://en.wikipedia.org/material"}>{item}</a></li>);
		
		
		
						 return <div className="product" >
						 			
								 	<h1>{products.name}</h1>
		
									<Galery imagesArray={products.image}/>
		
									<div className="price"><b>Цена</b> {products.price} р.</div>
									
								 	<h2>Описание</h2>
								 	<p>{products.description}</p>
		
		
									<div className="field">
										 <div className="subfield">
											 <div className="subfield__title">Размер: </div>
											 {products.size.eurosize}
										 </div>
										 <div className="subfield">
										 	<div className="subfield__title">Срок изготовления: </div> 
										 	{products.craftTime == 0 ? "Готовая работа" : products.craftTime}
										 </div>
									 </div>
		
									 <div className="field">
										 <div className="subfield">
											 <div className="subfield__title">Оплата: </div> 
											 {pay}
										 </div>
										 <div className="subfield">
											 <div className="subfield__title">Доставка: </div>
											 {delivery}
										 </div>
									 </div>
		
									 <div className="field">
										 <div className="subfield">
											 <div className="subfield__title">Материалы:</div> 
											 {material}
										 </div>
									 </div>
		
									 <div>{products.views} просмотров</div>
							 	</div>}
				else {
					return false;
				}
	},

    _onChange() {
        this.setState(getStateFromFlux(this.props.params.productId));
    }
});

		/*ReactDOM.render(
			<ProductAdd number={Math.floor(Math.random() * (MARKET.length) + 0)} />,
			document.getElementById("content")
		);*/

export default ProductAdd;