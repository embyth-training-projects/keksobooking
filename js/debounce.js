'use strict';

(function () {
  // Интервал с которым будет обнуляться таймаут
  var DEBOUNCE_INTERVAL = 500; // ms

  // Функция против дребезга
  window.debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearInterval(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
