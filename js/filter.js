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

  var filter = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    thereIsWifi: false,
    thereIsDishwasher: false,
    thereIsParking: false,
    thereIsWasher: false,
    thereIsElevator: false,
    thereIsConditioner: false
  };

  window.timerIdRender = null;
  var updatePins = function (time, list) {
    if (window.timerIdRender) {
      clearTimeout(window.timerIdRender);
    }
    window.timerIdRender = setTimeout(window.renderMap.renderPage, time, list);
  };

  var determinesStateFilter = function (evt) {

    if (evt.target.name === 'housing-type') {
      filter.type = evt.target.value;
    }
    if (evt.target.name === 'housing-price') {
      filter.price = evt.target.value;
    }
    if (evt.target.name === 'housing-rooms') {
      filter.rooms = evt.target.value;
    }
    if (evt.target.name === 'housing-guests') {
      filter.guests = evt.target.value;
    }
    if (evt.target.id === 'filter-wifi') {
      filter.thereIsWifi = evt.target.checked;
    }
    if (evt.target.id === 'filter-dishwasher') {
      filter.thereIsDishwasher = evt.target.checked;
    }
    if (evt.target.id === 'filter-parking') {
      filter.thereIsParking = evt.target.checked;
    }
    if (evt.target.id === 'filter-washer') {
      filter.thereIsWasher = evt.target.checked;
    }
    if (evt.target.id === 'filter-elevator') {
      filter.thereIsElevator = evt.target.checked;
    }
    if (evt.target.id === 'filter-conditioner') {
      filter.thereIsConditioner = evt.target.checked;
    }
    return filter;
  };


  var formFilter = document.querySelector('.map__filters');

  formFilter.addEventListener('change', function (evt) {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    var stateFilter = determinesStateFilter(evt);

    var similarAdverts = [];
    var matchesFilterType;
    var matchesFilterPrice;
    var matchesFilterRooms;
    var matchesFilterGuests;

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

      matchesFilterType = (item.offer.type === stateFilter.type) || (stateFilter.type === 'any');
      matchesFilterPrice = (priceMin <= item.offer.price && item.offer.price <= priceMax) || (stateFilter.price === 'any');
      matchesFilterRooms = (item.offer.rooms === +stateFilter.rooms) || (stateFilter.rooms === 'any');
      matchesFilterGuests = (item.offer.guests === +stateFilter.guests) || (stateFilter.guests === 'any');

      var matchesFilterWifi = false;
      var matchesFilterDishwasher = false;
      var matchesFilterParking = false;
      var matchesFilterWasher = false;
      var matchesFilterElevator = false;
      var matchesFilterConditioner = false;

      item.offer.features.forEach(function (featuresItem) {
        if (featuresItem === 'wifi' && stateFilter.thereIsWifi) {
          matchesFilterWifi = true;
        }
        if (featuresItem === 'dishwasher' && stateFilter.dishwasher) {
          matchesFilterDishwasher = true;
        }
        if (featuresItem === 'parking' && stateFilter.parking) {
          matchesFilterParking = true;
        }
        if (featuresItem === 'washer' && stateFilter.washer) {
          matchesFilterWasher = true;
        }
        if (featuresItem === 'elevator' && stateFilter.elevator) {
          matchesFilterElevator = true;
        }
        if (featuresItem === 'conditioner' && stateFilter.conditioner) {
          matchesFilterConditioner = true;
        }

      });

      if (matchesFilterType && matchesFilterRooms && matchesFilterPrice && matchesFilterGuests && (matchesFilterWifi || !stateFilter.thereIsWifi) && (matchesFilterDishwasher || !stateFilter.dishwasher) && (matchesFilterParking || !stateFilter.parking) && (matchesFilterWasher || !stateFilter.washer) && (matchesFilterElevator || !stateFilter.elevator) && (matchesFilterConditioner || !stateFilter.conditioner)) {
        similarAdverts.push(item);
      }
    });

    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main');
    mapPins.forEach(function (element) {
      element.remove();
    });

    window.renderMap.mapPins.removeEventListener('click', window.renderMap.onMapPinsClick);

    updatePins(300, similarAdverts);
  });
})();

