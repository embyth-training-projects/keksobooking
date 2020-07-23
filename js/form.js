'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var formReset = adForm.querySelector('.ad-form__reset');

  // Переключатель инпутов
  function toggleInputs(form, isDisabled) {
    form.querySelectorAll('input').forEach(function (input) {
      input.disabled = isDisabled;
    });

    form.querySelectorAll('select').forEach(function (select) {
      select.disabled = isDisabled;
    });

    form.querySelectorAll('textarea').forEach(function (textarea) {
      textarea.disabled = isDisabled;
    });

    form.querySelectorAll('button').forEach(function (button) {
      button.disabled = isDisabled;
    });
  }

  // Обработчик сброса формы
  function formResetClickHandler(evt) {
    evt.preventDefault();

    adForm.reset();
    window.disableMap();
  }

  window.addFormOfferHandlers = function () {
    window.addFormValidationHandlers();
    toggleInputs(adForm, false);
    adForm.classList.remove('ad-form--disabled');

    formReset.addEventListener('click', formResetClickHandler);
  };

  window.removeFormOfferHandlers = function () {
    window.removeFormValidationHandlers();
    toggleInputs(adForm, true);
    adForm.classList.add('ad-form--disabled');

    formReset.removeEventListener('click', formResetClickHandler);
  };
})();
