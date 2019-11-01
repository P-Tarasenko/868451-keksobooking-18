'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var setDisabled = function (arr, value) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = value;
    }
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var loadPicture = function (loadElement, displayElement) {
    loadElement.addEventListener('change', function () {
      var file = loadElement.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          displayElement.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    FILE_TYPES: FILE_TYPES,
    setDisabled: setDisabled,
    debounce: debounce,
    loadPicture: loadPicture
  };

})();
