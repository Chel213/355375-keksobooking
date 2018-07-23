'use strict';
(function () {

  var AMOUND_ADVERTS = 5;

  window.renderMap = {};
  window.renderMap.pins = document.querySelector('.map__pins');
  //  отрисовка объявлений активной страницы
  window.renderMap.page = function (listAdverts) {
    var adverts = listAdverts.slice();
    adverts.splice(AMOUND_ADVERTS);
    window.pin.activate.removeEventListener('keydown', window.map.onPinActivateKeydown);

    //  если пины еще не отрисованы, ищем шаблон и вставляем пины на карту
    var pins = document.querySelector('.map__pin:not(.map__pin--main');

    if (!pins) {
      var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

      window.renderMap.pins.appendChild(window.pin.createList(adverts, mapPinTemplate));
    }

    //  ищем шаблон
    var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
    var mapVisible = document.querySelector('.map');
    var mapContainer = mapVisible.querySelector('.map__filters-container');

    window.renderMap.onMapPinsClick = function (evt) {
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
      mapVisible.insertBefore(window.createAd(adverts[pinOrder], mapCardTemplate), mapContainer);

      //  навешиваем обработчик на закрытие
      var card = mapVisible.querySelector('.map__card');
      var cardClose = card.querySelector('.popup__close');
      if (cardClose) {
        cardClose.addEventListener('click', function () {
          card.remove();
        });
      }
      if (card) {
        document.addEventListener('keydown', window.map.onCardKeydown);
      }
    };

    window.renderMap.pins.addEventListener('click', window.renderMap.onMapPinsClick);
  };
})();

