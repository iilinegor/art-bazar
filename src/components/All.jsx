import ReactDOM from 'react-dom';
import React from 'react';
import jquery from 'jquery';

import MARKET from './db.js';


require('./vender/masonry.pkgd.js');
require('./vender/imagesloaded.pkgd.js');

require('./all.css');

var msnry;

	var All = React.createClass({

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
			  itemSelector: '.product',
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

		render: function(){
			let rows = [];
			var Mark = this.state.currentMarket;
			for (let i of Mark) {
			    rows.push(<Product number={i.id} key={i.id}/>);
			}

			return 	<div>
						<div className="search">
							<div className="searchField">
								<input type="text" onChange={this.handleSearch} />
							</div>
						</div>
						<div className="all" ref="grid">{rows}</div>
					</div>
			;
		}
	});

	var Product = React.createClass({

		render: function() {
			 return <div className="product">
						 <div className="photo">
							 <img src={MARKET[this.props.number].image[0]} width="100%" /><div className="price">{MARKET[this.props.number].price}₸</div>
						 </div>
						 <div className="info">
						 	 <h2>{MARKET[this.props.number].name}</h2>
							 
						 </div>
				 	</div>
			 }
	});

export default All;