'use strict';
(function () {
  var PriceRange = {
    low: [0, 10000],
    middle: [10000, 50000],
    high: [50000, Infinity],
    any: [-Infinity, Infinity]
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

  var renderPage = window.renderMap.page;
  var updatePins = window.debounce(renderPage);


  var FILTERS = {
    price: function (offer, priceType) {
      return offer.price >= PriceRange[priceType][0] && offer.price < PriceRange[priceType][1];
    },
    type: function (offer, type) {
      return type === 'any' || offer.type === type;
    },
    rooms: function (offer, rooms) {
      return rooms === 'any' || offer.rooms === +rooms;
    },
    guests: function (offer, guests) {
      return guests === 'any' || offer.guests === +guests;
    },
    features: function (offer, features) {

      return features.every(function (feature) {
        return offer.features.indexOf(feature) !== -1;
      });
    }
  };


  var filter = function (advert) {
    var offer = advert.offer;

    return FILTERS.type(offer, state.type) &&
      FILTERS.price(offer, state.price) &&
      FILTERS.rooms(offer, state.rooms) &&
      FILTERS.guests(offer, state.guests) &&
      FILTERS.features(offer, state.features);
  };

  var state = {
    price: 'any',
    type: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };

  var filtersFeatures = function (feature) {
    if (feature.checked) {
      state.features.push(feature.value);
    } else {
      state.features.splice(state.features.indexOf(feature.value), 1);
    }
  };

  //  обработчик по change
  formFilter.addEventListener('change', function (evt) {

    //  проверяем открыто ли обьявление, и удаляем его
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }

    //  точечно обновляем state, узнавая что произошло через evt
    switch (evt.target) {
      case housingType:
        state.type = housingType.value;
        break;
      case housingPrice:
        state.price = housingPrice.value;
        break;
      case housingRooms:
        state.rooms = housingRooms.value;
        break;
      case housingGuests:
        state.guests = housingGuests.value;
        break;
      case filterWifi:
        filtersFeatures(filterWifi);
        break;
      case filterDishwasher:
        filtersFeatures(filterDishwasher);
        break;
      case filterParking:
        filtersFeatures(filterParking);
        break;
      case filterWasher:
        filtersFeatures(filterWasher);
        break;
      case filterElevator:
        filtersFeatures(filterElevator);
        break;
      case filterConditioner:
        filtersFeatures(filterConditioner);
        break;
    }

    var similarAdverts = window.backend.data.filter(filter);

    //  удаляем старые объявления
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main');
    mapPins.forEach(function (element) {
      element.remove();
    });

    window.renderMap.pins.removeEventListener('click', window.renderMap.onMapPinsClick);
    updatePins(similarAdverts);
  });

})();

