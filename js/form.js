'use strict';
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
var adForm = document.querySelector('.ad-form');
var adType = adForm.querySelector('#type');
var adPrice = adForm.querySelector('#price');
var adTimeIn = adForm.querySelector('#timein');
var adTimeOut = adForm.querySelector('#timeout');
var adFormTime = adForm.querySelector('.ad-form__element--time');
var adRoomNumber = adForm.querySelector('#room_number');
var adCapacity = adForm.querySelector('#capacity');

var synchronizationForm = function (formIn, formTo) {
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
    synchronizationForm(adTimeIn, adTimeOut);
  }
  if (evt.target.name === 'timeout') {
    synchronizationForm(adTimeOut, adTimeIn);
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
