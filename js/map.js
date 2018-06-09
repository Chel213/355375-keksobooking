'use strict';

var titleArr = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typeArr = ['palace', 'flat', 'house', 'bungalo'];
var checkinArr = ['12:00', '13:00', '14:00'];
var checkoutArr = ['12:00', '13:00', '14:00'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var amoundAd = titleArr.length;

//  аватар пользователя
var createWayAvatar = function (amound) {
  var arrWayAvatar = [];
  for (var i = 1; i <= amound; i++) {
    var wayAvatar = 'img/avatars/user0' + i + '.png';
    arrWayAvatar[i] = wayAvatar;
  }
  return arrWayAvatar;
};

//  заголовок объявления
var selectTitle = function (titleList) {
  var indexTitle = Math.floor(Math.random() * titleList.length);
  var selectedTitle = titleList[indexTitle];
  titleList.splice(indexTitle, 1);
  return selectedTitle;
};

//  функция случайного выбора числа от .. до..
var selectRandomNumber = function (numberFrom, numberTo) {
  return numberFrom + Math.floor(Math.random() * (numberTo - numberFrom + 1));
};

//  функция случайного выбора элемента из массива
var selectItemArr = function (arr) {
  var i = Math.floor(Math.random() * arr.length);
  return arr[i];
};

//  функция случайной сортировки массива
var randomSortsArr = function (arr) {
  var assortedArr = [];
  var tempArr = arr.slice();
  for (var i = 0; i < arr.length; i++) {
    var index = Math.floor(Math.random() * tempArr.length);
    assortedArr[i] = tempArr[index];
    tempArr.splice(index, 1);
  }
  return assortedArr;
};

//  массив предложений
var listAdvert = [];
for (var i = 0; i < amoundAd; i++) {


  var locationX = selectRandomNumber(300, 900);
  var locationY = selectRandomNumber(130, 630);

  //  предложение
  var advert = {
    author: {
      avatar: createWayAvatar(amoundAd)[i + 1]
    },
    offer: {
      title: selectTitle(titleArr),
      address: locationX + ', ' + locationY,
      price: selectRandomNumber(1000, 1000000),
      type: selectItemArr(typeArr),
      rooms: selectRandomNumber(1, 5),
      guests: selectRandomNumber(1, 100),
      checkin: selectItemArr(checkinArr),
      checkout: selectItemArr(checkoutArr),
      features: featuresArr.slice(0, Math.floor(Math.random() * featuresArr.length + 1)),
      description: '',
      photos: randomSortsArr(photosArr)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  listAdvert[i] = advert;
}

//  переключаем карту в активный режим
var mapVisible = document.querySelector('.map');
var mapContainer = mapVisible.querySelector('.map__filters-container');
mapVisible.classList.remove('map--faded');

//  создаем DocumentFragment и клонируем в него метки
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
for (var j = 0; j < amoundAd; j++) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var imagePinElement = pinElement.querySelector('img');
  pinElement.style = 'left: ' + (listAdvert[j].location.x + imagePinElement.width / 2) + 'px; top: ' + (listAdvert[j].location.y + imagePinElement.height) + 'px;';
  imagePinElement.src = listAdvert[j].author.avatar;
  imagePinElement.alt = listAdvert[j].offer.title;
  fragment.appendChild(pinElement);
}

//  вставляем DocumentFragment
var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(fragment);

//  создаем DOM элемент объявления
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

//  клонируем шаблон
var popupAdvert = mapCardTemplate.cloneNode(true);

//  меняем заголовок
popupAdvert.querySelector('.popup__title').textContent = listAdvert[0].offer.title;

//  меняем адрес
popupAdvert.querySelector('.popup__text--address').textContent = listAdvert[0].offer.address;

//  меняем цену
var priceCard = popupAdvert.querySelector('.popup__text--price');
var textPrice = priceCard.querySelector('span');
priceCard.textContent = listAdvert[0].offer.price + '\u20BD';
priceCard.appendChild(textPrice);

//  тип жилья
var typeCard = popupAdvert.querySelector('.popup__type');
var temp;
switch (listAdvert[0].offer.type) {
  case 'flat':
    temp = 'Квартира';
    break;
  case 'bungalo':
    temp = 'Бунгало';
    break;
  case 'house':
    temp = 'Дом';
    break;
  case 'palace':
    temp = 'Дворец';
    break;
}
typeCard.textContent = temp;

//  количество комнат
popupAdvert.querySelector('.popup__text--capacity').textContent = listAdvert[0].offer.rooms + ' комнаты для ' + listAdvert[0].offer.guests + ' гостей';

//  время заезда, выезда
popupAdvert.querySelector('.popup__text--time').textContent = 'Заезд после ' + listAdvert[0].offer.checkin + ', выезд до ' + listAdvert[0].offer.checkout;

//  список удобств
var listFeatures = popupAdvert.querySelector('.popup__features');
for (var k = 0; k < listAdvert[0].offer.features.length; k++) {
  var itemDel = listFeatures.querySelector('li:last-child');
  listFeatures.removeChild(itemDel);
}

//  описание жилья
popupAdvert.querySelector('.popup__description').textContent = listAdvert[0].offer.description;

//  фото жилья
var photosCard = popupAdvert.querySelector('.popup__photos');
var photoCard = photosCard.removeChild(photosCard.querySelector('img'));

for (var l = 0; l < listAdvert[0].offer.photos.length; l++) {
  var itemPhotoCard = photoCard.cloneNode(true);
  itemPhotoCard.src = listAdvert[0].offer.photos[l];
  photosCard.appendChild(itemPhotoCard);
}

//  меняем аватар
popupAdvert.querySelector('.popup__avatar').src = listAdvert[0].author.avatar;

//  вставляем элемент
mapVisible.insertBefore(popupAdvert, mapContainer);
