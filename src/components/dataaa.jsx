import ReactDOM from 'react-dom';
import React from 'react';

import MARKET from './db.js';
import USERS from './users.js';
import mongoose from "mongoose";

import './Profile.css';

var Dataaa = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

    	getInitialState() {
    		var mongoose = require('mongoose');
			mongoose.connect('mongodb://localhost/market');

			var marketSchema = mongoose.Schema({
			    id: Number,
				name: String,
				description: String,
				authorId: Number,
				type: String,
				subtype: String,
				location: String,
				color: String,
				size: {
					width: Number,
					height: Number,
					diametr: String,
					tall: String,
					eurosize: String
				},
				material: [ String ],
				craftTime: Number,
				delivery: String,
				pay: [ String ],
				price: Number,
				views: Number,
				bays: Number,
				image: [ String ]
			});

			var Market = mongoose.model('Market', marketSchema);

			Market.find(function (err, mark) {
			  if (err) return console.error(err);
			  console.log(mark);
			  market = mark;
			});
			return {
				market: market
			};
		},

		componentWillMount: function () {

		},

		render: function() {
			var { market } = this.state;

			return (
					<div className="profile">
						{market}
					</div>
				);
		}
});

export default Dataaa;