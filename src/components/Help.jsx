import ReactDOM from 'react-dom';
import React from 'react';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import './style.css';

var ProductForm = React.createClass({

	render() {
		return <div className="help">
					<h1>Помощь. Полный справочник <img className="sublogo" src="https://habrastorage.org/files/a73/493/c21/a73493c2123345fab0c322ae2dc39344.png"/></h1>
			   </div>;
	}
});


export default ProductForm;