import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

import All from './components/All.jsx';
import ProductFull from './components/product.jsx';
import Login from './components/Login.jsx';
import Help from './components/Help.jsx';
import Likes from './components/Likes.jsx';
import Profile from './components/Profile.jsx';
import Profile_basket from './components/Basket.jsx';
import Profile_likes from './components/Likes.jsx';
import Promoute from './components/Promoute.jsx';
import ProductAdd from './components/ProductAdd.jsx';
import ProductEdit from './components/ProductEdit.jsx';
import UserAccepting from './components/UserAccepting.jsx';
import AboutMe from './components/AboutMe.jsx';
import App from './App.jsx';

ReactDOM.render(
			<Router history={hashHistory}>
				<Route path="/login" component={Login}/>
				<Route path="/" component={App}>
					<IndexRedirect to="/all" />
					<Route path="/product/:productId" component={ProductFull}/>
					<Route path="/all" component={All}/>
					<Route path="/help" component={Help}/>
					<Route path="/likes" component={Profile_likes}/>
					<Route path="/add" component={ProductAdd}/>
					<Route path="/edit/:productId" component={ProductEdit}/>
					<Route path="/users" component={UserAccepting}/>
					<Route path="/profile/:userId" component={Profile} />
					<Route path="/basket" component={Profile_basket}/>
					<Route path="/Promoute" component={Promoute}/>
				</Route>
				<Route path="/about" component={AboutMe}/>

			</Router>,
			document.getElementById("content")
		);

