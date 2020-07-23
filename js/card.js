'use strict';

(function () {
  // Отрисовать карточки с информацией
  window.renderCards = function (data) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (item) {
      var cardElement = document.querySelector('#card').content.cloneNode(true);

      cardElement.querySelector('.popup__title').textContent = item.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
      cardElement.querySelector('.popup__text--price').innerHTML = getOfferPrice(item.offer.price);
      cardElement.querySelector('.popup__type').textContent = getOfferType(item.offer.type);
      cardElement.querySelector('.popup__text--capacity').textContent = getOfferCapacity(item.offer.rooms, item.offer.guests);
      cardElement.querySelector('.popup__text--time').textContent = getOfferTime(item.offer.checkin, item.offer.checkout);
      window.util.clearNodeChilds(cardElement.querySelector('.popup__features'));
      cardElement.querySelector('.popup__features').appendChild(getOfferFeatures(item.offer.features));
      cardElement.querySelector('.popup__description').textContent = item.offer.description;
      window.util.clearNodeChilds(cardElement.querySelector('.popup__photos'));
      cardElement.querySelector('.popup__photos').appendChild(getOfferPhotos(item.offer.photos));
      cardElement.querySelector('.popup__avatar').src = item.author.avatar;
      cardElement.querySelector('.map__card').classList.add('hidden');

      fragment.appendChild(cardElement);
    });

    return fragment;
  };

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
})();
