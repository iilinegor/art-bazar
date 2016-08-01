import React from 'react';

var Notice = React.createClass({
	render() {
		let noticeList = [
			{
				title : "Уже в корзине",
				text: "Продукт отправлен в корзину. Для продолжения подтвердите покупку в соответствующем разделе."
			},

			{
				title : "Покупка подтверждена",
				text: "Мастеру отправлен Ваш запрос. В ближайшее время с Вами свяжутся для уточнения деталей доставки."
			},

			{
				title : "Заказ принят",
				text: "На Вашу почту высланы данные покупателя. Свяжитесь с ним для уточнения деталей доставки."
			},

			{
				title : "Заказ отклонён",
				text: "На Вашу почту высланы данные покупателя. Пожалуйста, прокоментируйте отмену заказа."
			}
		];

		return		<div className="overflow">
						<div className="notice">
							<h1>{noticeList[this.props.code].title}</h1>
							<p>{noticeList[this.props.code].text}</p>
							<button onClick={this.props.close}>Закрыть</button>
						</div>
					</div> 
	}
});

export default Notice;