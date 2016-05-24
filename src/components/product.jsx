import ReactDOM from 'react-dom';
import React from 'react';

import MARKET from './db.js';


require('./style.css');

var currntImg = 0;

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

				let rows = [];
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
				return (<div className="galery" >
							<div className="galery__fullbox">
								<Image  src={marketImage[currentImg]}
										className="galery__full" 
										key={i} 
										onSelect={this.handleSelect.bind(null, currentImg)} />
							</div>
							<div className="galery__minbox">{rows}</div>								
						</div>);
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


		var ProductFull = React.createClass({
			render: function() {

				var pay = [];
				for (let item of MARKET[this.props.number].pay)
							pay.push(<li key={item}>{item}</li>);

				var delivery = [];
				switch (MARKET[this.props.number].delivery) {
					case "world":
					delivery.push(<li>Доставка по миру</li>);

					case "country":
					delivery.push(<li>Доставка по Казахстану</li>);

					case "region":
					delivery.push(<li>Доставка по области</li>);

					case "city":
					delivery.push(<li>Доставка по городу ({MARKET[this.props.number].location})</li>);

					case "self":
					delivery.push(<li>Самовывоз</li>);
				}

				var material = [];
				for (let item of MARKET[this.props.number].material)
							material.push(<li><a key={item} href={"http://en.wikipedia.org/material"}>{item}</a></li>);



				 return <div className="product" >
				 			
						 	<h1>{MARKET[this.props.number].name}</h1>

							<Galery number={this.props.number}/>

							<div className="price"><b>Цена</b> {MARKET[this.props.number].price} р.</div>
							
						 	<h2>Описание</h2>
						 	<p>{MARKET[this.props.number].description}</p>


							<div className="field">
								 <div className="subfield">
									 <div className="subfield__title">Размер: </div>
									 {MARKET[this.props.number].size.eurosize}
								 </div>
								 <div className="subfield">
								 	<div className="subfield__title">Срок изготовления: </div> 
								 	{MARKET[this.props.number].craftTime == 0 ? "Готовая работа" : MARKET[this.props.number].craftTime}
								 </div>
							 </div>

							 <div className="field">
								 <div className="subfield">
									 <div className="subfield__title">Оплата: </div> 
									 {pay}
								 </div>
								 <div className="subfield">
									 <div className="subfield__title">Доставка: </div>
									 {delivery}
								 </div>
							 </div>

							 <div className="field">
								 <div className="subfield">
									 <div className="subfield__title">Материалы:</div> 
									 {material}
								 </div>
							 </div>

							 <div>{MARKET[this.props.number].views} просмотров</div>
					 	</div>
				 }
		});

		/*ReactDOM.render(
			<ProductFull number={Math.floor(Math.random() * (MARKET.length) + 0)} />,
			document.getElementById("content")
		);*/

export default ProductFull;