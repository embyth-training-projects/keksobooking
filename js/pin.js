'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  // Размеры маркера
  var PIN_SIZE = {
    WIDTH: 50,
    HEIGHT: 70
  };

  // Позиция главного маркера по умолчанию
  var PIN_POSITION = {
    X: 570,
    Y: 375
  };

  // Отрисовать маркер
  window.renderMapPins = function (adData) {
    var fragment = document.createDocumentFragment();
    var index = 0;

    adData.forEach(function (item) {
      var pinElement = document.querySelector('#pin').content.cloneNode(true);

      pinElement.querySelector('.map__pin').style.left = item.offer.location.x - PIN_SIZE.WIDTH / 2 + 'px';
      pinElement.querySelector('.map__pin').style.top = item.offer.location.y - PIN_SIZE.HEIGHT + 'px';
      pinElement.querySelector('img').src = item.author.avatar;
      pinElement.querySelector('img').alt = item.offer.title;
      pinElement.querySelector('.map__pin').setAttribute('data-pin', index++);

      fragment.appendChild(pinElement);
    });

    return fragment;
  };

  // Переместить главный маркер в начальную позицию
  window.movePinToDefaultPosition = function () {
    mainPin.style.left = PIN_POSITION.X + 'px';
    mainPin.style.top = PIN_POSITION.Y + 'px';
  };
})();
