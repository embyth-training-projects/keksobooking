'use strict';

(function () {
  // Элементы карты
  var mapNode = document.querySelector('.map');

  // Пределы карты
  var MapLimit = {
    TOP: 130 - window.CONSTANTS.PIN.SIZE.HEIGHT - window.CONSTANTS.PIN.SIZE.TAIL,
    RIGHT: 1200 - window.CONSTANTS.PIN.SIZE.WIDTH / 2,
    BOTTOM: 630 - window.CONSTANTS.PIN.SIZE.HEIGHT - window.CONSTANTS.PIN.SIZE.TAIL,
    LEFT: -window.CONSTANTS.PIN.SIZE.WIDTH / 2
  };

  // Активируем карту
  function activate() {
    mapNode.classList.remove('map--faded');
  }

  // Отключаем карту
  function disable() {
    var pinsNode = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.pin.remove(pinsNode);
    var mainPin = document.querySelector('.map__pin--main');
    window.pin.setPosition(mainPin, window.CONSTANTS.PIN.DEFAULT_POSITION.X, window.CONSTANTS.PIN.DEFAULT_POSITION.Y);
    mapNode.classList.add('map--faded');
  }

  // Заносим функции в глобальную область видимости
  window.map = {
    Limit: MapLimit,
    activate: activate,
    disable: disable
  };
})();
