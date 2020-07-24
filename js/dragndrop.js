'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  // Активация перетаскивания
  function activate(downEvt) {
    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    // Перетаскивание главного маркера
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var shiftedPinPosition = {
        left: mainPin.offsetLeft - shift.x,
        top: mainPin.offsetTop - shift.y
      };

      shiftedPinPosition.left = (shiftedPinPosition.left < window.map.Limit.LEFT) ? window.map.Limit.LEFT : shiftedPinPosition.left;
      shiftedPinPosition.left = (shiftedPinPosition.left > window.map.Limit.RIGHT) ? window.map.Limit.RIGHT : shiftedPinPosition.left;
      shiftedPinPosition.top = (shiftedPinPosition.top < window.map.Limit.TOP) ? window.map.Limit.TOP : shiftedPinPosition.top;
      shiftedPinPosition.top = (shiftedPinPosition.top > window.map.Limit.BOTTOM) ? window.map.Limit.BOTTOM : shiftedPinPosition.top;

      window.pin.setPosition(mainPin, shiftedPinPosition.left, shiftedPinPosition.top);
    }

    // Обработчик поднятия кнопки мыши на главном маркере
    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      window.form.updateAddress();
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  window.dragndrop = {
    activate: activate
  };
})();
