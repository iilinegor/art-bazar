import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import All from './components/All.jsx';
import ProductFull from './components/product.jsx';
import Login from './components/Login.jsx';
import Help from './components/Help.jsx';
import Likes from './components/Likes.jsx';
import Profile from './components/Profile.jsx';
import Promoute from './components/Promoute.jsx';
import ProductAdd from './components/ProductAdd.jsx';
import UserAccepting from './components/UserAccepting.jsx';
import App from './App.jsx';

ReactDOM.render(
			<Router history={hashHistory}>
				<Route path="/login" component={Login}/>
				<Route path="/" component={App}>
					<Route path="/product/:productId" component={ProductFull}/>
					<Route path="/all" component={All}/>
					<Route path="/help" component={Help}/>
					<Route path="/likes" component={Likes}/>
					<Route path="/add" component={ProductAdd}/>
					<Route path="/users" component={UserAccepting}/>
					<Route path="/profile/:userId" component={Profile}/>
					<Route path="/Promoute" component={Promoute}/>
				</Route>
			</Router>,
			document.getElementById("content")
		);

