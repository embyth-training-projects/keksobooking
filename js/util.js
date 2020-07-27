'use strict';

(function () {
  // Глобальные константы
  window.CONSTANTS = {
    KEY_CODES: {
      ENTER: 13,
      ESC: 27
    },
    ADS: {
      TOTAL: 8
    },
    PIN: {
      SIZE: {
        WIDTH: 64,
        HEIGHT: 64,
        TAIL: 22
      },
      DEFAULT_POSITION: {
        X: 570,
        Y: 375
      }
    }
  };

  // Глобальные методы
  window.util = {
    // Проверка на нажатие кнопки Enter
    isEnterKey: function (evt) {
      return evt.keyCode === window.CONSTANTS.KEY_CODES.ENTER;
    },
    // Проверка на нажатие кнопки ESC
    isEscKey: function (evt) {
      return evt.keyCode === window.CONSTANTS.KEY_CODES.ESC;
    },
    // Получить случайное число
    getRandomIndex: function (number) {
      return Math.floor(Math.random() * number);
    },
    // Получить случайное число в диапозоне
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    // Получить случайное значение
    getRandomValue: function (array) {
      return array[window.util.getRandomIndex(array.length)];
    },
    // Перемешать массив
    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
    // Обрезать массив с рандомного места
    sliceRandomArray: function (array) {
      var sliced = array.slice();
      return sliced.slice(Math.floor(Math.random() * array.length));
    },
    // Очищаем дочерние элементы
    clearNodeChilds: function (node) {
      while (node.firstChild) {
        node.firstChild.remove();
      }
    },
    // Проверяем есть ли массив и содержит ли он что-то
    isArrayEmpty: function (array) {
      return !(Array.isArray(array) && array.length);
    },
    // Блокируем прокрутку страницы
    blockBodyScroll: function () {
      document.body.style.overflowY = 'hidden';
    },
    // Разблокируем прокрутку страницы
    unblockBodyScroll: function () {
      document.body.style.overflowY = 'auto';
    },
    // Показ ошибки
    showError: function (errorMessage) {
      var node = document.createElement('div');

      node.style.zIndex = 100;
      node.style.width = '100%';
      node.style.margin = '0 auto';
      node.style.padding = '5px 0';
      node.style.textAlign = 'center';
      node.style.position = 'fixed';
      node.style.left = 0;
      node.style.top = 0;
      node.style.backgroundColor = 'red';
      node.style.color = 'white';
      node.style.fontSize = '30px';

      node.classList.add('error-alert');

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
