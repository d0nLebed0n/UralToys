if (window.utils.getIE() === false) {
	var ieScriptFix = document.createElement('script');
	ieScriptFix.setAttribute('src','/template/js/contacts-map-ie.js');
	document.head.appendChild(ieScriptFix);
}

//Мок данных, снести при настройке.
const getRandomNumber = (min, max) => Math.random() * (max - min) + min;
const getRandFromArr = (arr) => {

	let index = Math.floor(getRandomNumber(0, arr.length));
	return arr[index];
};
const mockList = {
	names: ["Теплоком", "Название организации", "Еще одно название организации",  "Одно из названий организации",  "Случайное название компании"],
	type: ["Розничный магазин", "Сервисный центр"],
	address: ["ул. Пушкинская, 10", "Ленинский пр-т, 34", "ул. Иваненская, 156", "ул. Люберецкая, 16", "пр-т Возвышенский, 456"],

};
const getPlaster = (resultObj = {}, status = false) => {
	const PLASTER_NAME = document.querySelector(`.js-mapTarget`);
	const PLASTER_TYPE = document.querySelector(`.js-mapType`);
	const PLASTER_ADDRESS = document.querySelector(`.js-mapAddress`);
	const PLASTER_PHONE = document.querySelector(`.js-mapPhone`);
	const PLASTER_EMAIL = document.querySelector(`.js-mapEmail`);
	const PLASTER_WEB = document.querySelector(`.js-mapWeb`);
	const getDefaultPlaster = () => {
		PLASTER_NAME.innerHTML = `Название компании`;
		PLASTER_TYPE.innerHTML = `Статус компании`;
		PLASTER_EMAIL.innerHTML = `Email компании`;
		PLASTER_PHONE.innerHTML = `Телефон компании`;
		PLASTER_ADDRESS.innerHTML = `Адрес компании`;
		PLASTER_WEB.innerHTML = `Сайт компании`;
	};
	const fillPlaster = (itemObject) => {
		PLASTER_NAME.innerHTML = itemObject.name;
		PLASTER_TYPE.innerHTML = itemObject.type;
		PLASTER_EMAIL.innerHTML = itemObject.email;
		PLASTER_PHONE.innerHTML = itemObject.phone;
		PLASTER_ADDRESS.innerHTML = itemObject.address;
		PLASTER_WEB.innerHTML = itemObject.web;
	};
	status === false ? getDefaultPlaster() : fillPlaster(resultObj);
};
const mapsList = [];
const getMockData = () => {
	for (let i = 0; i < Math.floor(getRandomNumber(6, 14)); i++) {
		let someObj = {
			posX: getRandomNumber(51.1, 51.3),
			posY: getRandomNumber(36.2, 36.4),
			name: getRandFromArr(mockList.names),
			type:  getRandFromArr(mockList.type),
			address: getRandFromArr(mockList.address),
			phone: "+7 (932) 342-34-34",
			email: "info@teplocom-sale.ru",
			web: "teplocom.ru"
		};
		mapsList.push(someObj);
	}
	return mapsList;
};

// Выполняем наш код, когда API загружен - ymaps.ready()
ymaps.ready(() => {

	getMockData();
	getPlaster();
	const myCollection = new ymaps.GeoObjectCollection();
	const myMap = new ymaps.Map("map", {
		center: [getRandomNumber(51.1, 51.2), getRandomNumber(36.2, 36.3)], // Начальные значения центра карты
		zoom: 10, // Начальное значение зума карты

	});
	for (let i = 0; i < mapsList.length; i++) {
		let place = new ymaps.Placemark(
			[mapsList[i].posX, mapsList[i].posY], {balloonContent: mapsList[i].name}, {
				// Опции.
				// Необходимо указать данный тип макета.
				iconLayout: 'default#image',

				// Своё изображение иконки метки.
				iconImageHref: '/template/img/mapholder.png',
				// Размеры метки.
				iconImageSize: [23, 34],
				// Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
				iconImageOffset: [-23, -34]
			});
		console.log(place);

		myCollection.add(place);
		myMap.geoObjects.add(place);
		place.events.add(`click`, () => {
			getPlaster(mapsList[i], status = true);
		});

	}
	myMap.geoObjects.add(myCollection);


	myMap.behaviors.disable('scrollZoom'); //убрать зум по скроллу
	myMap.controls.remove('typeSelector'); // убрать выбор карт
	myMap.controls.remove('trafficControl'); // убрать пробки
	myMap.controls.remove('searchControl'); // убрать поиск
	// myMap.controls.remove('zoomControl'); // убрать зум
	// myMap.controls.remove('geolocationControl'); // убрать геолокация
	myMap.controls.remove('fullscreenControl'); // убрать фуллскрин
	myMap.controls.remove('rulerControl'); // убрать линейку
	// // Коллекция гео-точек, добавленных на карту
	// Вычисляем необходимые координаты краёв карты и устанавливаем их для нашего экземпляра карты

	// 	// Добавляем точки на карту
	// 	myMap.geoObjects.add(myCollection);


	const isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	if (isMobile.any()) {
		myMap.behaviors.disable('drag');
	};
})


// $("#place1").click(function() {
// 	myMap.panTo(place1.geometry.getCoordinates());
// });
