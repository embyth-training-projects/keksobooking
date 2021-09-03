'use strict';

(function () {
  // Адреса сервера
  var URL_SAVE = 'https://21.javascript.pages.academy/keksobooking';
  var URL_LOAD = URL_SAVE + '/data';

  // Создание запроса
  function addXHR(timeout, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.timeout = timeout || 10000;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          onError('Неверный запрос');
          break;
        case 401:
          onError('Пользователь не авторизован');
          break;
        case 404:
          onError('Ничего не найдено');
          break;
        default:
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  }

  // Запрос на получение данных с сервера
  function load(onLoad, onError) {
    var xhr = addXHR(10000, onLoad, onError);

    xhr.open('GET', URL_LOAD);
    xhr.send();
  }

  // Запрос на отправку данных на сервер
  function save(data, onLoad, onError) {
    var xhr = addXHR(1000, onLoad, onError);

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  }

  // Передаем функции в глобальную область видимости
  window.backend = {
    load: load,
    save: save,
  };
})();
