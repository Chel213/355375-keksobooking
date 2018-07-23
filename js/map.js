'use strict';

(function () {
  var EXTREM_PIN_CORDS = {
    minY: 130,
    maxY: 630,
    minX: 0,
    maxX: 1200
  };
  var KEY_CODE_ENTER = 13;

  var pinMainDefault = document.querySelector('.map__pin--main');
  var coordinatesPinDefault = {
    x: pinMainDefault.style.left,
    y: pinMainDefault.style.top
  };


  //  перевод страницы в НЕ активный режим

  var disablesPage = function () {
    var form = document.querySelector('.ad-form');
    var mapPins = document.querySelectorAll('.map__pin');
    var card = document.querySelector('.map__card');
    var map = document.querySelector('.map');
    var pinMain = document.querySelector('.map__pin--main');
    var fieldsForm = form.querySelectorAll('fieldset');
    mapPins.forEach(function (item) {
      if (item.className === 'map__pin') {
        item.remove();
      }
    });
    if (card) {
      card.remove();
      document.removeEventListener('keydown', onCardKeydown);
    }

    window.pin.activate.addEventListener('keydown', onPinActivateKeydown);
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');

    pinMain.style.left = coordinatesPinDefault.x;
    pinMain.style.top = coordinatesPinDefault.y;

    fieldsForm.forEach(function (item) {
      item.setAttribute('disabled', true);
    });
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
    var pinCoordinates = window.pin.determinesCoordinatesBottom(pinActivate);
    inputAddress.value = pinCoordinates.x + ', ' + pinCoordinates.y;
    inputAddress.setAttribute('readonly', true);

    //   отрисовка страницы
    if (!window.map.data) {
      window.backend.request(function (data) {
        window.map.data = data.slice();
        window.renderMap.page(window.map.data);
      },
      window.backend.showError
      );
    } else {
      window.renderMap.page(window.map.data);
    }
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
      if (currentCoordinats.y >= EXTREM_PIN_CORDS.minY - (pinActivate.offsetHeight + window.pin.pointer) && currentCoordinats.y <= EXTREM_PIN_CORDS.maxY - (pinActivate.offsetHeight + window.pin.pointer)) {
        pinActivate.style.top = (pinActivate.offsetTop - shift.y) + 'px';
      }
      if (currentCoordinats.x >= EXTREM_PIN_CORDS.minX && currentCoordinats.x + pinActivate.offsetWidth <= EXTREM_PIN_CORDS.maxX) {
        pinActivate.style.left = (pinActivate.offsetLeft - shift.x) + 'px';
      }
      //  изменение координат онлайн
      var pinCoordinates = window.pin.determinesCoordinatesBottom(pinActivate);
      inputAddress.value = pinCoordinates.x + ', ' + pinCoordinates.y;
    };

    var onPinActivateMouseup = function () {
      window.renderMap.pins.removeEventListener('click', window.renderMap.onMapPinsClick);
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

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    card.remove();
    document.removeEventListener('keydown', onCardKeydown);
  };

  var onCardKeydown = function (evt) {
    window.keyboardEsc(evt, closeCard);
  };
  // делаем поля формы не активными
  var fieldForm = document.querySelectorAll('.ad-form fieldset');
  fieldForm.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });

  //  навешиваем обработчик активации страницы
  window.pin.activate.addEventListener('mousedown', onPinActivateMouseDown);
  window.pin.activate.addEventListener('keydown', onPinActivateKeydown);

  window.map = {
    disablesPage: disablesPage,
    onCardKeydown: onCardKeydown,
    onPinActivateKeydown: onPinActivateKeydown
  };
})();
