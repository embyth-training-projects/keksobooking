'use strict';

// Валидация формы
(function () {
  // Элементы формы
  var adForm = document.querySelector('.ad-form');
  var formOfferTitle = adForm.querySelector('#title');
  var formOfferPrice = adForm.querySelector('#price');
  var formOfferType = adForm.querySelector('#type');
  var formOfferCheckin = adForm.querySelector('#timein');
  var formOfferCheckout = adForm.querySelector('#timeout');
  var formOfferRooms = adForm.querySelector('#room_number');
  var formOfferGuests = adForm.querySelector('#capacity');

  // Словарь инпутов
  var InputProps = {
    TITLE: {
      MIN_LENGTH: 30,
      MAX_LENGTH: 100
    },
    PRICE: {
      MAX: 1000000,
      MIN: {
        BUNGALO: 0,
        FLAT: 1000,
        HOUSE: 5000,
        PALACE: 10000
      }
    },
    CAPACITY: {
      1: [1],
      2: [2, 1],
      3: [3, 2, 1],
      100: [0],
      NO_GUESTS_ALLOWED: 100
    }
  };

  // Словарь сообщений ошибок
  var ErrorMessage = {
    TITLE: {
      VALUE_MISSING: 'Введите заголовок',
      TOO_SHORT: 'Заголовок должен состоять минимум из ' + InputProps.TITLE.MIN_LENGTH + ' символов',
      TOO_LONG: 'Заголовок не может составлять больше ' + InputProps.TITLE.MAX_LENGTH + ' символов',
    },
    PRICE: {
      UNDERFLOW: 'Минимальная цена на ваш вид жилья - ',
      OVERFLOW: 'Максимальная цена на жильё - ' + InputProps.PRICE.MAX,
      VALUE_MISSING: 'Укажите цену'
    },
    CAPACITY: {
      MIN: 'Слишком много гостей на количество комнат',
      MAX: 'Слишком много комнат для гостей'
    }
  };

  // Обработчик инпута заголовка
  function formOfferTitleInputHandler() {
    if (formOfferTitle.validity.valueMissing) {
      formOfferTitle.setCustomValidity(ErrorMessage.TITLE.VALUE_MISSING);
    } else if (formOfferTitle.validity.tooShort) {
      formOfferTitle.setCustomValidity(ErrorMessage.TITLE.TOO_SHORT);
    } else if (formOfferTitle.validity.tooLong) {
      formOfferTitle.setCustomValidity(ErrorMessage.TITLE.TOO_LONG);
    } else {
      formOfferTitle.setCustomValidity('');
    }
  }

  // Обработчик инпута типа жилья
  function formOfferTypeChangeHandler() {
    var minPrice = InputProps.PRICE.MIN[formOfferType.value.toUpperCase()];
    formOfferPrice.placeholder = minPrice;
    formOfferPrice.min = minPrice;
  }

  // Обработчик инпута цены жилья
  function formOfferPriceChangeHandler() {
    if (formOfferPrice.validity.rangeOverflow) {
      formOfferPrice.setCustomValidity(ErrorMessage.PRICE.OVERFLOW);
    } else if (formOfferPrice.validity.rangeUnderflow) {
      formOfferPrice.setCustomValidity(ErrorMessage.PRICE.UNDERFLOW + formOfferPrice.min);
    } else if (formOfferPrice.validity.valueMissing) {
      formOfferPrice.setCustomValidity(ErrorMessage.PRICE.VALUE_MISSING);
    } else {
      formOfferPrice.setCustomValidity('');
    }
  }

  // Обработчик инпута чекина
  function formOfferCheckinChangeHandler() {
    formOfferCheckout.value = formOfferCheckin.value;
  }

  // Обработчик инпута чекаута
  function formOfferCheckoutChangeHandler() {
    formOfferCheckin.value = formOfferCheckout.value;
  }

  // Обработчик инпута количества комнат
  function formOfferRoomsChangeHandler() {
    var selectedRooms = +formOfferRooms.value;

    formOfferGuests.value = selectedRooms;

    if (selectedRooms === InputProps.CAPACITY.NO_GUESTS_ALLOWED) {
      formOfferGuests.value = 0;
    }

    checkRoomsToGuestValidity();
  }

  // Обработчик инпута количества гостей
  function formOfferGuestsChangeHandler() {
    checkRoomsToGuestValidity();
  }

  // Валидатор отношения количества комнат к гостям
  function checkRoomsToGuestValidity() {
    var selectedRooms = +formOfferRooms.value;
    var allowedGuests = InputProps.CAPACITY[selectedRooms];
    var selectedGuests = +formOfferGuests.value;

    if (!allowedGuests.includes(selectedGuests) && !allowedGuests.includes(0)) {
      formOfferGuests.setCustomValidity(ErrorMessage.CAPACITY.MIN);
    } else if (!allowedGuests.includes(selectedGuests)) {
      formOfferGuests.setCustomValidity(ErrorMessage.CAPACITY.MAX);
    } else {
      formOfferGuests.setCustomValidity('');
    }
  }

  // Добавляем обработчики формы
  window.addFormValidationHandlers = function () {
    formOfferTitle.addEventListener('input', formOfferTitleInputHandler);
    formOfferType.addEventListener('change', formOfferTypeChangeHandler);
    formOfferPrice.addEventListener('change', formOfferPriceChangeHandler);
    formOfferCheckin.addEventListener('change', formOfferCheckinChangeHandler);
    formOfferCheckout.addEventListener('change', formOfferCheckoutChangeHandler);
    formOfferRooms.addEventListener('change', formOfferRoomsChangeHandler);
    formOfferGuests.addEventListener('change', formOfferGuestsChangeHandler);
  };

  // Удаляем обработчики с формы
  window.removeFormValidationHandlers = function () {
    formOfferTitle.removeEventListener('input', formOfferTitleInputHandler);
    formOfferType.removeEventListener('change', formOfferTypeChangeHandler);
    formOfferPrice.removeEventListener('change', formOfferPriceChangeHandler);
    formOfferCheckin.removeEventListener('change', formOfferCheckinChangeHandler);
    formOfferCheckout.removeEventListener('change', formOfferCheckoutChangeHandler);
    formOfferRooms.removeEventListener('change', formOfferRoomsChangeHandler);
    formOfferGuests.addEventListener('change', formOfferGuestsChangeHandler);
  };
})();
