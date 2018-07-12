'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var imageChooser = document.querySelector('#images');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  //  функция для вставки одного изображения
  var readerImage = function (chooser, preview) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.onload = function () {
        preview.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  //  вставляем аватарку
  avatarChooser.addEventListener('change', function () {
    readerImage(avatarChooser, avatarPreview);
  });

  //  вставляем изображения
  imageChooser.addEventListener('change', function () {
    if (imageChooser.files) {
      var imageAdvert = document.createElement('img');
      imageAdvert.width = '70';
      imageAdvert.height = '70';
      var lastFormPhoto = document.querySelector('.ad-form__photo:last-child');
      lastFormPhoto.appendChild(imageAdvert);

      var formPhoto = document.createElement('div');
      formPhoto.classList.add('ad-form__photo');
      photoContainer.appendChild(formPhoto);

      readerImage(imageChooser, imageAdvert);
    }
  });
})();
