import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import ProductFull from './components/product.jsx';
import All from './components/All.jsx';
import MARKET from './components/db.js';
import App from './App.jsx';


ReactDOM.render(
			<Router history={hashHistory}>
				<Route path="/" component={App}/>
				<Route path="/product" component={ProductFull}/>
				<Route path="/all" component={All}/>
			</Router>,
			document.getElementById("content")
		);

