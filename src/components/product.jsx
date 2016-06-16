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
		if (products){
				
				 return <div className="product" >
				 			
						 	<h1>{products.name}</h1>

							<Galery imagesArray={products.image}/>

							<div className="price"><b>Цена</b> {products.price} р.</div>
							
						 	<h2>Описание</h2>
						 	<p>{products.description}</p>


							<div className="field">
								 <div className="subfield">
									 <div className="subfield__title">Тип товара:</div> 
									 {products.type}
								 </div>
								 <div className="subfield">
								 	<div className="subfield__title">Срок изготовления: </div> 
								 	{products.craftTime}
								 </div>
							 </div>

							 <div className="field">
								 <div className="subfield">
									 <div className="subfield__title">Оплата: </div> 
									 {products.pay}
								 </div>
								 <div className="subfield">
									 <div className="subfield__title">Доставка: </div>
									 {products.delivery}
								 </div>
							 </div>

							 <div className="field">
								 <div className="subfield">
									 <div className="subfield__title">Материалы:</div> 
									 {products.material}
								 </div>
								 <div className="subfield">
									 <div className="subfield__title">Размер: </div>
									 {products.size}
								 </div>								 
							 </div>
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
			<ProductFull number={Math.floor(Math.random() * (MARKET.length) + 0)} />,
			document.getElementById("content")
		);*/

export default ProductFull;