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

  // Отключаем страницу
  function disablePage() {
    window.offers = window.data.createAds(window.CONSTANTS.ADS.TOTAL);
    window.form.updateAddress();
    window.form.disable();
    mainPinNode.addEventListener('mousedown', onMainPinMouseDown);
    mainPinNode.addEventListener('keydown', onMainPinKeyDown);
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

  // Отключаем страницу при загрузке
  disablePage();
})();
