import ReactDOM from 'react-dom';
import React from 'react';

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
			if (i === this.props.imagesArray.length - 1)
				this.setState({currentImg : 0})
			else
				this.setState({currentImg : (i + 1)});
		};
	},

	render: function() {
		let currentImg = this.state.currentImg;
		let marketImages = this.props.imagesArray;
		if (marketImages !== []) {
				let rows = [];
				let i = 0;
				for (let img of marketImages) {
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
				return (<div className="galery" >
							<div className="galery__fullbox">
								<Image  src={marketImages[currentImg]}
										className="galery__full" 
										key={i} 
										onSelect={this.handleSelect.bind(null, currentImg)} />
							</div>
							<div className="galery__minbox">{rows}</div>								
						</div>);
			}
			else 
				return false;
	},
});


var Image = React.createClass({
	render: function() {
		return <img 
					src={this.props.src} 
					width={this.props.width} 
					onClick={this.props.onSelect} 
					className={this.props.className} 
				/>
	}
});

export default Galery;