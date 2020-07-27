'use strict';

(function () {
  // Типы поддерживаемых файлов
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Функция загрузки файлов
  function upload(fileChooser, imgParentNode) {
    var files = fileChooser.files;

    for (var i = 0; i < files.length; i++) {
      setupReader(files[i]);
    }

    function setupReader(file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var imageNode = document.createElement('img');
          imageNode.style.width = '70px';
          imageNode.style.height = '70px';
          imageNode.src = reader.result;
          imgParentNode.appendChild(imageNode);
        });

        reader.readAsDataURL(file);
      } else {
        window.util.showError('Ошибка при чтении файла: ' + fileName);

        setTimeout(function () {
          document.querySelector('.error-alert').remove();
        }, 5000);
      }
    }
  }

  // Передаём функцию в лобальную область видимости
  window.file = {
    upload: upload
  };
})();
