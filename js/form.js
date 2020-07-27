'use strict';

(function () {
  // Элементы формы
  var formNode = document.querySelector('.ad-form');
  var fieldsetNodes = formNode.querySelectorAll('fieldset');
  var formAddressInput = formNode.querySelector('#address');
  var formResetButton = formNode.querySelector('.ad-form__reset');
  var avatarInputNode = formNode.querySelector('.ad-form-header__input');
  var avatarPreviewNode = formNode.querySelector('.ad-form-header__preview');
  var photoInputNode = formNode.querySelector('.ad-form__input');
  var photoPreviewNode = formNode.querySelector('.ad-form__photo');

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

    avatarInputNode.addEventListener('change', onAvatarInputChange);
    photoInputNode.addEventListener('change', onPhotoInputChange);
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

    avatarInputNode.removeEventListener('change', onAvatarInputChange);
    photoInputNode.removeEventListener('change', onPhotoInputChange);
    formNode.removeEventListener('click', onResetButtonClick);
    formNode.removeEventListener('keydown', onResetButtonKeyDown);
    formNode.removeEventListener('submit', onFormSubmit);

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

  // Обработчик изменения аватарки
  function onAvatarInputChange() {
    var avatarImageNode = avatarPreviewNode.querySelector('img');
    avatarImageNode.style.width = '70px';
    avatarImageNode.style.height = '70px';
    avatarPreviewNode.style.padding = 0;

    window.file.upload(avatarInputNode, avatarImageNode);
  }

  // Обработчик изменения фото
  function onPhotoInputChange() {
    var photoImageNode = document.createElement('img');
    photoImageNode.style.width = '70px';
    photoImageNode.style.height = '70px';
    photoPreviewNode.appendChild(photoImageNode);

    window.file.upload(photoInputNode, photoImageNode);
  }

  // Заносим функции в глобальную область видимости
  window.form = {
    updateAddress: updateAddress,
    activate: activate,
    disable: disable
  };
})();
