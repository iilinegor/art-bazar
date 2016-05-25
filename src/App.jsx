import ReactDOM from 'react-dom';
import React from 'react';

import MARKET from './components/db.js';

import './App.css';

var App = React.createClass({

		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

	    handleLogoClick: function(){
	    	this.context.router.push(`/all`);
	    },

		render: function() {
			return (
					<div className="app">
						<div className='header'>
							<img onClick={this.handleLogoClick} src="http://static.wixstatic.com/media/a026b6_c9cca4ab2ae748ad93e6886864d8518f.jpg/v1/fill/w_620,h_107/a026b6_c9cca4ab2ae748ad93e6886864d8518f.jpg"/>
		                </div>

						<div className='content'>
		                    {this.props.children}
		                </div>
					</div>
			);
		}
	});

export default App;