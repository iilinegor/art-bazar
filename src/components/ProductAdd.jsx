import ReactDOM from 'react-dom';
import React from 'react';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import Galery from './Galery.jsx';

import './ProductAdd.css';

var currntImg = 0;
var tmpPhotos = ["", "", "", "", "", ""]

function getStateFromFlux(productId) {
    return {
			productId: productId,
	        isLoading: ProductStore.isLoading(),
	        products: ProductStore.getProduct(productId)
		};
};

var ProductAdd = React.createClass({
	getInitialState() {
	    return {
			productId: 0,
	        isLoading: ProductStore.isLoading(),
	        products: ProductStore.getProduct(0),
	        photos: []
		};
	},

	componentWillMount() {
        ProductActions.loadProduct(0);
    },

    componentDidMount() {
        ProductStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
		ProductStore.removeChangeListener(this._onChange);
    },

	componentWillReciveProps(nextProps) {
		const { productId: prevId } = 0;
		const { productId: nextId } = 0;

		if (prevId !== nextId) {
			this.setState({
				productId: nextId
			})
		}
	},

	handlePushPhoto(number, event) {
		let tmp = [];
		tmpPhotos[number] = event.target.value;
		for (let photo of tmpPhotos)
			if (photo !== "")
				tmp.push(photo);
		this.setState({ photos : tmp });
	},

	 handleSubmit() {
	    // 	let {	    length, 
		   //  			name, 
		   //  			description, 
		   //  			type, 
		   //  			size, 
		   //  			material, 
		   //  			craftTime, 
		   //  			delivery, 
		   //  			pay, 
		   //  			price,
		   //  			photos 		} = this.state;
	    	
	    // 	// if (name && email && password) {
	    // 		let newProduct = {
					// id: length,
					// name : name,
					// description: description,
					// authorId: data.authorId,
					// type: type,
					// location: data.location,
					// size: size,
					// material: material,
					// craftTime: craftTime,
					// delivery: delivery,
					// pay: pay,
					// price: price,
					// image: photos
	    		// };
	    	// this.setState({ userId : length});
    		// ProductActions.createProduct(newProduct);
    		// localStorage.setItem('userId', newUser.id);
    		// this.context.router.push(`/all`);
	    //	};
	    },

	render: function() {
		const { productId, products, photos } = this.state;
		if (products){
			return <div className="product" >
			 			
					 	<h1>Наименование продукта</h1>
					 	<input type="text" id="name"/>

						<div className="photofield">
							<h2>Фотографии</h2>
							<input type="text" id="photo-0" onChange={this.handlePushPhoto.bind(null, 0)}/>
							<input type="text" id="photo-1" onChange={this.handlePushPhoto.bind(null, 1)}/>
							<input type="text" id="photo-2" onChange={this.handlePushPhoto.bind(null, 2)}/>
							<input type="text" id="photo-3" onChange={this.handlePushPhoto.bind(null, 3)}/>
							<input type="text" id="photo-4" onChange={this.handlePushPhoto.bind(null, 4)}/>
							<input type="text" id="photo-5" onChange={this.handlePushPhoto.bind(null, 5)}/>
						</div>
						
						
						<Galery imagesArray={photos}/>

						<h2>Цена</h2>
						<input type="text" id="price"/>
						
					 	<h2>Описание</h2>
					 	<input type="text" id="description"/>


						<div className="field">
							 <div className="subfield">
								 <div className="subfield__title">Размер: </div>
								 <input type="text" id="eurosize"/>
							 </div>
							 <div className="subfield">
							 	<div className="subfield__title">Срок изготовления: </div> 
							 	<input type="text" id="craftTime"/>
							 </div>
						 </div>

						 <div className="field">
							 <div className="subfield">
								 <div className="subfield__title">Методы оплаты: </div> 
								 <input type="text" id="pay"/>
							 </div>
							 <div className="subfield">
								 <div className="subfield__title">Доставка: </div>
								 <input type="text" id="delivery"/>
							 </div>
						 </div>

						 <div className="field">
							 <div className="subfield">
								 <div className="subfield__title">Материалы:</div> 
								 <input type="text" id="material"/>
							 </div>
						 </div>
				 	</div>
				 }
				 else return false;
	},

    _onChange() {
        this.setState(getStateFromFlux(0));
    }
});

		/*ReactDOM.render(
			<ProductAdd number={Math.floor(Math.random() * (MARKET.length) + 0)} />,
			document.getElementById("content")
		);*/

export default ProductAdd;