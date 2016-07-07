import ReactDOM from 'react-dom';
import React from 'react';

import Masonry from 'react-masonry-component';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';

import './Profile.css';

var masonryOptions = {
	itemSelector: '.all__product',
	gutter: 20
};

function getStateFromFlux() {

    return {
		isLoading: UserStore.isLoading(),
		user: UserStore.getUsers()
	};
};

function got(thing) {
	return (thing !== undefined);
};

var Promoute = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

    	getInitialState() {	
    			let local = localStorage.getItem('userId');
				if (local === ""){
					local = -1;
					localStorage.setItem("userId", local);
				}
				else {
			    	local = parseInt(localStorage.getItem('userId'));
			    };	

			    if (local === -1 || local != 0)
	    			this.context.router.push(`/all`)
				return {
					user: ""
				};
		},

		
		componentDidMount: function() {
	        UserStore.addChangeListener(this._onChange);
		},

		componentWillMount() {
	        UserActions.loadUsers();
	    },

	    componentWillUnmount() {
    		UserStore.removeChangeListener(this._onChange);
	    },

	    handleClick(userData) {
	        userData.access = 1;
			console.log(userData);
    		UserActions.updateUserAccess(userData);
	    },


		render: function() {
			var { user } = this.state;
			var info = [];
			var prod = [];
			var tmpId = 0;

			for (let u of user) {
				if (u.access > 1)
					info.push(<div className="field" key={u.id}>
									<div className="subfield__title">{u.name}</div>
									<b>{u.email}</b>
									<div >{u.registerAt}</div>
									<button onClick={this.handleClick.bind(null, u)} >Повысить</button>
								</div>);
			};
			

				return (
						<div className="profile_page">
							<div className="profile_header" >
								
							</div>
							<div className="profile">
								{info}
							</div>
				            
							<Masonry
				                className='NotesGrid-profile'
				                options={ masonryOptions }
				                ref={function(c) {if (c) this.masonry = c.masonry;}.bind(this)}
				            >
			            
								<div className="profile__grid" ref="grid">{prod}</div>
							</Masonry>
						</div>
				)
		},

		_onChange() {
	        this.setState(getStateFromFlux());
	    }
});


var User = React.createClass({

		render: function() {
			 return <div className="all__product" onClick={this.props.onClick}>
						 <div className="all__photo">
							 <img src={this.props.product.image[0]} width="100%" /><div className="all__price">{this.props.product.price}₸</div>
						 </div>
						 <div className="all__info">
						 	 <h2>{this.props.product.name}</h2>
							 
						 </div>
				 	</div>
			 }
	});

export default Promoute;