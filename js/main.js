'use strict';

(function () {
  // Элементы для работы с модулем
  var mainPinNode = document.querySelector('.map__pin--main');
  window.isPageActivated = false;

  // Активация страницы
  function activatePage() {
    window.map.activate();
    window.form.activate();
    window.pin.render(window.offers);
    window.isPageActivated = true;
    mainPinNode.removeEventListener('keydown', onMainPinKeyDown);
  }

  // Обработчик кнопки вниз на мыше для главного маркера
  function onMainPinMouseDown(downEvt) {
    downEvt.preventDefault();

    if (!window.isPageActivated) {
      activatePage();
    }

    window.dragndrop.activate(downEvt);
  }

  // Обработчик кнопки Enter для главного маркера
  function onMainPinKeyDown(evt) {
    if (window.util.isEnterKey(evt)) {
      if (!window.isPageActivated) {
        activatePage();
      }
      window.form.updateAddress();
    }
  }

  // При успешной загрузке данных с сервера
  function onLoad(data) {
    for (var i = 0; i < data.length; i++) {
      data[i].id = i;
    }
    window.offers = data;
    mainPinNode.addEventListener('mousedown', onMainPinMouseDown);
    mainPinNode.addEventListener('keydown', onMainPinKeyDown);
  }

  // Загружаем данные для объявлений с сервера
  window.backend.load(onLoad, window.util.showError);
  window.form.updateAddress();
  window.form.disable();
})();
