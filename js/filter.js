'use strict';
(function () {
  var adverts;
  window.backend.load(function (data) {
    adverts = data;
  });

  var PRICES = {
    LOW_MIN: 0,
    LOW_MAX: 10000,
    MIDDLE_MIN: 10000,
    MIDDLE_MAX: 50000,
    HIGH_MIN: 50000,
    HIGH_MAX: Infinity
  };

  var formFilter = document.querySelector('.map__filters');
  var housingType = formFilter.querySelector('#housing-type');
  var housingPrice = formFilter.querySelector('#housing-price');
  var housingRooms = formFilter.querySelector('#housing-rooms');
  var housingGuests = formFilter.querySelector('#housing-guests');
  var filterWifi = formFilter.querySelector('#filter-wifi');
  var filterDishwasher = formFilter.querySelector('#filter-dishwasher');
  var filterParking = formFilter.querySelector('#filter-parking');
  var filterWasher = formFilter.querySelector('#filter-washer');
  var filterElevator = formFilter.querySelector('#filter-elevator');
  var filterConditioner = formFilter.querySelector('#filter-conditioner');

  //  обработчик по change
  formFilter.addEventListener('change', function () {

    //  проверяем открыто ли обьявление, и удаляем его
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    //  определяем состояние фильтра после change
    var stateFilter = {
      type: housingType.value,
      price: housingPrice.value,
      rooms: housingRooms.value,
      guests: housingGuests.value,
      thereIsWifi: filterWifi.checked,
      thereIsDishwasher: filterDishwasher.checked,
      thereIsParking: filterParking.checked,
      thereIsWasher: filterWasher.checked,
      thereIsElevator: filterElevator.checked,
      thereIsConditioner: filterConditioner.checked
    };
    //  создаем массив, для похожих объявлений
    var similarAdverts = [];

    adverts.forEach(function (item) {

      var priceMin;
      var priceMax;
      switch (stateFilter.price) {
        case 'low':
          priceMin = PRICES.LOW_MIN;
          priceMax = PRICES.LOW_MAX;
          break;
        case 'middle':
          priceMin = PRICES.MIDDLE_MIN;
          priceMax = PRICES.MIDDLE_MAX;
          break;
        case 'high':
          priceMin = PRICES.HIGH_MIN;
          priceMax = PRICES.HIGH_MAX;
          break;
      }

      //  записываем соответствие фильтру по параметрам
      var matchesFilter = {};
      //  проверка по соответствию фильтру, либо при значении "любой"
      matchesFilter.type = (item.offer.type === stateFilter.type) || (stateFilter.type === 'any');
      matchesFilter.price = (priceMin <= item.offer.price && item.offer.price <= priceMax) || (stateFilter.price === 'any');
      matchesFilter.rooms = (item.offer.rooms === +stateFilter.rooms) || (stateFilter.rooms === 'any');
      matchesFilter.guests = (item.offer.guests === +stateFilter.guests) || (stateFilter.guests === 'any');

      matchesFilter.wifi = (item.offer.features.indexOf('wifi') >= 0) && stateFilter.thereIsWifi || !stateFilter.thereIsWifi;
      matchesFilter.dishwasher = (item.offer.features.indexOf('dishwasher') >= 0) && stateFilter.thereIsDishwasher || !stateFilter.thereIsDishwasher;
      matchesFilter.parking = (item.offer.features.indexOf('parking') >= 0) && stateFilter.thereIsParking || !stateFilter.thereIsParking;
      matchesFilter.washer = (item.offer.features.indexOf('washer') >= 0) && stateFilter.thereIsWasher || !stateFilter.thereIsWasher;
      matchesFilter.elevator = (item.offer.features.indexOf('elevator') >= 0) && stateFilter.thereIsElevator || !stateFilter.thereIsElevator;
      matchesFilter.conditioner = (item.offer.features.indexOf('conditioner') >= 0) && stateFilter.thereIsConditioner || !stateFilter.thereIsConditioner;

      //  в случае соответствия добавляем в массив похожих объявлений
      if (matchesFilter.type && matchesFilter.rooms && matchesFilter.price && matchesFilter.guests && matchesFilter.wifi && matchesFilter.dishwasher && matchesFilter.parking && matchesFilter.washer && matchesFilter.elevator && matchesFilter.conditioner) {
        similarAdverts.push(item);
      }
    });
    //  удаляем старые объявления
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main');
    mapPins.forEach(function (element) {
      element.remove();
    });

    window.renderMap.mapPins.removeEventListener('click', window.renderMap.onMapPinsClick);

    //  отрисовываем новые из массива похожих объявлений
    var renderPage = window.renderMap.renderPage;
    var updatePins = window.debounce(renderPage);

    updatePins(similarAdverts);

  });
})();

