'use strict';

(function () {
  var PRICE_TYPE = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var ROOM_CAPACITY = {
    '1': [1],
    '2': [1, 2],
    '3': [1, 2, 3],
    '100': [0]
  };
  var KEY_CODE_ESC = 27;
  var adForm = document.querySelector('.ad-form');
  var adType = adForm.querySelector('#type');
  var adPrice = adForm.querySelector('#price');
  var adTimeIn = adForm.querySelector('#timein');
  var adTimeOut = adForm.querySelector('#timeout');
  var adFormTime = adForm.querySelector('.ad-form__element--time');
  var adRoomNumber = adForm.querySelector('#room_number');
  var adCapacity = adForm.querySelector('#capacity');
  var btnReset = adForm.querySelector('.ad-form__reset');


  //  функция очистки загруженных изображений
  var clearForm = function () {
    //  устанавливаем аватар по дефолту
    var imageAvatar = adForm.querySelector('.ad-form-header__preview img');
    imageAvatar.src = 'img/muffin-grey.svg';
  };

  var synchronizesForm = function (formIn, formTo) {
    var timeFrom = formIn.value;
    for (var i = 0; i < formTo.options.length; i++) {
      var timeTo = formTo.options[i].value;
      if (formTo.options[i].selected) {
        formTo.selectedIndex = -1;
      }
      if (timeFrom === timeTo) {
        formTo.selectedIndex = i;
      }
    }
  };

  adType.addEventListener('change', function () {
    var type = adType.value;
    adPrice.placeholder = PRICE_TYPE[type];
    adPrice.min = PRICE_TYPE[type];
  });


  adFormTime.addEventListener('change', function (evt) {
    if (evt.target.name === 'timein') {
      synchronizesForm(adTimeIn, adTimeOut);
    }
    if (evt.target.name === 'timeout') {
      synchronizesForm(adTimeOut, adTimeIn);
    }
  });

  adRoomNumber.addEventListener('change', function () {
    var roomNum = adRoomNumber.value;

    for (var i = 0; i < adCapacity.length; i++) {
      var capacity = adCapacity.options[i].value;
      adCapacity.options[i].setAttribute('disabled', true);
      ROOM_CAPACITY[roomNum].forEach(function (item) {
        if (+capacity === item) {
          adCapacity.options[i].removeAttribute('disabled');
          adCapacity.selectedIndex = i;
        }
      });
    }
  });

  var success = document.querySelector('.success');
  var formFilter = document.querySelector('.map__filters');
  var form = document.querySelector('.ad-form');
  //  перевод в неактивный режим

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      success.classList.remove('hidden');
      window.map.disablesPage();
      success.addEventListener('click', function () {
        success.classList.add('hidden');
      });
      document.addEventListener('keydown', function (keyEvt) {
        if (keyEvt.keyCode === KEY_CODE_ESC) {
          success.classList.add('hidden');
        }
      });
      form.reset();
      formFilter.reset();
      clearForm();
    },
    window.backend.error
    );
    evt.preventDefault();
  });

  btnReset.addEventListener('click', function () {
    clearForm();
  });
})();

