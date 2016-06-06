import ReactDOM from 'react-dom';
import React from 'react';

import MARKET from './db.js';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import './style.css';

var currntImg = 0;

		function getStateFromFlux(productId) {
		    return {
					productId: productId,
			        isLoading: ProductStore.isLoading(),
			        products: ProductStore.getProduct(productId)[0]
				};
		};

		var Galery = React.createClass({
			getInitialState: function() {

				return {
					MARKET: "",
					currentImg : 0
				};
			},

			handleSelect: function(i) {
				if (i !== this.state.currentImg) 
					this.setState({currentImg : i})
				else {
					if (i === MARKET[this.props.number].image.length - 1)
						this.setState({currentImg : 0})
					else
						this.setState({currentImg : (i + 1)});
				};
			},

			render: function() {
				let currentImg = this.state.currentImg;
				let marketImage = MARKET[this.props.number].image;

				let rows = [];
				let i = 0;
				for (let img of marketImage) {
					if (i !== currentImg) 
				    	rows.push(<Image 
				    					src={img} 
				    					className="galery__min" 
				    					key={i} 
				    					onSelect={this.handleSelect.bind(null, i)}
				    			/>);
				    else
				    	rows.push(<Image src={img} className="galery__min_current" key={i} />);
				    i++;
				}
				return (<div className="galery" >
							<div className="galery__fullbox">
								<Image  src={marketImage[currentImg]}
										className="galery__full" 
										key={i} 
										onSelect={this.handleSelect.bind(null, currentImg)} />
							</div>
							<div className="galery__minbox">{rows}</div>								
						</div>);
			},
		});

		var Image = React.createClass({
			render: function() {
				return <img 
							src={this.props.src} 
							width={this.props.width} 
							onClick={this.props.onSelect} 
							className={this.props.className} 
						/>
			}
		});


		var ProductFull = React.createClass({
			getInitialState() {
				/*const { productId } = this.props.params;
				return {
					productId: productId,
			        isLoading: ProductStore.isLoading(),
			        product: ProductStore.getProduct(productId)
				};*/
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
								switch (products.delivery) {
									case "world":
									delivery.push(<li>Доставка по миру</li>);
				
									case "country":
									delivery.push(<li>Доставка по Казахстану</li>);
				
									case "region":
									delivery.push(<li>Доставка по области</li>);
				
									case "city":
									delivery.push(<li>Доставка по городу ({products.location})</li>);
				
									case "self":
									delivery.push(<li>Самовывоз</li>);
								}
				
								var material = [];
								for (let item of products.material)
											material.push(<li><a key={item} href={"http://en.wikipedia.org/material"}>{item}</a></li>);
				
				
				
								 return <div className="product" >
								 			
										 	<h1>{products.name}</h1>
				
											<Galery number={productId}/>
				
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
			<ProductFull number={Math.floor(Math.random() * (MARKET.length) + 0)} />,
			document.getElementById("content")
		);*/

export default ProductFull;