import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import ProductFull from './components/product.jsx';
import All from './components/All.jsx';
import App from './App.jsx';
import Login from './components/Login.jsx';

import MARKET from './components/db.js';


ReactDOM.render(
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<Route path="/product/:productId" component={ProductFull}/>
					<Route path="/all" component={All}/>
					<Route path="/login" component={Login}/>
				</Route>
			</Router>,
			document.getElementById("content")
		);

