'use strict';

(function () {

  var STATUS_OK = 200;
  var TIMEOUT = 5000;

  var showError = function (message) {
    var map = document.querySelector('.map');
    var messageError = document.createElement('div');
    messageError.style.position = 'fixed';
    messageError.style.top = '12%';
    messageError.style.left = 'calc(50% - 150px)';
    messageError.style.width = '300px';
    messageError.style.padding = '30px 50px';
    messageError.style.textAlign = 'center';
    messageError.style.background = '#ffffff';
    messageError.style.borderRadius = '50px';
    messageError.style.border = '2px solid #45ff32';
    messageError.textContent = 'Что то пошло не так ERROR ' + message;
    map.appendChild(messageError);
  };


  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError(xhr.status);
    });
    xhr.addEventListener('timeout', function () {
      onError(xhr.status);
    });

    xhr.timeout = TIMEOUT;
    xhr.open('GET', URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError(xhr.status);
    });
    xhr.addEventListener('timeout', function () {
      onError(xhr.status);
    });

    xhr.timeout = TIMEOUT;
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
    error: showError
  };
})();
