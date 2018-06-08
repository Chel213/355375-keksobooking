'use strict'

var titleArr = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typeArr = ['palace', 'flat', 'house', 'bungalo'];
var checkinArr = ['12:00', '13:00', '14:00'];
var checkoutArr = ['12:00', '13:00', '14:00'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var amoundAd = titleArr.length;

var createWayAvatar = function (amound) {
  var arrWayAvatar = [];
  for (var i = 1; i <= amound; i++) {
    var wayAvatar = 'img/avatars/user0' + i + '.png';
    arrWayAvatar[i] = wayAvatar;
  }
  return arrWayAvatar;
};

var selectTitle = function (titleList) {
  var indexTitle = Math.floor(Math.random() * titleList.length);
  var selectedTitle = titleList[indexTitle];
  titleList.splice(indexTitle, 1);
  return selectedTitle;
};

var selectRandomNumber = function (numberFrom, numberTo) {
  return numberFrom + Math.floor(Math.random() * (numberTo - numberFrom + 1));
}

var selectItemArr = function (arr) {
  var i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

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

var listAdvert = [];
for (var i = 0; i < amoundAd; i++) {

  var locationX = selectRandomNumber(300, 900);
  var locationY = selectRandomNumber(130, 630);

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
      features: featuresArr.slice(0, Math.floor(Math.random() * featuresArr.length +1)),
      description: '',
      photos: randomSortsArr(photosArr)
    },
    location: {
      x: locationX,
      y: locationY
    }
  }
  listAdvert[i] = advert;
}

var mapVisible = document.querySelector('.map');
mapVisible.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment ();
for (var i = 0; i < amoundAd; i++) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var imagePinElement = pinElement.querySelector('img');
  pinElement.style = 'left: ' + (listAdvert[i].location.x + imagePinElement.width / 2) + 'px; top: '+ (listAdvert[i].location.y + imagePinElement.height) + 'px;';
  imagePinElement.src = listAdvert[i].author.avatar;
  imagePinElement.alt = 'заголовок объявления';
  fragment.appendChild(pinElement);
}

var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(fragment);








