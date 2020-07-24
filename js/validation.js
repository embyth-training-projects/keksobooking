'use strict';

// Валидация формы
(function () {
  // Элементы формы
  var formNode = document.querySelector('.ad-form');
  var title = formNode.querySelector('#title');
  var price = formNode.querySelector('#price');
  var type = formNode.querySelector('#type');
  var checkin = formNode.querySelector('#timein');
  var checkout = formNode.querySelector('#timeout');
  var rooms = formNode.querySelector('#room_number');
  var guests = formNode.querySelector('#capacity');

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
      NO_GUESTS_ALLOWED: 100
    }
  };

  // Словарь сообщений ошибок
  var ErrorMessage = {
    TITLE: {
      VALUE_MISSING: 'Введите заголовок',
      TOO_SHORT: 'Заголовок должен состоять минимум из ' + InputProps.TITLE.MIN_LENGTH + ' символов, вы ввели - ',
      TOO_LONG: 'Заголовок не может составлять больше ' + InputProps.TITLE.MAX_LENGTH + ' символов, вы ввели - ',
    },
    PRICE: {
      UNDERFLOW: {
        BUNGALO: '«Бунгало» - минимальная цена за ночь ' + InputProps.PRICE.MIN.BUNGALO,
        FLAT: '«Квартира» - минимальная цена за ночь ' + InputProps.PRICE.MIN.FLAT,
        HOUSE: '«Дом» - минимальная цена за ночь ' + InputProps.PRICE.MIN.HOUSE,
        PALACE: '«Дворец» - минимальная цена за ночь ' + InputProps.PRICE.MIN.PALACE
      },
      OVERFLOW: 'Максимальная цена на жильё - ' + InputProps.PRICE.MAX,
      VALUE_MISSING: 'Укажите цену'
    },
    CAPACITY: {
      1: '1 комната - «для 1 гостя»',
      2: '2 комнаты - «для 2 гостя» и «для 1 гостя»',
      3: '3 комнаты - «для 3 гостя», «для 2 гостя» и «для 1 гостя»',
      100: '100 комнат - «не для гостей»'
    }
  };

  // Подсвечиваем инпут
  function highlightInput(input) {
    input.style.border = '2px solid crimson';
    input.style.boxShadow = 'none';
  }

  // Убираем подсветку инпута
  function resetHighlightInput(input) {
    input.style.border = '';
  }

  // Обработчик инпута заголовка
  function onTitleChange() {
    if (title.validity.valueMissing) {
      title.setCustomValidity(ErrorMessage.TITLE.VALUE_MISSING);
      highlightInput(title);
    } else if (title.validity.tooShort) {
      title.setCustomValidity(ErrorMessage.TITLE.TOO_SHORT + title.value.length);
      highlightInput(title);
    } else if (title.validity.tooLong) {
      title.setCustomValidity(ErrorMessage.TITLE.TOO_LONG + title.value.length);
      highlightInput(title);
    } else {
      title.setCustomValidity('');
      resetHighlightInput(title);
    }
  }

  // Обработчик инпута типа жилья
  function onTypeChange() {
    var minPrice = InputProps.PRICE.MIN[type.value.toUpperCase()];
    price.placeholder = minPrice;
    price.min = minPrice;

    onPriceChange();
  }

  // Обработчик инпута цены жилья
  function onPriceChange() {
    if (price.validity.rangeOverflow) {
      price.setCustomValidity(ErrorMessage.PRICE.OVERFLOW);
      highlightInput(price);
    } else if (price.validity.rangeUnderflow) {
      price.setCustomValidity(ErrorMessage.PRICE.UNDERFLOW[type.value.toUpperCase()]);
      highlightInput(price);
    } else if (price.validity.valueMissing) {
      price.setCustomValidity(ErrorMessage.PRICE.VALUE_MISSING);
      highlightInput(price);
    } else {
      price.setCustomValidity('');
      resetHighlightInput(price);
    }
  }

  // Обработчик инпута чекина
  function onCheckinChange() {
    if (parseInt(checkin.value, 10) !== parseInt(checkout.value, 10)) {
      checkout.value = checkin.value;
    }
  }

  // Обработчик инпута чекаута
  function onCheckoutChange() {
    if (parseInt(checkin.value, 10) !== parseInt(checkout.value, 10)) {
      checkin.value = checkout.value;
    }
  }

  // Обработчик инпута количества комнат
  function onRoomsAndGuestsChange() {
    resetHighlightInput(guests);
    guests.setCustomValidity('');
    switch (rooms.value) {
      case '1':
        if (guests.value !== '1') {
          guests.setCustomValidity(ErrorMessage.CAPACITY[rooms.value]);
          highlightInput(guests);
        }
        break;
      case '2':
        if (guests.value === '0' || guests.value === '3') {
          guests.setCustomValidity(ErrorMessage.CAPACITY[rooms.value]);
          highlightInput(guests);
        }
        break;
      case '3':
        if (guests.value === '0') {
          guests.setCustomValidity(ErrorMessage.CAPACITY[rooms.value]);
          highlightInput(guests);
        }
        break;
      case '100':
        if (guests.value !== '0') {
          guests.setCustomValidity(ErrorMessage.CAPACITY[rooms.value]);
          highlightInput(guests);
        }
        break;
    }
  }

  // Добавляем обработчики формы
  function activate() {
    title.minLength = InputProps.TITLE.MIN_LENGTH;
    title.maxLength = InputProps.TITLE.MAX_LENGTH;
    price.placeholder = InputProps.PRICE.MIN[type.value.toUpperCase()];

    title.addEventListener('input', onTitleChange);
    type.addEventListener('change', onTypeChange);
    price.addEventListener('change', onPriceChange);
    checkin.addEventListener('change', onCheckinChange);
    checkout.addEventListener('change', onCheckoutChange);
    rooms.addEventListener('change', onRoomsAndGuestsChange);
    guests.addEventListener('change', onRoomsAndGuestsChange);
  }

  // Удаляем обработчики с формы
  function disable() {
    title.removeEventListener('input', onTitleChange);
    type.removeEventListener('change', onTypeChange);
    price.removeEventListener('change', onPriceChange);
    checkin.removeEventListener('change', onCheckinChange);
    checkout.removeEventListener('change', onCheckoutChange);
    rooms.removeEventListener('change', onRoomsAndGuestsChange);
    guests.addEventListener('change', onRoomsAndGuestsChange);
  }

  // Передаем активацию/отключение валидации формы в глобальную область видимости
  window.validation = {
    activate: activate,
    disable: disable
  };
})();
