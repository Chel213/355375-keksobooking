'use strict';

(function () {
  var HEIGHT_PIN_POINTER = 22;
  //  функция создания Pin
  var createPin = function (itemListAdvert, templatePin) {
    var pin = templatePin.cloneNode(true);
    var imagePin = pin.querySelector('img');
    pin.style = 'left: ' + (itemListAdvert.location.x + imagePin.width / 2) + 'px; top: ' + (itemListAdvert.location.y + imagePin.height) + 'px;';
    imagePin.src = itemListAdvert.author.avatar;
    imagePin.alt = itemListAdvert.offer.title;
    return pin;
  };

  //  функция создания всех пинов
  var createListPin = function (listAdvert, templatePin) {
    var fragment = document.createDocumentFragment();
    listAdvert.forEach(function (item, i) {
      var pin = createPin(item, templatePin);
      pin.setAttribute('data-order', i);
      fragment.appendChild(pin);
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
