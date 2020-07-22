'use strict';

// ======================================= //
// ======== VARIABLES / CONSTANTS ======== //
// ======================================= //

// Количесво объявлений
var TOTAL_ADS = 8;

// Информация для объявлений
var OffersData = {
  TITLES: [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ],
  APARTMENT_TYPE: ['palace', 'flat', 'house', 'bunglo'],
  CHECKINS: ['12:00', '13:00', '14:00'],
  CHECKOUTS: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ],
  AVATAR_DEST: {
    FOLDER: 'img/avatars/',
    NAME: 'user',
    EXT: '.png'
  },
  PRICE: {
    MIN: 1000,
    MAX: 1000000
  },
  ROOMS: {
    MIN: 1,
    MAX: 5
  },
  GUESTS: {
    MIN: 1,
    MAX: 15
  },
  LOCATION: {
    X: {
      MIN: 300,
      MAX: 900
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  }
};

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

var KEY_CODES = {
  ENTER: 13,
  ESC: 27
};

// ============================== //
// ======== DOM Elements ======== //
// ============================== //

var mapField = document.querySelector('.map');
var mapPinsContainer = mapField.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');

var adForm = document.querySelector('.ad-form');
var addressInput = adForm.querySelector('#address');
var formReset = adForm.querySelector('.ad-form__reset');

// ========================= //
// ======== UTILITY ======== //
// ========================= //

// Проверка на нажатие кнопки Enter
function isEnterKey(evt, action) {
  if (evt.keyCode === KEY_CODES.ENTER) {
    action();
  }
}

// Проверка на нажатие кнопки ESC
function isEscKey(evt, action) {
  if (evt.keyCode === KEY_CODES.ESC) {
    action();
  }
}

// Показать элемент
function showElement(element) {
  element.classList.remove('hidden');
}

// Скрыть элемент
function hideElement(element) {
  element.classList.add('hidden');
}

// Получить случайное число
function getRandomIndex(number) {
  return Math.floor(Math.random() * number);
}

// Получить случайное число в диапозоне
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Получить случайное значение
function getRandomValue(array) {
  return array[getRandomIndex(array.length)];
}

// Перемешать массив
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Обрезать массив с рандомного места
function sliceRandomArray(array) {
  var sliced = array.slice();
  return sliced.slice(Math.floor(Math.random() * array.length));
}

// ========================= //
// ======== GETTERS ======== //
// ========================= //

// Получить путь к аватарке
function getAvatarUrl(amount) {
  var avatarUrl = [];
  var avatarItem;

  for (var j = 1; j < amount + 1; j++) {
    if (j < 10) {
      avatarItem = OffersData.AVATAR_DEST.FOLDER + OffersData.AVATAR_DEST.NAME + 0 + j + OffersData.AVATAR_DEST.EXT;
    } else {
      avatarItem = OffersData.AVATAR_DEST.FOLDER + OffersData.AVATAR_DEST.NAME + j + OffersData.AVATAR_DEST.EXT;
    }

    avatarUrl.push(avatarItem);
  }

  return avatarUrl;
}

// Получить строку цены
function getOfferPrice(price) {
  return price + ' &#x20BD;<span>/ночь</span>';
}

// Получить строку типа жилья
function getOfferType(type) {
  var result;

  switch (type) {
    case 'flat':
      result = 'Квартира';
      break;
    case 'bungalo':
      result = 'Бунгало';
      break;
    case 'house':
      result = 'Дом';
      break;
    case 'palace':
      result = 'Дворец';
      break;
  }

  return result;
}

// Получить строку вместительности жилья
function getOfferCapacity(rooms, guests) {
  var guestsText = (guests === 1) ? 'гостя' : 'гостей';
  return rooms + ' комнаты для ' + guests + ' ' + guestsText;
}

// Получить строку времени прибытия и отбытия с жилья
function getOfferTime(checkin, checkout) {
  return 'Заезд после ' + checkin + ', выезд до ' + checkout;
}

// Получить фрагмент особенностей жилья
function getOfferFeatures(array) {
  var fragment = document.createDocumentFragment();

  array.forEach(function (item) {
    var featureElement = document.createElement('li');

    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + item);

    fragment.appendChild(featureElement);
  });

  return fragment;
}

// Получить фото жилья
function getOfferPhotos(photos) {
  var fragment = document.createDocumentFragment();

  photos.forEach(function (photo) {
    var photoElement = document.createElement('img');

    photoElement.src = photo;
    photoElement.classList.add('popup__photo');
    photoElement.style.width = '45px';
    photoElement.style.height = '40px';
    photoElement.alt = 'Фотография жилья';

    fragment.appendChild(photoElement);
  });

  return fragment;
}

// ============================= //
// ======== FUNCTIONALS ======== //
// ============================= //

// Создать массив объявлений
function createAdsArray(adAmount) {
  var ads = [];
  var avatarUrls = shuffleArray(getAvatarUrl(adAmount));

  for (var i = 0; i < adAmount; i++) {
    var locationX = getRandomNumber(OffersData.LOCATION.X.MIN, OffersData.LOCATION.X.MAX);
    var locationY = getRandomNumber(OffersData.LOCATION.Y.MIN, OffersData.LOCATION.Y.MAX);

    ads.push({
      author: {
        avatar: avatarUrls[i]
      },
      offer: {
        title: shuffleArray(OffersData.TITLES)[i],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(OffersData.PRICE.MIN, OffersData.PRICE.MAX),
        type: getRandomValue(OffersData.APARTMENT_TYPE),
        rooms: getRandomNumber(OffersData.ROOMS.MIN, OffersData.ROOMS.MAX),
        guests: getRandomNumber(OffersData.GUESTS.MIN, OffersData.GUESTS.MAX),
        checkin: getRandomValue(OffersData.CHECKINS),
        checkout: getRandomValue(OffersData.CHECKOUTS),
        features: sliceRandomArray(shuffleArray(OffersData.FEATURES)),
        description: '',
        photos: shuffleArray(OffersData.PHOTOS),
        location: {
          x: locationX,
          y: locationY
        }
      }
    });
  }
  return ads;
}

// Отрисовать маркер
function renderMapPins(adData) {
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
}

// Отрисовать карточки с информацией
function renderCards(data) {
  var fragment = document.createDocumentFragment();

  data.forEach(function (item) {
    var cardElement = document.querySelector('#card').content.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = item.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = getOfferPrice(item.offer.price);
    cardElement.querySelector('.popup__type').textContent = getOfferType(item.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = getOfferCapacity(item.offer.rooms, item.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = getOfferTime(item.offer.checkin, item.offer.checkout);
    clearNodeChilds(cardElement.querySelector('.popup__features'));
    cardElement.querySelector('.popup__features').appendChild(getOfferFeatures(item.offer.features));
    cardElement.querySelector('.popup__description').textContent = item.offer.description;
    clearNodeChilds(cardElement.querySelector('.popup__photos'));
    cardElement.querySelector('.popup__photos').appendChild(getOfferPhotos(item.offer.photos));
    cardElement.querySelector('.popup__avatar').src = item.author.avatar;
    cardElement.querySelector('.map__card').classList.add('hidden');

    fragment.appendChild(cardElement);
  });

  return fragment;
}

// Отрисовать элементы на карте
function insertMapElements(data) {
  mapPinsContainer.appendChild(renderMapPins(data));
  mapPinsContainer.after(renderCards(data));

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

  addressInput.value = x + ', ' + y;
}

// Очищаем маркеры с карты
function clearMapElements(selector) {
  mapField.querySelectorAll(selector).forEach(function (item) {
    item.remove();
  });
}

// Очищаем дочерние элементы
function clearNodeChilds(node) {
  while (node.firstChild) {
    node.firstChild.remove();
  }
}

// Переключатель инпутов
function toggleInputs(form, isDisabled) {
  form.querySelectorAll('input').forEach(function (input) {
    input.disabled = isDisabled;
  });

  form.querySelectorAll('select').forEach(function (select) {
    select.disabled = isDisabled;
  });

  form.querySelectorAll('textarea').forEach(function (textarea) {
    textarea.disabled = isDisabled;
  });

  form.querySelectorAll('button').forEach(function (button) {
    button.disabled = isDisabled;
  });
}

// Переместить главный маркер в начальную позицию
function movePinToDefaultPosition() {
  mainPin.style.left = PIN_POSITION.X + 'px';
  mainPin.style.top = PIN_POSITION.Y + 'px';
}

// Деактивируем карту
function disableMap() {
  clearMapElements('.map__pin:not(.map__pin--main)');
  clearMapElements('.map__card');
  updateAddress(false);
  toggleInputs(adForm, true);
  movePinToDefaultPosition();
  removeMapHandlers();
  mapField.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
}

// Активируем карту
function enableMap() {
  addMapHandlers();
  toggleInputs(adForm, false);
  insertMapElements(generatedAds);
  mapField.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
}

// ========================== //
// ======== HANDLERS ======== //
// ========================== //

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
    showElement(offers[targetIndex]);
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
  if (evt.target.keyCode === KEY_CODES.ENTER) {
    mapOfferOpenHandler(evt);
  }
}

// Обработчик закрытия объявления
function mapOfferCloseHandler() {
  var offers = mapField.querySelectorAll('.map__card');

  offers.forEach(function (item) {
    hideElement(item);
    item.querySelector('.popup__close').removeEventListener('click', closeOfferClickHandler);
  });

  document.removeEventListener('keydown', mapOfferEscPressHandler);
}

// Обработчик кнопки ESC нa карточке объявления
function mapOfferEscPressHandler(evt) {
  isEscKey(evt, mapOfferCloseHandler);
}

// Обработчик клика на карточке объявления
function closeOfferClickHandler() {
  mapOfferCloseHandler();
}

// Обработчик кнопки Enter нa главном маркерах
function mainPinEnterPressHandler(evt) {
  isEnterKey(evt, enableMap);
}

// Обработчик сброса формы
function formResetClickHandler(evt) {
  evt.preventDefault();
  disableMap();
}

// Добавление обработчиков на карту
function addMapHandlers() {
  mainPin.removeEventListener('mouseup', mainPinMouseUpHandler);
  mainPin.removeEventListener('keydown', mainPinEnterPressHandler);

  formReset.addEventListener('click', formResetClickHandler);
}

// Удаление обработчиков с карты
function removeMapHandlers() {
  mainPin.addEventListener('mouseup', mainPinMouseUpHandler);
  mainPin.addEventListener('keydown', mainPinEnterPressHandler);

  formReset.removeEventListener('click', formResetClickHandler);
}

// ================================ //
// ======== INITIALIZATION ======== //
// ================================ //

// Запуск
disableMap();
var generatedAds = createAdsArray(TOTAL_ADS);
