'use strict';

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
    var featureElement = document.createElement('span');

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

// Отрисовать маркер
function renderMapPin(adData) {
  var fragment = document.createDocumentFragment();

  adData.forEach(function (item) {
    var pinElement = document.querySelector('#pin').content.cloneNode(true);

    pinElement.querySelector('.map__pin').style.left = item.offer.location.x - PIN_SIZE.WIDTH / 2 + 'px';
    pinElement.querySelector('.map__pin').style.top = item.offer.location.y - PIN_SIZE.HEIGHT + 'px';
    pinElement.querySelector('img').src = item.author.avatar;
    pinElement.querySelector('img').alt = item.offer.title;

    fragment.appendChild(pinElement);
  });

  return fragment;
}

// Отрисовать карточки с информацией
function renderCards(adData) {
  var fragment = document.createDocumentFragment();

  adData.forEach(function (item) {
    var cardElement = document.querySelector('#card').content.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = item.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = getOfferPrice(item.offer.price);
    cardElement.querySelector('.popup__type').textContent = getOfferType(item.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = getOfferCapacity(item.offer.rooms, item.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = getOfferTime(item.offer.checkin, item.offer.checkout);
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(getOfferFeatures(item.offer.features));
    cardElement.querySelector('.popup__description').textContent = item.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = '';
    cardElement.querySelector('.popup__photos').appendChild(getOfferPhotos(item.offer.photos));
    cardElement.querySelector('.popup__avatar').src = item.author.avatar;

    fragment.appendChild(cardElement);
  });

  return fragment;
}

// Отрисовать элементы на карте
function insertElements(data) {
  document.querySelector('.map').classList.remove('map--faded');
  var mapPinsContainer = document.querySelector('.map__pins');

  mapPinsContainer.appendChild(renderMapPin(data));
  mapPinsContainer.after(renderCards(data));
}

// Отрисовываем элементы на страницы
insertElements(createAdsArray(TOTAL_ADS));
