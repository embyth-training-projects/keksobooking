'use strict';

(function () {
  // Элементы формы
  var formNode = document.querySelector('.ad-form');
  var fieldsetNodes = formNode.querySelectorAll('fieldset');
  var formAddressInput = formNode.querySelector('#address');
  var formResetButton = formNode.querySelector('.ad-form__reset');

  var mainPinNode = document.querySelector('.map__pin--main');

  // Обновляем адрес
  function updateAddress() {
    if (window.isPageActivated) {
      var x = mainPinNode.offsetLeft + window.CONSTANTS.PIN.SIZE.WIDTH / 2;
      var y = mainPinNode.offsetTop + window.CONSTANTS.PIN.SIZE.HEIGHT + window.CONSTANTS.PIN.SIZE.TAIL;
    } else {
      x = mainPinNode.offsetLeft + window.CONSTANTS.PIN.SIZE.WIDTH / 2;
      y = mainPinNode.offsetTop + window.CONSTANTS.PIN.SIZE.HEIGHT / 2;
    }
    formAddressInput.value = x + ', ' + y;
  }

  // Активируем форму
  function activate() {
    formNode.classList.remove('ad-form--disabled');

    fieldsetNodes.forEach(function (fieldset) {
      fieldset.disabled = false;
    });

    formNode.addEventListener('click', onResetButtonClick);
    formNode.addEventListener('keydown', onResetButtonKeyDown);
    formNode.addEventListener('submit', onFormSubmit);

    window.validation.activate();
  }

  // Откдючаем форму
  function disable() {
    formNode.classList.add('ad-form--disabled');

    fieldsetNodes.forEach(function (fieldset) {
      fieldset.disabled = true;
    });

    formNode.removeEventListener('click', onResetButtonClick);
    formNode.removeEventListener('keydown', onResetButtonKeyDown);

    window.validation.disable();
    formAddressInput.readOnly = true;
  }

  // При успешной отправке формы
  function onSuccess() {
    disable();
    formNode.reset();
    window.map.disable();
    updateAddress();
    window.message.show('success');
    window.isPageActivated = false;
  }

  // При ошибке отправке формы
  function onError() {
    window.message.show('error');
  }

  // Обработчик кнопки Enter на ресете формы
  function onResetButtonClick(evt) {
    if (evt.target === formResetButton) {
      evt.preventDefault();
      window.card.close();
      formNode.reset();
      disable();
      updateAddress();
      window.map.disable();
      window.isPageActivated = false;
    }
  }

  // Обработчик кнопки Enter на ресете формы
  function onResetButtonKeyDown(evt) {
    if (window.util.isEnterKey(evt) && evt.target === formResetButton) {
      onResetButtonClick();
    }
  }

  // Обработчик отправки формы
  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formNode), onSuccess, onError);
  }

  // Заносим функции в глобальную область видимости
  window.form = {
    updateAddress: updateAddress,
    activate: activate,
    disable: disable
  };
})();
