'use strict';

(function () {
  // Элементы для работы с сообщениями
  var main = document.querySelector('main');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorNode = errorTemplate.cloneNode(true);
  var errorCloseButton = errorNode.querySelector('.error__button');

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successNode = successTemplate.cloneNode(true);

  // Показываем сообщение
  function show(status) {
    switch (status) {
      case 'success':
        document.body.appendChild(successNode);
        window.util.blockBodyScroll();
        document.addEventListener('click', onMessageClick);
        document.addEventListener('keydown', onMessageKeyDown);
        break;
      case 'error':
        main.appendChild(errorNode);
        window.util.blockBodyScroll();
        errorCloseButton.addEventListener('click', onMessageClick);
        document.addEventListener('keydown', onMessageKeyDown);
        break;
    }
  }

  // Закрываем сообщение
  function close() {
    if (successNode) {
      successNode.remove();
      document.removeEventListener('click', onMessageClick);
    }

    if (errorNode) {
      errorCloseButton.removeEventListener('click', onMessageClick);
      errorNode.remove();
    }

    document.removeEventListener('keydown', onMessageKeyDown);
  }

  // Обработчики закрытия сообщения
  function onMessageClick(evt) {
    if (evt.button === 0) {
      close();
      window.util.unblockBodyScroll();
    }
  }

  function onMessageKeyDown(evt) {
    if (window.util.isEscKey(evt)) {
      close();
      window.util.unblockBodyScroll();
    }
  }

  // Передаем функции в глобальную область видимости
  window.message = {
    show: show,
    close: close
  };
})();
