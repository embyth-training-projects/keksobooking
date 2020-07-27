'use strict';

(function () {
  // Элементы для работы с маркерами
  var pinsContainer = document.querySelector('.map__pins');

  // Создаём маркер
  function createPin(offer) {
    var pinNode = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
    var pinX = offer.location.x - window.CONSTANTS.PIN.SIZE.WIDTH / 2;
    var pinY = offer.location.y - window.CONSTANTS.PIN.SIZE.HEIGHT;
    pinNode.style.left = pinX + 'px';
    pinNode.style.top = pinY + 'px';

    var avatarNode = pinNode.querySelector('img');
    avatarNode.src = offer.author.avatar;
    avatarNode.alt = offer.offer.title;

    return pinNode;
  }

  // Отрисовать маркер
  function renderPins(offers) {
    var fragment = document.createDocumentFragment();
    var totalOffers = (offers.length - window.CONSTANTS.ADS.TOTAL <= 0) ? offers.length : window.CONSTANTS.ADS.TOTAL;

    if (totalOffers !== 0) {
      for (var i = 0; i < totalOffers; i++) {
        if (offers[i].offer) {
          var pinElement = createPin(offers[i]);
          pinElement.setAttribute('data-pin', offers[i].id);
          fragment.appendChild(pinElement);
        }
      }
      pinsContainer.addEventListener('click', onPinClick);
      pinsContainer.addEventListener('keydown', onPinKeyDown);
      pinsContainer.appendChild(fragment);
    }
  }

  // Переместить главный маркер
  function setPosition(pinNode, x, y) {
    pinNode.style.left = x + 'px';
    pinNode.style.top = y + 'px';
  }

  // Удаляем маркер
  function remove(pins) {
    pins.forEach(function (pin) {
      pin.remove();
    });

    pinsContainer.removeEventListener('click', onPinClick);
    pinsContainer.removeEventListener('keydown', onPinKeyDown);
  }

  // Убираем класс активности
  function disable() {
    var activePin = pinsContainer.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  }

  // Обновление маркеров на карте (для фильтров)
  function update(offers) {
    var pinNodes = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.card.close();
    pinNodes.forEach(function (pin) {
      pin.classList.add('hidden');
      offers.forEach(function (offer) {
        if (offer.id === parseInt(pin.getAttribute('data-pin'), 10)) {
          pin.classList.remove('hidden');
        }
      });
    });
  }

  // Обработчик клика на маркер
  function onPinClick(evt) {
    var pinNode = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (!pinNode) {
      return;
    }

    var activePin = pinsContainer.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }

    pinNode.classList.add('map__pin--active');
    window.card.render(window.offers[pinNode.getAttribute('data-pin')]);
  }

  // Обработчик кнопки ENTER на маркере
  function onPinKeyDown(evt) {
    if (window.util.isEnterKey(evt)) {
      onPinClick(evt);
    }
  }

  // Передаём функции в глобальную область видимости
  window.pin = {
    render: renderPins,
    setPosition: setPosition,
    remove: remove,
    disable: disable,
    update: update
  };
})();
