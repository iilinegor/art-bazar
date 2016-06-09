import ReactDOM from 'react-dom';
import React from 'react';
import jquery from 'jquery';

import Masonry from 'react-masonry-component';

import MARKET from './db.js';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import './all.css';

var msnry;

	function getStateFromFlux() {
	    return {
		        isLoading: ProductStore.isLoading(),
		        Market: ProductStore.getProducts(),
		        currentMarket: ProductStore.getProducts()
			};
	};

	const masonryOptions = {
            itemSelector: '.all__product',
		  	gutter: 20
        };

	var All = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

		getInitialState() {
		    return getStateFromFlux();
		},

		componentWillMount() {
	        ProductActions.loadProducts();
	    },

	    componentWillUnmount() {
    		ProductStore.removeChangeListener(this._onChange);
	    },

		handleSearch: function(event) {
			var searchQuery = event.target.value.toLowerCase();
			var { Market } = this.state;
			var CurrentMarket = Market.filter( function (el){
				let location = el.location.toLowerCase();
				let name = el.name.toLowerCase();
				let description = el.description.toLowerCase();
				let material = el.material[0].toLowerCase();
				let type = el.type.toLowerCase();
				let subtype = el.subtype.toLowerCase();
				return ((location.indexOf(searchQuery) !== -1) || (name.indexOf(searchQuery) !== -1) || (description.indexOf(searchQuery) !== -1) || (material.indexOf(searchQuery) !== -1) || (type.indexOf(searchQuery) !== -1) || (subtype.indexOf(searchQuery) !== -1));
			});
			this.setState({
				currentMarket: CurrentMarket
			});
		},

		componentDidMount: function() {
	        ProductStore.addChangeListener(this._onChange);
		},

		componentDidUpdate() {
		},

		handleClick(productId) {
	        this.context.router.push(`/product/${productId}`);
	    },

		render() {
			var rows = [];
			var tmpId = 0;
			var Mark = this.state.currentMarket;
			for (let i of Mark) {
				{
			    	rows.push(<Product onClick={this.handleClick.bind(null, i.id)} product={i} key={tmpId++}/>);
					//tmpId++;
				}
			};

			return 	<div>
						<div className="all__search">
							<div className="all__searchField">
								<input type="text" onChange={this.handleSearch} />
							</div>
						</div>
						<Masonry
			                className='NotesGrid'
			                options={masonryOptions}
			                ref={function(c) {if (c) this.masonry = c.masonry;}.bind(this)}
			            >
							<div className="all__all" ref="grid">{rows}</div>
						</Masonry>
					</div>
			
		},

	    _onChange() {
	        this.setState(getStateFromFlux());
	    }
	});

	var Product = React.createClass({

		render: function() {
			 return <div className="all__product" onClick={this.props.onClick}>
						 <div className="all__photo">
							 <img src={this.props.product.image[0]} width="100%" /><div className="all__price">{MARKET[this.props.number].price}₸</div>
						 </div>
						 <div className="all__info">
						 	 <h2>{this.props.product.name}</h2>
							 
						 </div>
				 	</div>
			 }
	});

export default All;