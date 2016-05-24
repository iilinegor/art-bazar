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
				var searchValue = el.id;
				return searchValue >= searchQuery;
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
						<input type="text" className="searchField" onChange={this.handleSearch} />
						<div className="all" ref="grid">{rows}</div>
					</div>
			;
		}
	});

	var Product = React.createClass({

		render: function() {
			 return <div className="product">
						 <div className="photo">
							 <img src={MARKET[this.props.number].image[0]} width="100%" />
						 </div>
						 <div className="info">
						 	 <h2>{MARKET[this.props.number].name} ({MARKET[this.props.number].id + 1})</h2>
							 <div className="price">{MARKET[this.props.number].price}₸</div>
						 </div>
				 	</div>
			 }
	});

	/*ReactDOM.render(
				<All />,
		document.getElementById("content")
	);*/