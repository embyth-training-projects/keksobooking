'use strict';

(function () {
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
    var avatarUrls = window.util.shuffleArray(getAvatarUrl(adAmount));

    for (var i = 0; i < adAmount; i++) {
      var locationX = window.util.getRandomNumber(OffersData.LOCATION.X.MIN, OffersData.LOCATION.X.MAX);
      var locationY = window.util.getRandomNumber(OffersData.LOCATION.Y.MIN, OffersData.LOCATION.Y.MAX);

      ads.push({
        author: {
          avatar: avatarUrls[i]
        },
        offer: {
          title: window.util.shuffleArray(OffersData.TITLES)[i],
          address: locationX + ', ' + locationY,
          price: window.util.getRandomNumber(OffersData.PRICE.MIN, OffersData.PRICE.MAX),
          type: window.util.getRandomValue(OffersData.APARTMENT_TYPE),
          rooms: window.util.getRandomNumber(OffersData.ROOMS.MIN, OffersData.ROOMS.MAX),
          guests: window.util.getRandomNumber(OffersData.GUESTS.MIN, OffersData.GUESTS.MAX),
          checkin: window.util.getRandomValue(OffersData.CHECKINS),
          checkout: window.util.getRandomValue(OffersData.CHECKOUTS),
          features: window.util.sliceRandomArray(window.util.shuffleArray(OffersData.FEATURES)),
          description: '',
          photos: window.util.shuffleArray(OffersData.PHOTOS),
          location: {
            x: locationX,
            y: locationY
          }
        }
      });
    }
    return ads;
  }

  window.data = {
    createAds: createAdsArray
  };
})();
