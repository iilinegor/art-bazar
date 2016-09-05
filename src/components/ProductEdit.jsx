import ReactDOM from 'react-dom';
import React from 'react';
import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone'
import { apiPrefix } from '../../etc/config.json';

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

var currntImg = 0;
var tmpPhotos = ["", "", "", "", "", ""];
var inputs = [];


function getStateFromFlux() {
    return {

		};
};


var ProductEdit = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState() {
		let local = localStorage.getItem('userId');
		if (local === ""){
			local = -1;
			localStorage.setItem("userId", local);
		}
		else {
	    	local = parseInt(localStorage.getItem('userId'));
	    };	


		// ProductStore.getProducts().filter((x) => {if (x.id > max) max = x.id});
		// 	console.log(max + 1);	
		
		console.log(ProductStore.getProduct(parseInt(this.props.params.productId)));
		console.log(this.props.params.productId);
		let product = ProductStore.getProduct(parseInt(this.props.params.productId));
		tmpPhotos = product.image;
	    return {
			productId: 0,
			// photos: [],
			user: localStorage.getItem('userId'),
			product: product,
			id: product.id,
			name: product.name ,
			description: product.description,
			authorId: product.authorId,
			type: product.type,
			size: product.size,
			material: product.material,
			craftTime: product.craftTime,
			price: product.price,
			image: product.image,
		};
	},

	componentWillMount() {
        ProductActions.loadProducts();
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

	handleNewName(event) {
		this.setState({ name : event.target.value });
	},

	handleNewDescription(event) {
		this.setState({ description : event.target.value });
	},

	handleNewType(event) {
		this.setState({ type : event.target.value });
	},

	handleNewSize(event) {
		this.setState({ size : event.target.value });
	},

	handleNewMaterial(event) {
		this.setState({ material : event.target.value });
	},

	handleNewCraftTime(event) {
		this.setState({ craftTime : event.target.value });
	},

	handleNewPrice(event) {
		this.setState({ price : event.target.value });
	},

	handlePushPhoto(number, event) {
		let tmp = [];
		tmpPhotos[number] = event.target.value;
		for (let photo of tmpPhotos)
			if (photo !== "")
				tmp.push(photo);
		this.setState({ image : tmp });
	},

	handleTmpUpdate(value){
		let searching = true;
		inputs = [];
		for (let i = 0; i < 6; i++) {
				if ((tmpPhotos[i] === "" || tmpPhotos[i] === undefined) && searching){
					searching = false;
					tmpPhotos[i] = value;
				};

				inputs.push(<input type="text" id={`photo-${i}`} onChange={this.handlePushPhoto.bind(null, i)} value={tmpPhotos[i]}/>);
			};
	},

	handleSubmit() {
	    	let {	    id, 
		    			name, 
		    			description,
		    			user, 
		    			type, 
		    			size, 
		    			material, 
		    			craftTime, 
		    			price,
		    			image 		} = this.state;
	    	
	    	// if (name && email && password) {
	    		console.log(user);
	    		let newProduct = {
					id: id,
					name : name,
					description: description,
					authorId: user,
					type: type,
					size: size,
					material: material,
					craftTime: craftTime,
					price: price,
					image: image,
					likes: 0
	    		};
			//this.setState({ userId : length});
    		ProductActions.updateProduct(newProduct);
			//localStorage.setItem('userId', newUser.id);
    		this.context.router.push(`/all`);
	},

	render: function() {
		const { productId, products, image } = this.state;
		var category = [];
		var tmpId = 0;

		// let {	    length, 
		//     			name, 
		//     			description,
		//     			user, 
		//     			type, 
		//     			size, 
		//     			material, 
		//     			craftTime, 
		//     			price	} = this.state;


					var componentConfig = {
					    iconFiletypes: ['.jpg', '.png', '.gif'],
					    showFiletypeIcon: true,
					    postUrl: `${apiPrefix}/upload`
					};

					var djsConfig = {
					    addRemoveLinks: true,
					    acceptedFiles: "image/jpeg,image/png,image/gif"
					};

					function sucRes(props, res){
						let searching = true;
						inputs = [];
						for (let i = 0; i < 6; i++) {
								if (tmpPhotos[i] === "" && searching){
									searching = false;
									tmpPhotos[i] = res.responseText;
								};
								let tmp = [];
								for (let photo of tmpPhotos)
									if (photo !== "")
										tmp.push(photo);
								scope.setState({ image : tmp });
								// inputs.push(<input type="text" id={`photo-${i}`} onChange={this.handlePushPhoto.bind(null, i)} value={tmpPhotos[i]}/>);
							};

						console.log(res.responseText);
					};

					var scope = this;

					var eventHandlers = {
					    success: sucRes
					};


		for (let c of typeList) {
				category.push( <option disabled>{c.group}</option> );
				for (let cat of c.cats)
					category.push( <option value={tmpId++}>{cat}</option> );
			};

		if (true){
				inputs = [];
				for (let i = 0; i < 6; i++) {
					inputs.push(<input type="text" id={`photo-${i}`} onChange={this.handlePushPhoto.bind(null, i)} value={tmpPhotos[i]}/>);
				};

			
			return <div className="product" >
			 			
					 	<h1>Наименование продукта</h1>
					 	<input type="text" id="name" onChange={this.handleNewName} value={this.state.name}/>

						<div className="photofield">
							<h2>Фотографии</h2>
							<DropzoneComponent config={componentConfig}
		                       eventHandlers={eventHandlers}
		                       djsConfig={djsConfig} />
							{inputs}
						</div>
						
						<br/>
						<Galery imagesArray={image}/>

						<h2>Цена</h2>
						<input type="text" id="price" onChange={this.handleNewPrice} value={this.state.price}/>
						
					 	<h2>Описание</h2>
					 	<input type="text" id="description" onChange={this.handleNewDescription} value={this.state.description}/>


						<div className="field">
							 <div className="subfield">
								 <div className="subfield__title">Размер: </div>
								 <input type="text" id="eurosize" onChange={this.handleNewSize} value={this.state.size}/>
							 </div>
							 <div className="subfield">
							 	<div className="subfield__title">Срок изготовления: </div> 
							 	<input type="text" id="craftTime" onChange={this.handleNewCraftTime} value={this.state.craftTime}/>
							 </div>
						 </div>

						 <div className="field">
							 <div className="subfield">
								 <div className="subfield__title">Материалы:</div> 
								 <input type="text" id="material" onChange={this.handleNewMaterial} value={this.state.material}/>
							 </div>
							 <div className="subfield">
								 <div className="subfield__title">Тип товара:</div> 
								 <select onChange={this.handleNewType} value={this.state.type}> 
									{category}
								</select>
							 </div>
						 </div>
						 <button className="toBasket" onClick={this.handleSubmit}>Поехали!</button>
				 	</div>
				 }
				 else return false;
	},

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default ProductEdit;