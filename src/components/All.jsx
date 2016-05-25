import ReactDOM from 'react-dom';
import React from 'react';
import jquery from 'jquery';

import MARKET from './db.js';


require('./vender/masonry.pkgd.js');
require('./vender/imagesloaded.pkgd.js');

import './all.css';

var msnry;

	var All = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

		getInitialState: function() {
			return {
				currentMarket: MARKET
			};
		},

		handleSearch: function(event) {
			var searchQuery = event.target.value.toLowerCase();
			var CurrentMarket = MARKET.filter( function (el){
				var location = el.location.toLowerCase();
				var name = el.name.toLowerCase();
				var description = el.description.toLowerCase();
				var material = el.material[0].toLowerCase();
				var type = el.type.toLowerCase();
				var subtype = el.subtype.toLowerCase();
				return ((location.indexOf(searchQuery) !== -1) || (name.indexOf(searchQuery) !== -1) || (description.indexOf(searchQuery) !== -1) || (material.indexOf(searchQuery) !== -1) || (type.indexOf(searchQuery) !== -1) || (subtype.indexOf(searchQuery) !== -1));
			});
			this.setState({
				currentMarket: CurrentMarket
			});
		},

		componentDidMount: function() {
			var elem = this.refs.grid;
			this.msnry = new Masonry( elem, {
			  itemSelector: '.all__product',
			  gutter: 20
			});

			imagesLoaded(elem).on('progress', () => {
			  this.msnry.layout();
			});

		},

		componentDidUpdate: function(prevProps) {
			this.msnry.reloadItems();
			this.msnry.layout();
		},

		handleClick(productId) {
	        this.context.router.push(`/product/${productId}`);
	    },

		render: function(){
			let rows = [];
			var Mark = this.state.currentMarket;
			for (let i of Mark) {
			    rows.push(<Product onClick={this.handleClick.bind(null, i.id)} number={i.id} key={i.id}/>);
			}

			return 	<div>
						<div className="all__search">
							<div className="all__searchField">
								<input type="text" onChange={this.handleSearch} />
							</div>
						</div>
						<div className="all__all" ref="grid">{rows}</div>
					</div>
			;
		}
	});

	var Product = React.createClass({

		render: function() {
			 return <div className="all__product" onClick={this.props.onClick}>
						 <div className="all__photo">
							 <img src={MARKET[this.props.number].image[0]} width="100%" /><div className="all__price">{MARKET[this.props.number].price}₸</div>
						 </div>
						 <div className="all__info">
						 	 <h2>{MARKET[this.props.number].name}</h2>
							 
						 </div>
				 	</div>
			 }
	});

export default All;