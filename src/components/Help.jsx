import ReactDOM from 'react-dom';
import React from 'react';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import './style.css';

var ProductForm = React.createClass({

	render() {
		return <div className="help">
					<h1>Помощь. Полный справочник <img className="sublogo" src="https://habrastorage.org/files/a73/493/c21/a73493c2123345fab0c322ae2dc39344.png"/></h1>
					<div>
						Вне зависимости от условий заказа, вы можете отказаться от покупки в любой момент до ее принятия мастером. После подтверждения заказа мастером оплатите покупку, после чего владелец магазина приступит к ее отправке. Как только вы получите в свои руки желаемую работу — оставьте мастеру отзыв на странице покупки о качестве изделия и деловых качествах.Оставлять отзывы или нет, решать вам, но помните, что отзывы - это история вашего пребывания на портале, ваша репутация. Чем больше у вас положительных отзывов, тем больше доверия ваша персона вызывает у других пользователей портала АртБазар. Поэтому мы призываем Продавцов и Покупателей настаивать на том, чтобы вторая сторона обязательно оставила хотя бы пару строк своих впечатлений от сотрудничестваю.
					</div>
					<div>
						Подпишитесь на обновления и первыми узнавайте о новых материалах сайта!
					</div>
					<div>
						Внимание! Покупая ту или иную вещь, вы делаете заказ напрямую у мастера. Администрация АртБазар предоставляет лишь удобные сервисы для выбора, заказа и покупки товаров и не является гарантом качества и соблюдения сроков выполнения.
					</div>
			   </div>;
	}
});


export default ProductForm;