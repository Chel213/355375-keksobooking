'use strict';

(function () {
  var KEY_CODE_ESC = 27;

  window.keyboardEsc = function (evt, action) {
    if (evt.keyCode === KEY_CODE_ESC) {
      action();
    }
  };
})();
