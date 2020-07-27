'use strict';

(function () {

  // Элементы для работы с фильтрами
  var filterNode = document.querySelector('.map__filters');
  var selectNodes = filterNode.querySelectorAll('.map__filter');
  var typeNode = filterNode.querySelector('#housing-type');
  var priceNode = filterNode.querySelector('#housing-price');
  var roomsNode = filterNode.querySelector('#housing-rooms');
  var guestsNode = filterNode.querySelector('#housing-guests');

  // Объект с значениями фильтров
  var filterValues = {
    type: typeNode.value,
    price: priceNode.value,
    rooms: roomsNode.value,
    guests: guestsNode.value,
    features: Array.from(filterNode.querySelectorAll('input:checked')).map(function (ad) {
      return ad.value;
    })
  };

  // Ценовой диапазон
  var priceRange = {
    'low': {
      from: 0,
      to: 10000
    },
    'middle': {
      from: 10000,
      to: 50000,
    },
    'high': {
      from: 50000,
      to: Infinity
    }
  };

  // Обработчик изменения фильтра
  function onFilterChange(evt) {
    var target = evt.target;

    if (target.id === typeNode.id) {
      filterValues.type = target.value;
    } else if (target.id === priceNode.id) {
      filterValues.price = target.value;
    } else if (target.id === roomsNode.id) {
      filterValues.rooms = target.value;
    } else if (target.id === guestsNode.id) {
      filterValues.guests = target.value;
    } else if (target.id === ('filter-' + target.value)) {
      filterValues.features = Array.from(filterNode.querySelectorAll('input:checked')).map(function (ad) {
        return ad.value;
      });
    }

    var filteredOffers = window.offers.filter(filterOffers);

    function filterOffers(ad) {
      return filterByType(ad) && filterByPrice(ad) && filterByRooms(ad) && filterByGuests(ad) && filterByFeatures(ad);
    }

    window.pin.update(filteredOffers);
  }

  // Фильтр по типу
  function filterByType(ad) {
    return (filterValues.type === 'any') ? true : (filterValues.type === ad.offer.type);
  }

  // Фильтр по цене
  function filterByPrice(ad) {
    return (filterValues.price === 'any') ? true : (ad.offer.price >= priceRange[filterValues.price].from && ad.offer.price < priceRange[filterValues.price].to);
  }

  // Фильтр по комнатам
  function filterByRooms(ad) {
    return (filterValues.rooms === 'any') ? true : (parseInt(filterValues.rooms, 10) === ad.offer.rooms);
  }

  // Фильтр по гостям
  function filterByGuests(ad) {
    return (filterValues.guests === 'any') ? true : (parseInt(filterValues.guests, 10) === ad.offer.guests);
  }

  // Фильтр по удобствам
  function filterByFeatures(ad) {
    return filterValues.features.every(function (feature) {
      return ad.offer.features.includes(feature);
    });
  }

  // Активация фильтров
  function activate() {
    filterNode.disable = false;

    function activateSelect(select) {
      select.disable = false;
    }

    selectNodes.forEach(activateSelect);
    filterNode.addEventListener('change', window.debounce(onFilterChange));
  }

  // Отключение фильтров
  function disable() {
    filterNode.reset();
    filterNode.disable = true;
    filterNode.removeEventListener('change', onFilterChange);
  }

  // Передаем функции в глобальную область видимости
  window.filter = {
    activate: activate,
    disable: disable
  };
})();
