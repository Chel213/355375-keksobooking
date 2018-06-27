'use strict';

(function () {
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
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var REGISTRATION_TIMES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var amoundAd = TITLES.length;

  //  аватар пользователя
  var createWayAvatar = function (amound) {
    var avatars = [];
    for (var i = 1; i <= amound; i++) {
      var wayAvatar = 'img/avatars/user0' + i + '.png';
      avatars[i] = wayAvatar;
    }
    return avatars;
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
    var displayTitle;
    switch (type) {
      case 'flat':
        displayTitle = 'Квартира';
        break;
      case 'bungalo':
        displayTitle = 'Бунгало';
        break;
      case 'house':
        displayTitle = 'Дом';
        break;
      case 'palace':
        displayTitle = 'Дворец';
        break;
    }
    return displayTitle;
  };

  //  функция создания списка предложений
  var createListAdvert = function (amound) {
    var listAdverts = [];
    for (var i = 0; i < amound; i++) {

      var locationX = selectRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X);
      var locationY = selectRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y);

      //  предложение
      var advert = {
        author: {
          avatar: createWayAvatar(amound)[i + 1]
        },
        offer: {
          title: selectTitle(TITLES),
          address: locationX + ', ' + locationY,
          price: selectRandomNumber(MIN_PRICE, MAX_PRICE),
          type: selectItemArr(TYPES),
          rooms: selectRandomNumber(MIN_ROOMS, MAX_ROOMS),
          guests: selectRandomNumber(MIN_GUESTS, MAX_GUESTS),
          checkin: selectItemArr(REGISTRATION_TIMES),
          checkout: selectItemArr(CHECKOUT_TIMES),
          features: FEATURES.slice(0, selectRandomNumber(0, FEATURES.length)),
          description: '',
          photos: randomSortsArr(PHOTOS)
        },
        location: {
          x: locationX,
          y: locationY
        }
      };
      listAdverts[i] = advert;
    }
    return listAdverts;
  };

  //  генерим список предложений
  //  var listAdverts = createListAdvert(amoundAd);

  window.data = {
    selectsType: selectsType,
    listAdverts: createListAdvert(amoundAd)
  };
})();
