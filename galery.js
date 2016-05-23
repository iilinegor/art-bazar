var Galery = React.createClass({
			getInitialState: function() {
				return {
					currentImg : 0
				};
			},

			handleSelect: function(i) {
				if (i !== this.state.currentImg) 
					this.setState({currentImg : i})
				else {
					if (i === MARKET[this.props.number].image.length - 1)
						this.setState({currentImg : 0})
					else
						this.setState({currentImg : (i + 1)});
				};
			},

			render: function() {
				let currentImg = this.state.currentImg;
				let marketImage = MARKET[this.props.number].image;

				let rows = [(<Image src={marketImage[currentImg]} className="galery__full" key={i}  onSelect={this.handleSelect.bind(null, currentImg)}  />)];
				let i = 0;
				for (let img of marketImage) {
					if (i !== currentImg) 
				    	rows.push(<Image 
				    					src={img} 
				    					className="galery__min" 
				    					key={i} 
				    					onSelect={this.handleSelect.bind(null, i)}
				    			/>);
				    else
				    	rows.push(<Image src={img} className="galery__min_current" key={i} />);
				    i++;
				}
				return <div className="galery" >{rows}</div>;
			},
		});