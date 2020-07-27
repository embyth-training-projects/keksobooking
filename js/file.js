'use strict';

(function () {
  // Типы поддерживаемых файлов
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Функция загрузки файлов
  function upload(fileChooser, img) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        img.src = reader.result;
      });

      reader.readAsDataURL(file);
    } else {
      window.util.showError('Ошибка при чтении файла: ' + fileName);

      setTimeout(function () {
        document.querySelector('.error-alert').remove();
      }, 5000);
    }
  }

  // Передаём функцию в лобальную область видимости
  window.file = {
    upload: upload
  };
})();
