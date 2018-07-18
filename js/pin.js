'use strict';

(function () {
  var HEIGHT_PIN_POINTER = 22;
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
  //  функция определения координат центра
  var determinesCoordinatesCenter = function (element) {
    var coordinates = {};
    coordinates.x = Math.round(element.offsetLeft + element.offsetWidth / 2);
    coordinates.y = Math.round(element.offsetTop + element.offsetHeight / 2);
    return coordinates;
  };

  //  функция определения координат нижнего конца пина
  var determinesCoordinatesBottom = function (element) {
    var coordinates = {};
    coordinates.x = Math.round(element.offsetLeft + element.offsetWidth / 2);
    coordinates.y = Math.round(element.offsetTop + HEIGHT_PIN_POINTER + element.offsetHeight);
    return coordinates;
  };

  //  вставляем координаты пина активации по умолчанию
  var pinActivate = document.querySelector('.map__pin--main');
  var pinActivateCoordinates = determinesCoordinatesCenter(pinActivate);
  var placeholderAddress = document.querySelector('#address');
  placeholderAddress.setAttribute('placeholder', pinActivateCoordinates.x + ', ' + pinActivateCoordinates.y);

  window.pin = {
    createList: createListPin,
    determinesCoordinatesBottom: determinesCoordinatesBottom,
    activate: pinActivate,
    pointer: HEIGHT_PIN_POINTER
  };
})();
