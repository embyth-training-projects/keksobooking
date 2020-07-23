'use strict';

(function () {
  // Элементы карты
  var mapField = document.querySelector('.map');
  var mapPinsContainer = mapField.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  // Отрисовать элементы на карте
  function insertMapElements(data) {
    mapPinsContainer.appendChild(window.renderMapPins(data));
    mapPinsContainer.after(window.renderCards(data));

    var mapPins = document.querySelectorAll('.map__pin');
    mapPins.forEach(function (pin) {
      pin.addEventListener('click', pinMouseClickHandler);
      pin.addEventListener('keydown', pinEnterPressHandler);
    });
  }

  // Обновляем адрес
  function updateAddress(isActive) {
    var pinWidth = mainPin.offsetWidth;
    var pinHeight = mainPin.offsetHeight;
    var pinTail = parseInt(getComputedStyle(mainPin, '::after').getPropertyValue('border-top-width'), 10);

    pinHeight = (isActive) ? pinHeight + pinTail : pinHeight / 2;

    var x = parseInt(mainPin.style.left, 10) + pinWidth / 2;
    var y = parseInt(mainPin.style.top, 10) + pinHeight;

    document.querySelector('#address').value = x + ', ' + y;
  }

  // Очищаем маркеры с карты
  function clearMapElements(selector) {
    mapField.querySelectorAll(selector).forEach(function (item) {
      item.remove();
    });
  }

  // Обработчик поднятия кнопки мыши на главном маркере
  function mainPinMouseUpHandler(evt) {
    evt.preventDefault();

    enableMap();
    updateAddress(true);
  }

  // Обработчик открытия объявления
  function mapOfferOpenHandler(evt) {
    var target = (evt.target.hasAttribute('data-pin')) ? evt.target : evt.target.parentNode;
    var targetIndex = target.getAttribute('data-pin');
    var offers = mapField.querySelectorAll('.map__card');

    mapOfferCloseHandler();

    if (targetIndex) {
      window.util.showElement(offers[targetIndex]);
    }

    offers.forEach(function (offer) {
      offer.querySelector('.popup__close').addEventListener('click', closeOfferClickHandler);
    });
    document.addEventListener('keydown', mapOfferEscPressHandler);
  }

  // Обработчик нажатия на маркер
  function pinMouseClickHandler(evt) {
    mapOfferOpenHandler(evt);
  }

  // Обработчик кнопки Enter нa маркерах
  function pinEnterPressHandler(evt) {
    if (evt.target.keyCode === window.CONSTANTS.KEY_CODES.ENTER) {
      mapOfferOpenHandler(evt);
    }
  }

  // Обработчик закрытия объявления
  function mapOfferCloseHandler() {
    var offers = mapField.querySelectorAll('.map__card');

    offers.forEach(function (item) {
      window.util.hideElement(item);
      item.querySelector('.popup__close').removeEventListener('click', closeOfferClickHandler);
    });

    document.removeEventListener('keydown', mapOfferEscPressHandler);
  }

  // Обработчик кнопки ESC нa карточке объявления
  function mapOfferEscPressHandler(evt) {
    window.util.isEscKey(evt, mapOfferCloseHandler);
  }

  // Обработчик клика на карточке объявления
  function closeOfferClickHandler() {
    mapOfferCloseHandler();
  }

  // Обработчик кнопки Enter нa главном маркерах
  function mainPinEnterPressHandler(evt) {
    window.util.isEnterKey(evt, enableMap);
  }

  // Добавление обработчиков на карту
  function addMapHandlers() {
    mainPin.removeEventListener('mouseup', mainPinMouseUpHandler);
    mainPin.removeEventListener('keydown', mainPinEnterPressHandler);
  }

  // Удаление обработчиков с карты
  function removeMapHandlers() {
    mainPin.addEventListener('mouseup', mainPinMouseUpHandler);
    mainPin.addEventListener('keydown', mainPinEnterPressHandler);
  }

  // Деактивируем карту
  window.disableMap = function () {
    clearMapElements('.map__pin:not(.map__pin--main)');
    clearMapElements('.map__card');
    updateAddress(false);
    removeMapHandlers();
    window.movePinToDefaultPosition();
    window.removeFormOfferHandlers();

    mapField.classList.add('map--faded');
  };

  // Активируем карту
  function enableMap() {
    addMapHandlers();
    insertMapElements(window.generatedAds);
    window.addFormOfferHandlers();

    mapField.classList.remove('map--faded');
  }

  // Запуск
  window.disableMap();
})();
