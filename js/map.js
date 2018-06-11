'use strict';

var MIN_LOCATION_X = 300;
var MAX_LOCATION_X = 900;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 100;

var TITLE_LIST = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
var REGISTRATION_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AD_NUMBER = 0;
var amoundAd = TITLE_LIST.length;

//  аватар пользователя
var createWayAvatar = function (amound) {
  var arrWayAvatar = [];
  for (var i = 1; i <= amound; i++) {
    var wayAvatar = 'img/avatars/user0' + i + '.png';
    arrWayAvatar[i] = wayAvatar;
  }
  return arrWayAvatar;
};


var getRandomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

//  функция случайного выбора числа от .. до.. включительно
var selectRandomNumber = function (numberFrom, numberTo) {
  return numberFrom + Math.floor(Math.random() * (numberTo - numberFrom + 1));
};

//  заголовок объявления
var selectTitle = function (titleList) {
  var indexTitle = getRandomIndex(titleList);
  var selectedTitle = titleList[indexTitle];
  titleList.splice(indexTitle, 1);
  return selectedTitle;
};

//  функция случайного выбора элемента из массива
var selectItemArr = function (arr) {
  return arr[getRandomIndex(arr)];
};

//  функция случайной сортировки массива
var randomSortsArr = function (arr) {
  var assortedArr = [];
  var tempArr = arr.slice();
  for (var i = 0; i < arr.length; i++) {
    var index = getRandomIndex(tempArr);
    assortedArr[i] = tempArr[index];
    tempArr.splice(index, 1);
  }
  return assortedArr;
};

//  функция выбора типа жилья
var selectsType = function (type) {
  var temp;
  switch (type) {
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
  return temp;
};

//  функция создания списка предложений
var createListAdvert = function (amound) {
  var tempListAdvert = [];
  for (var i = 0; i < amound; i++) {

    var locationX = selectRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X);
    var locationY = selectRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y);

    //  предложение
    var advert = {
      author: {
        avatar: createWayAvatar(amound)[i + 1]
      },
      offer: {
        title: selectTitle(TITLE_LIST),
        address: locationX + ', ' + locationY,
        price: selectRandomNumber(MIN_PRICE, MAX_PRICE),
        type: selectItemArr(TYPE_LIST),
        rooms: selectRandomNumber(MIN_ROOMS, MAX_ROOMS),
        guests: selectRandomNumber(MIN_GUESTS, MAX_GUESTS),
        checkin: selectItemArr(REGISTRATION_TIMES),
        checkout: selectItemArr(CHECKOUT_TIMES),
        features: FEATURES_LIST.slice(0, selectRandomNumber(0, FEATURES_LIST.length)),
        description: '',
        photos: randomSortsArr(PHOTOS_LIST)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    tempListAdvert[i] = advert;
  }
  return tempListAdvert;
};

//  функция создания Pin
var createPinElement = function (adNumber, templatePin) {
  var pinElement = templatePin.cloneNode(true);
  var imagePinElement = pinElement.querySelector('img');
  pinElement.style = 'left: ' + (listAdvert[adNumber].location.x + imagePinElement.width / 2) + 'px; top: ' + (listAdvert[adNumber].location.y + imagePinElement.height) + 'px;';
  imagePinElement.src = listAdvert[adNumber].author.avatar;
  imagePinElement.alt = listAdvert[adNumber].offer.title;
  return pinElement;
};

//  функция создания всех пинов
var createListPin = function (amoundPin, templatePin) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < amoundPin; i++) {
    var pinElement = createPinElement(i, templatePin);
    fragment.appendChild(pinElement);
  }
  return fragment;
};

//  функция карточки объявления
var createsAd = function (adNumber, templateAd) {
  //  клонируем шаблон
  var popupAdvert = templateAd.cloneNode(true);

  //  заголовок
  popupAdvert.querySelector('.popup__title').textContent = listAdvert[adNumber].offer.title;

  //  адрес
  popupAdvert.querySelector('.popup__text--address').textContent = listAdvert[adNumber].offer.address;

  //  цена
  var priceCard = popupAdvert.querySelector('.popup__text--price');
  var textPrice = priceCard.querySelector('span');
  priceCard.textContent = listAdvert[adNumber].offer.price + '\u20BD';
  priceCard.appendChild(textPrice);

  //  тип жилья
  var typeCard = popupAdvert.querySelector('.popup__type');
  typeCard.textContent = selectsType(listAdvert[adNumber].offer.type);

  //  количество комнат
  popupAdvert.querySelector('.popup__text--capacity').textContent = listAdvert[adNumber].offer.rooms + ' комнаты для ' + listAdvert[adNumber].offer.guests + ' гостей';

  //  время заезда, выезда
  popupAdvert.querySelector('.popup__text--time').textContent = 'Заезд после ' + listAdvert[adNumber].offer.checkin + ', выезд до ' + listAdvert[adNumber].offer.checkout;

  //  список удобств
  var listFeatures = popupAdvert.querySelector('.popup__features');
  for (var k = 0; k < listAdvert[adNumber].offer.features.length; k++) {
    var itemDel = listFeatures.querySelector('li:last-child');
    listFeatures.removeChild(itemDel);
  }

  //  описание жилья
  popupAdvert.querySelector('.popup__description').textContent = listAdvert[adNumber].offer.description;

  //  фото жилья
  var photosCard = popupAdvert.querySelector('.popup__photos');
  var photoCard = photosCard.removeChild(photosCard.querySelector('img'));

  for (var l = 0; l < listAdvert[adNumber].offer.photos.length; l++) {
    var itemPhotoCard = photoCard.cloneNode(true);
    itemPhotoCard.src = listAdvert[adNumber].offer.photos[l];
    photosCard.appendChild(itemPhotoCard);
  }

  //  аватар
  popupAdvert.querySelector('.popup__avatar').src = listAdvert[adNumber].author.avatar;
  return popupAdvert;
};

//  генерим список предложений
var listAdvert = createListAdvert(amoundAd);

//  переключаем карту в активный режим
var mapVisible = document.querySelector('.map');
var mapContainer = mapVisible.querySelector('.map__filters-container');
mapVisible.classList.remove('map--faded');

//  ищем шаблон и вставляем пины на карту
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(createListPin(amoundAd, mapPinTemplate));

//  ищем шаблон и вставляем элемент
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
mapVisible.insertBefore(createsAd(AD_NUMBER, mapCardTemplate), mapContainer);
