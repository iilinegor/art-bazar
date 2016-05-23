var ProductFull = React.createClass({
			render: function() {

				var pay = [];
				for (let item of MARKET[this.props.number].pay)
							pay.push({<li key={item}>{item}</li>});

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

							<div><b>Цена</b> {MARKET[this.props.number].price} р.</div>

							<Galery number={this.props.number}/>

							
						 	<h2>Описание</h2>
						 	<div>{MARKET[this.props.number].description}</div>

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