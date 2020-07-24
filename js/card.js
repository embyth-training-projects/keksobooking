'use strict';

(function () {
  // Создаем карту с объявлением
  function createCard(ad) {
    var cardNode = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);

    var titleNode = cardNode.querySelector('.popup__title');
    if (ad.offer.title.length === 0) {
      titleNode.remove();
    } else {
      titleNode.textContent = ad.offer.title;
    }

    var addressNode = cardNode.querySelector('.popup__text--address');
    if (ad.offer.address.length === 0) {
      addressNode.remove();
    } else {
      addressNode.textContent = ad.offer.address;
    }

    var priceNode = cardNode.querySelector('.popup__text--price');
    if (ad.offer.price.length === 0) {
      priceNode.remove();
    } else {
      priceNode.textContent = getOfferPrice(ad.offer.price);
    }

    var typeNode = cardNode.querySelector('.popup__type');
    if (ad.offer.type.length === 0) {
      typeNode.remove();
    } else {
      typeNode.textContent = getOfferType(ad.offer.type);
    }

    var capacityNode = cardNode.querySelector('.popup__text--capacity');
    if (ad.offer.rooms.length === 0 && ad.offer.guests.length === 0) {
      capacityNode.remove();
    } else {
      capacityNode.textContent = getOfferCapacity(ad.offer.rooms, ad.offer.guests);
    }

    var timeNode = cardNode.querySelector('.popup__text--time');
    if (ad.offer.checkin.length === 0 && ad.offer.checkout.length === 0) {
      timeNode.remove();
    } else {
      timeNode.textContent = getOfferTime(ad.offer.checkin, ad.offer.checkout);
    }

    var featuresNode = cardNode.querySelector('.popup__features');
    if (window.util.isArrayEmpty(ad.offer.features)) {
      featuresNode.remove();
    } else {
      window.util.clearNodeChilds(featuresNode);
      featuresNode.appendChild(getOfferFeatures(ad.offer.features));
    }

    var descriptionNode = cardNode.querySelector('.popup__description');
    if (ad.offer.description.length === 0) {
      descriptionNode.remove();
    } else {
      descriptionNode.textContent = ad.offer.description;
    }

    var photosNode = cardNode.querySelector('.popup__photos');
    if (window.util.isArrayEmpty(ad.offer.photos)) {
      photosNode.remove();
    } else {
      window.util.clearNodeChilds(photosNode);
      photosNode.appendChild(getOfferPhotos(ad.offer.photos));
    }

    var avatarNode = cardNode.querySelector('.popup__avatar');
    if (ad.author.avatar.length === 0) {
      avatarNode.remove();
    } else {
      avatarNode.src = ad.author.avatar;
    }

    return cardNode;
  }

  // Отрисовать карточки с информацией
  function renderCard(offer) {
    var cardNode = createCard(offer);
    var mapCardNode = document.querySelector('.map__card');
    if (mapCardNode) {
      mapCardNode.remove();
    }
    document.querySelector('.map').insertAdjacentElement('beforeend', cardNode);
    cardNode.addEventListener('click', onCardClick);
    document.addEventListener('keydown', onCardKeyDown);
  }

  // Функция закрития карточки объявления
  function close() {
    var cardNode = document.querySelector('.map__card');
    if (cardNode) {
      cardNode.remove();
      window.pin.disable();
      cardNode.removeEventListener('click', onCardClick);
      document.removeEventListener('keydown', onCardKeyDown);
    }
  }

  // Обработчик клика для карточки объявления
  function onCardClick(evt) {
    var cardCloseButton = document.querySelector('.popup__close');
    if (evt.target === cardCloseButton) {
      close();
    }
  }

  // Обработчик кажатия кнопки Esc для карточки объявления
  function onCardKeyDown(evt) {
    if (window.util.isEscKey(evt)) {
      close();
    }
  }

  // Получить строку цены
  function getOfferPrice(price) {
    return price + ' ₽/ночь';
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
    var roomsText = (rooms === 1) ? 'комната' : 'комнаты';
    return rooms + ' ' + roomsText + ' для ' + guests + ' ' + guestsText;
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

  // Заносим функции в глобальную область видимости
  window.card = {
    render: renderCard,
    close: close
  };
})();
