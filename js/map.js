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
var KEY_CODE_ENTER = 13;
var KEY_CODE_ESC = 27;
var PRICE_TYPE = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
};
var EXTREM_PIN_CORDS = {
  minY: 130,
  maxY: 630,
  minX: 0,
  maxX: 1200
};
var ROOM_CAPACITY = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0]
};

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var REGISTRATION_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var HEIGHT_PIN_POINTER = 22;
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

//  функция создания Pin
var createPinElement = function (itemListAdvert, templatePin) {
  var pinElement = templatePin.cloneNode(true);
  var imagePinElement = pinElement.querySelector('img');
  pinElement.style = 'left: ' + (itemListAdvert.location.x + imagePinElement.width / 2) + 'px; top: ' + (itemListAdvert.location.y + imagePinElement.height) + 'px;';
  imagePinElement.src = itemListAdvert.author.avatar;
  imagePinElement.alt = itemListAdvert.offer.title;
  return pinElement;
};

//  функция создания всех пинов
var createListPin = function (listAdvert, templatePin) {
  var fragment = document.createDocumentFragment();
  listAdvert.forEach(function (item, i) {
    var pinElement = createPinElement(item, templatePin);
    pinElement.setAttribute('data-order', i);
    fragment.appendChild(pinElement);
  });
  return fragment;
};

//  функция карточки объявления
var createAd = function (listAdvert, templateAd) {
  //  клонируем шаблон
  var popupAdvert = templateAd.cloneNode(true);

  //  заголовок
  popupAdvert.querySelector('.popup__title').textContent = listAdvert.offer.title;

  //  адрес
  popupAdvert.querySelector('.popup__text--address').textContent = listAdvert.offer.address;

  //  цена
  var priceCard = popupAdvert.querySelector('.popup__text--price');
  var textPrice = priceCard.querySelector('span');
  priceCard.textContent = listAdvert.offer.price + '\u20BD';
  priceCard.appendChild(textPrice);

  //  тип жилья
  var typeCard = popupAdvert.querySelector('.popup__type');
  typeCard.textContent = selectsType(listAdvert.offer.type);

  //  количество комнат
  popupAdvert.querySelector('.popup__text--capacity').textContent = listAdvert.offer.rooms + ' комнаты для ' + listAdvert.offer.guests + ' гостей';

  //  время заезда, выезда
  popupAdvert.querySelector('.popup__text--time').textContent = 'Заезд после ' + listAdvert.offer.checkin + ', выезд до ' + listAdvert.offer.checkout;

  //  список удобств
  var listFeatures = popupAdvert.querySelector('.popup__features');
  for (var i = 0; i < listAdvert.offer.features.length; i++) {
    var itemDel = listFeatures.querySelector('li:last-child');
    listFeatures.removeChild(itemDel);
  }

  //  описание жилья
  popupAdvert.querySelector('.popup__description').textContent = listAdvert.offer.description;

  //  фото жилья
  var photosCard = popupAdvert.querySelector('.popup__photos');
  var photoCard = photosCard.removeChild(photosCard.querySelector('img'));

  for (var j = 0; j < listAdvert.offer.photos.length; j++) {
    var itemPhotoCard = photoCard.cloneNode(true);
    itemPhotoCard.src = listAdvert.offer.photos[j];
    photosCard.appendChild(itemPhotoCard);
  }

  //  аватар
  popupAdvert.querySelector('.popup__avatar').src = listAdvert.author.avatar;
  return popupAdvert;
};

//  генерим список предложений
var listAdverts = createListAdvert(amoundAd);

//  функция определения координат центра
var determinesCoordinatesCenter = function (element) {
  var coordinates = {};
  coordinates.x = element.offsetLeft + element.offsetWidth / 2;
  coordinates.y = element.offsetTop + element.offsetHeight / 2;
  return coordinates;
};

//  функция определения координат нижнего конца пина
var determinesCoordinatesBottom = function (element) {
  var coordinates = {};
  coordinates.x = element.offsetLeft + element.offsetWidth / 2;
  coordinates.y = element.offsetTop + HEIGHT_PIN_POINTER + element.offsetHeight;
  return coordinates;
};

//  переводим страницу в активный режим
var activatePage = function () {
  var mapVisible = document.querySelector('.map');
  mapVisible.classList.remove('map--faded');

  var adInformation = document.querySelector('.ad-form');
  adInformation.classList.remove('ad-form--disabled');

  var fieldsetForm = adInformation.querySelectorAll('fieldset');
  fieldsetForm.forEach(function (item) {
    item.removeAttribute('disabled');
  });

  //  адрес на момент mouseUp
  var inputAddress = adInformation.querySelector('#address');
  var pinActivate = document.querySelector('.map__pin--main');
  var pinCoordinates = determinesCoordinatesBottom(pinActivate);
  inputAddress.value = pinCoordinates.x + ', ' + pinCoordinates.y;
  inputAddress.setAttribute('disabled', true);

  //   отрисовка страницы
  renderPage(listAdverts);
};

var onPinActivateMouseDown = function (evt) {
  var mapPins = document.querySelector('.map__pins');
  var pinActivate = mapPins.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');


  var startCoordinats = {
    x: evt.clientX,
    y: evt.clientY
  };
  var onPinActivateMouseMove = function (moveEvt) {
    var shift = {
      x: startCoordinats.x - moveEvt.clientX,
      y: startCoordinats.y - moveEvt.clientY
    };
    startCoordinats = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    var currentCoordinats = {
      x: pinActivate.offsetLeft - shift.x,
      y: pinActivate.offsetTop - shift.y
    };

    if (currentCoordinats.y >= EXTREM_PIN_CORDS.minY - (pinActivate.offsetHeight + HEIGHT_PIN_POINTER) && currentCoordinats.y <= EXTREM_PIN_CORDS.maxY - (pinActivate.offsetHeight + HEIGHT_PIN_POINTER)) {
      pinActivate.style.top = (pinActivate.offsetTop - shift.y) + 'px';
    }
    if (currentCoordinats.x >= EXTREM_PIN_CORDS.minX && currentCoordinats.x + pinActivate.offsetWidth <= EXTREM_PIN_CORDS.maxX) {
      pinActivate.style.left = (pinActivate.offsetLeft - shift.x) + 'px';
    }
    //  изменение координат онлайн
    var pinCoordinates = determinesCoordinatesBottom(pinActivate);
    inputAddress.value = pinCoordinates.x + ', ' + pinCoordinates.y;
  };

  var onPinActivateMouseup = function () {
    activatePage();
    document.removeEventListener('mousemove', onPinActivateMouseMove);
    document.removeEventListener('mouseup', onPinActivateMouseup);
  };

  document.addEventListener('mousemove', onPinActivateMouseMove);
  document.addEventListener('mouseup', onPinActivateMouseup);

};


//  обработчик активации страницы по enter
var onPinActivateKeydown = function (evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    activatePage();
  }
};

// делаем поля формы не активными
var fieldForm = document.querySelectorAll('.ad-form fieldset');
fieldForm.forEach(function (item) {
  item.setAttribute('disabled', 'disabled');
});

//  вставляем координаты пина активации по умолчанию
var pinActivate = document.querySelector('.map__pin--main');
var pinActivateCoordinates = determinesCoordinatesCenter(pinActivate);
var placeholderAddress = document.querySelector('#address');
placeholderAddress.setAttribute('placeholder', pinActivateCoordinates.x + ', ' + pinActivateCoordinates.y);

//  навешиваем обработчик активации страницы
pinActivate.addEventListener('mousedown', onPinActivateMouseDown);
pinActivate.addEventListener('keydown', onPinActivateKeydown);

var onCardKeydown = function (evt) {
  var card = document.querySelector('.map__card');
  if (evt.keyCode === KEY_CODE_ESC) {
    card.remove();
    document.removeEventListener('keydown', onCardKeydown);
  }
};

//  отрисовка объявлений активной страницы
var renderPage = function (listAdvert) {
  pinActivate.removeEventListener('keydown', onPinActivateKeydown);
  //  ищем шаблон и вставляем пины на карту
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(createListPin(listAdvert, mapPinTemplate));

  //  ищем шаблон
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var mapVisible = document.querySelector('.map');
  var mapContainer = mapVisible.querySelector('.map__filters-container');

  mapPins.addEventListener('click', function (evt) {
    var pin = evt.target;
    while (!pin.classList.contains('map__pin') && !pin.classList.contains('map__pin--main') && pin !== evt.currentTarget) {
      pin = pin.parentNode;
    }
    if (pin.className !== 'map__pin') {
      return;
    }
    var pinOrder = pin.dataset.order;
    var mapCard = mapVisible.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    mapVisible.insertBefore(createAd(listAdvert[pinOrder], mapCardTemplate), mapContainer);
    //  навешиваем обработчик на закрытие
    var card = mapVisible.querySelector('.map__card');
    var cardClose = card.querySelector('.popup__close');
    if (cardClose) {
      cardClose.addEventListener('click', function () {
        card.remove();
      });
    }
    if (card) {
      document.addEventListener('keydown', onCardKeydown);
    }
  });
};

var adForm = document.querySelector('.ad-form');
var adType = adForm.querySelector('#type');
var adPrice = adForm.querySelector('#price');
var adTimeIn = adForm.querySelector('#timein');
var adTimeOut = adForm.querySelector('#timeout');
var adFormTime = adForm.querySelector('.ad-form__element--time');
var adRoomNumber = adForm.querySelector('#room_number');
var adCapacity = adForm.querySelector('#capacity');


var synchronizationForm = function (formIn, formTo) {
  var timeFrom = formIn.value;
  for (var i = 0; i < formTo.options.length; i++) {
    var timeTo = formTo.options[i].value;
    if (formTo.options[i].selected) {
      formTo.selectedIndex = -1;
    }
    if (timeFrom === timeTo) {
      formTo.selectedIndex = i;
    }
  }
};

adType.addEventListener('change', function () {
  var type = adType.value;
  adPrice.placeholder = PRICE_TYPE[type];
  adPrice.min = PRICE_TYPE[type];
});


adFormTime.addEventListener('change', function (evt) {
  if (evt.target.name === 'timein') {
    synchronizationForm(adTimeIn, adTimeOut);
  }
  if (evt.target.name === 'timeout') {
    synchronizationForm(adTimeOut, adTimeIn);
  }
});

adRoomNumber.addEventListener('change', function () {
  var roomNum = adRoomNumber.value;

  for (var i = 0; i < adCapacity.length; i++) {
    var capacity = adCapacity.options[i].value;
    adCapacity.options[i].setAttribute('disabled', true);
    ROOM_CAPACITY[roomNum].forEach(function (item) {
      if (+capacity === item) {
        adCapacity.options[i].removeAttribute('disabled');
        adCapacity.selectedIndex = i;
      }
    });
  }
});
