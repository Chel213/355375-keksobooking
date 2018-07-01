'use strict';

(function () {
  var EXTREM_PIN_CORDS = {
    minY: 130,
    maxY: 630,
    minX: 0,
    maxX: 1200
  };
  var KEY_CODE_ENTER = 13;
  var KEY_CODE_ESC = 27;
  //  отрисовка объявлений активной страницы
  var renderPage = function (listAdvert) {
    window.pin.pinActivate.removeEventListener('keydown', onPinActivateKeydown);
    //  ищем шаблон и вставляем пины на карту
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPins = document.querySelector('.map__pins');
    mapPins.appendChild(window.pin.createListPin(listAdvert, mapPinTemplate));

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
      mapVisible.insertBefore(window.createAd(listAdvert[pinOrder], mapCardTemplate), mapContainer);
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

  //  перевод страницы в НЕ активный режим
  window.map = {
    disablesPage: function () {
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

      window.pin.pinActivate.addEventListener('keydown', onPinActivateKeydown);
      map.classList.add('map--faded');
      form.classList.add('ad-form--disabled');

      pinMain.style.left = '570px';
      pinMain.style.top = '375px';

      fieldsForm.forEach(function (item) {
        item.setAttribute('disabled', true);
      });
    }
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
    window.backend.load(renderPage, window.backend.error);


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
      if (currentCoordinats.y >= EXTREM_PIN_CORDS.minY - (pinActivate.offsetHeight + window.pin.pinPointer) && currentCoordinats.y <= EXTREM_PIN_CORDS.maxY - (pinActivate.offsetHeight + window.pin.pinPointer)) {
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
  var onCardKeydown = function (evt) {
    var card = document.querySelector('.map__card');
    if (evt.keyCode === KEY_CODE_ESC) {
      card.remove();
      document.removeEventListener('keydown', onCardKeydown);
    }
  };
  // делаем поля формы не активными
  var fieldForm = document.querySelectorAll('.ad-form fieldset');
  fieldForm.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });

  //  навешиваем обработчик активации страницы
  window.pin.pinActivate.addEventListener('mousedown', onPinActivateMouseDown);
  window.pin.pinActivate.addEventListener('keydown', onPinActivateKeydown);
})();
