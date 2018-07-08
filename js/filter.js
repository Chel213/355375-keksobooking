'use strict';
(function () {
  var adverts;
  window.backend.load(function (data) {
    adverts = data;
  });

  var PRICES = {
    LOW: 10000,
    MIDDLE: 50000,
    HIGH: 50000
  };

  var filter = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    wifi: false,
    dishwasher: false,
    parking: false,
    washer: false,
    elevator: false,
    conditioner: false
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
      filter.wifi = evt.target.checked;
    }
    if (evt.target.id === 'filter-dishwasher') {
      filter.dishwasher = evt.target.checked;
    }
    if (evt.target.id === 'filter-parking') {
      filter.parking = evt.target.checked;
    }
    if (evt.target.id === 'filter-washer') {
      filter.washer = evt.target.checked;
    }
    if (evt.target.id === 'filter-elevator') {
      filter.elevator = evt.target.checked;
    }
    if (evt.target.id === 'filter-conditioner') {
      filter.conditioner = evt.target.checked;
    }
    return filter;
  };

  var sortsAdverts = function (data) {
    var copyAdverts = data.filter(function (element) {
      return element.rank > 0;
    });
    var compareRank = function (advertA, advertB) {
      return advertB.rank - advertA.rank;
    };
    copyAdverts.sort(compareRank);
    copyAdverts.splice(5);
    return copyAdverts;
  };

  var formFilter = document.querySelector('.map__filters');

  formFilter.addEventListener('change', function (evt) {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    var stateFilter = determinesStateFilter(evt);

    adverts.forEach(function (item) {
      item.rank = 0;
      if (item.offer.type === stateFilter.type) {
        item.rank += 1;
      }
      if (item.offer.price <= PRICES.LOW && stateFilter.price === 'low') {
        item.rank += 1;
      }
      if (item.offer.price > PRICES.LOW && item.offer.price <= PRICES.MIDDLE && stateFilter.price === 'middle') {
        item.rank += 1;
      }
      if (item.offer.price > PRICES.HIGH && stateFilter.price === 'high') {
        item.rank += 1;
      }
      if (item.offer.rooms === +stateFilter.rooms) {
        item.rank += 1;
      }
      if (item.offer.guests === +stateFilter.guests) {
        item.rank += 1;
      }

      item.offer.features.forEach(function (features) {
        if (features === 'wifi' && stateFilter.wifi) {
          item.rank += 1;
        }
        if (features === 'dishwasher' && stateFilter.dishwasher) {
          item.rank += 1;
        }
        if (features === 'parking' && stateFilter.parking) {
          item.rank += 1;
        }
        if (features === 'washer' && stateFilter.washer) {
          item.rank += 1;
        }
        if (features === 'elevator' && stateFilter.elevator) {
          item.rank += 1;
        }
        if (features === 'conditioner' && stateFilter.conditioner) {
          item.rank += 1;
        }
      });
    });

    var advertsDefolt = adverts.slice();
    var listAdverts = sortsAdverts(adverts);

    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main');
    mapPins.forEach(function (element) {
      element.remove();
    });

    window.renderMap.mapPins.removeEventListener('click', window.renderMap.onMapPinsClick);

    if (stateFilter.type === 'any' && stateFilter.price === 'any' && stateFilter.rooms === 'any' && stateFilter.guests === 'any' && !stateFilter.wifi && !stateFilter.dishwasher && !stateFilter.parking && !stateFilter.washer && !stateFilter.elevator && !stateFilter.conditioner) {
      updatePins(300, advertsDefolt);
    } else {
      updatePins(300, listAdverts);
    }
  });
})();


