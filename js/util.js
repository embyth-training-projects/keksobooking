'use strict';

(function () {
  // Глобальные константы
  window.CONSTANTS = {
    KEY_CODES: {
      ENTER: 13,
      ESC: 27
    }
  };

  // Глобальные методы
  window.util = {
    // Проверка на нажатие кнопки Enter
    isEnterKey: function (evt, action) {
      if (evt.keyCode === window.CONSTANTS.KEY_CODES.ENTER) {
        action();
      }
    },
    // Проверка на нажатие кнопки ESC
    isEscKey: function (evt, action) {
      if (evt.keyCode === window.CONSTANTS.KEY_CODES.ESC) {
        action();
      }
    },
    // Показать элемент
    showElement: function (element) {
      element.classList.remove('hidden');
    },
    // Скрыть элемент
    hideElement: function (element) {
      element.classList.add('hidden');
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
    }
  };
})();
