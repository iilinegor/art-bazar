import ReactDOM from 'react-dom';
import React from 'react';
import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone'
import { apiPrefix } from '../../etc/config.json';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import typeList from './List.js';
import Galery from './Galery.jsx';



import './ProductAdd.css';

var currntImg = 0;
var tmpPhotos = ["", "", "", "", "", ""];
			var inputs = [];
// tmpPhotos.addChangeListener(function ());


function getStateFromFlux() {
    return {
			length: ProductStore.getProducts().length
		};
};

	

var ProductAdd = React.createClass({
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

	  //   if (local === -1 || local != 0)
			// this.context.router.push(`/all`);
			console.log(ProductStore.getProduct(ProductStore.getProducts().length - 1).id + 1);
	    return {
			productId: 0,
			photos: [],
			length: ProductStore.getProduct(ProductStore.getProducts().length - 1).id + 1,
			user: localStorage.getItem('userId')
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
		this.setState({ photos : tmp });
	},

	handleTmpUpdate(value){
		let searching = true;
		inputs = [];
		for (let i = 0; i < 6; i++) {
				if (tmpPhotos[i] === "" && searching){
					searching = false;
					tmpPhotos[i] = value;
				};

				inputs.push(<input type="text" id={`photo-${i}`} onChange={this.handlePushPhoto.bind(null, i)} value={tmpPhotos[i]}/>);
			};
	},

	handleSubmit() {
	    	let {	    length, 
		    			name, 
		    			description,
		    			user, 
		    			type, 
		    			size, 
		    			material, 
		    			craftTime, 
		    			price,
		    			photos 		} = this.state;
	    	
	    	// if (name && email && password) {
	    		console.log(user);
	    		let newProduct = {
					id: length,
					name : name,
					description: description,
					authorId: user,
					type: type,
					/*location: data.location,*/
					size: size,
					material: material,
					craftTime: craftTime,
					price: price,
					image: photos,
					likes: 0
	    		};
			//this.setState({ userId : length});
    		ProductActions.createProduct(newProduct);
			//localStorage.setItem('userId', newUser.id);
    		this.context.router.push(`/all`);
	},

	render: function() {
		const { productId, products, photos } = this.state;
		var category = [];
		var tmpId = 0;





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
				scope.setState({ photos : tmp });
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
					 	<input type="text" id="name" onChange={this.handleNewName} />

						<div className="photofield">
							<h2>Фотографии</h2>
							<DropzoneComponent config={componentConfig}
		                       eventHandlers={eventHandlers}
		                       djsConfig={djsConfig} />
							{inputs}
						</div>
						
						<br/>
						<Galery imagesArray={photos}/>

						<h2>Цена</h2>
						<input type="text" id="price" onChange={this.handleNewPrice}/>
						
					 	<h2>Описание</h2>
					 	<input type="text" id="description" onChange={this.handleNewDescription}/>


						<div className="field">
							 <div className="subfield">
								 <div className="subfield__title">Размер: </div>
								 <input type="text" id="eurosize" onChange={this.handleNewSize}/>
							 </div>
							 <div className="subfield">
							 	<div className="subfield__title">Срок изготовления: </div> 
							 	<input type="text" id="craftTime" onChange={this.handleNewCraftTime}/>
							 </div>
						 </div>

						 <div className="field">
							 <div className="subfield">
								 <div className="subfield__title">Материалы:</div> 
								 <input type="text" id="material" onChange={this.handleNewMaterial}/>
							 </div>
							 <div className="subfield">
								 <div className="subfield__title">Тип товара:</div> 
								 <select onChange={this.handleNewType}>
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

		/*ReactDOM.render(
			<ProductAdd number={Math.floor(Math.random() * (MARKET.length) + 0)} />,
			document.getElementById("content")
		);*/

export default ProductAdd;