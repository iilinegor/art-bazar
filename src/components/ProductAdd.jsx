import ReactDOM from 'react-dom';
import React from 'react';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import Galery from './Galery.jsx';

import './ProductAdd.css';

var currntImg = 0;
var tmpPhotos = ["", "", "", "", "", ""]

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
	    return {
			productId: 0,
			photos: [],
			length: ProductStore.getProducts().length,
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

	handleNewDelivery(event) {
		this.setState({ delivery : event.target.value });
	},

	handleNewPay(event) {
		this.setState({ pay : event.target.value });
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

	handleSubmit() {
	    	let {	    length, 
		    			name, 
		    			description,
		    			user, 
		    			type, 
		    			size, 
		    			material, 
		    			craftTime, 
		    			delivery, 
		    			pay, 
		    			price,
		    			photos 		} = this.state;
	    	
	    	// if (name && email && password) {
	    		console.log(user.id);
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
					delivery: delivery,
					pay: pay,
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
		if (true){
			return <div className="product" >
			 			
					 	<h1>Наименование продукта</h1>
					 	<input type="text" id="name" onChange={this.handleNewName} />

						<div className="photofield">
							<h2>Ссылки на фотографии</h2>
							<input type="text" id="photo-0" onChange={this.handlePushPhoto.bind(null, 0)}/>
							<input type="text" id="photo-1" onChange={this.handlePushPhoto.bind(null, 1)}/>
							<input type="text" id="photo-2" onChange={this.handlePushPhoto.bind(null, 2)}/>
							<input type="text" id="photo-3" onChange={this.handlePushPhoto.bind(null, 3)}/>
							<input type="text" id="photo-4" onChange={this.handlePushPhoto.bind(null, 4)}/>
							<input type="text" id="photo-5" onChange={this.handlePushPhoto.bind(null, 5)}/>
						</div>
						
						
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
								 <div className="subfield__title">Методы оплаты: </div> 
								 <input type="text" id="pay" onChange={this.handleNewPay}/>
							 </div>
							 <div className="subfield">
								 <div className="subfield__title">Доставка: </div>
								 <input type="text" id="delivery" onChange={this.handleNewDelivery}/>
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
									<option value={0}>Аксессуары</option>
									<option value={1}>Для дома и интерьера</option>
									<option value={2}>Для домашних животных</option>
									<option value={3}>Канцелярские товары</option>
									<option value={4}>Картины и панно</option>
									<option value={5}>Косметика ручной работы</option>
									<option value={6}>Куклы и игрушки</option>
									<option value={7}>Музыкальные инструменты</option>
									<option value={8}>Обувь ручной работы</option>
									<option value={9}>Одежда</option>
									<option value={10}>Открытки</option>
									<option value={11}>Подарки к праздникам</option>
									<option value={12}>Посуда</option>
									<option value={13}>Работы для детей</option>
									<option value={14}>Национальный стиль</option>
									<option value={15}>Свадебный салон</option>
									<option value={16}>Субкультуры</option>
									<option value={17}>Сувениры и подарки</option>
									<option value={18}>Сумки и аксессуары</option>
									<option value={19}>Украшения</option>
									<option value={20}>Фен-шуй и эзотерика</option>
									<option value={21}>Цветы и флористика</option>
								</select>
							 </div>
						 </div>
						 <button onClick={this.handleSubmit}>Поехали!</button>
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