'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 300; // ms

  window.debounce = function (fun) {

    return function () {
      var args = arguments;
      if (window.lastTimeout) {
        window.clearTimeout(window.lastTimeout);
      }
      window.lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
//  не понятно почему уходит из зоны видимости lastTimeout, я в слаке написал подробнее
