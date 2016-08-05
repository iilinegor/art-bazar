import ReactDOM from 'react-dom';
import React from 'react';

import Notice from './Notice.jsx';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';


var Basket = React.createClass({
		getInitialState() {
			return {
				user: this.props.user,
				currentUser: this.props.currentUser,
				users: UserStore.getUsers(),
				products: ProductStore.getProducts(),
				is: false,
				code: 0
			}
		},

		handleBasketDelete(productId, authorId) {
			let { users, currentUser, products} = this.state;
			let user = users[authorId];
			
			currentUser.basket = currentUser.basket.filter((x) => {return x.productId !== productId});
			user.order = user.order.filter((x) => {return !((x.productId == productId) && (x.userId == currentUser.id)) });
			UserActions.updateUserBasket(currentUser);
			UserActions.updateUserBasket(user);

			users.map((x) => {if (x.id === currentUser.id) x = currentUser});
			
			this.setState({users: users});
		},

		handleOrderDelete(productId, userId) {
			let { users, currentUser, products} = this.state;
			let user = users[userId];

			user.basket = user.basket.filter((x) => {return x.productId !== productId});
			currentUser.order = currentUser.order.filter((x) => {return !((x.productId == productId) && (x.userId == user.id)) });
			UserActions.updateUserOrder(currentUser);
			UserActions.updateUserOrder(user);

			users.map((x) => {if (x.id === currentUser.id) x = currentUser});
			this.setState({users: users, is: !this.state.is, code: 3});
		},

		handleTest(code) {
	    	this.setState({is: !this.state.is, code: code});
	    },

		render() {
			let { user } = this.state;
			let { users, products } = this.state;

			//user = user.map((el) => {return <li>{el}</li>});
			let basketList = [],
				orderList = [];
			for (let b of user.basket){
					basketList.push(<div className="basket_item">
								<div style={{backgroundImage: 'url(' + products[b.productId].image[0] + ')', height: 150 + "px", width: 150 + "px", 
												backgroundSize: 100 + "% auto", backgroundPosition: "0% 50%" }}></div>
								<div onClick={this.handleBasketDelete.bind(null, b.productId, b.authorId)} className="basket_close">✖</div>
								<div>
									<p><b>{products[b.productId].name}</b></p> 
									<p>Цена: {products[b.productId].price}₸</p> 
									<p>Почта: {users[b.authorId].email}</p> 
									<p>от {users[b.authorId].name} <br/>{b.isOrder ? "сейчас готов к отправке" : <button onClick={this.handleTest.bind(null, 1)}>Заказать</button>}</p>
								</div>
									</div>);
				}


			for (let o of user.order){
					orderList.push(<div className="basket_item">
								<div style={{backgroundImage: 'url(' + products[o.productId].image[0] + ')', height: 150 + "px", width: 150 + "px", 
												backgroundSize: 100 + "% auto", backgroundPosition: "0% 50%" }}></div>
								<div onClick={this.handleOrderDelete.bind(null, o.productId, o.userId)} className="basket_close">✖</div>
								<div>
									<p>{products[o.productId].name}</p> 
									<p>{products[o.productId].price}₸</p> 
									<p>от {users[o.userId].name} <br/>{o.status ? "сейчас готов к отправке" : <button onClick={this.handleTest.bind(null, 2)}>Принять заказ</button>}</p>
								</div>
									</div>);
				}

			return (
					<div className="basket">
	 					{ this.state.is ?  <Notice close={this.handleTest} code={this.state.code}/> : "" }
						<div className="basket_list">					
							<h2 className="basket_title">Список покупок</h2>
							{basketList}
						</div>

						<div className="basket_list">
							<h2 className="basket_title">Список заказов</h2>
							{orderList}
						</div>
					</div>
				);
		}
	});

export default Basket;