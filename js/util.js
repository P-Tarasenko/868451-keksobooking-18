'use strict';

(function () {

  var setDisabled = function (arr, value) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = value;
    }
  };

  var loadError = function (message) {
    var errorTemplate = document.querySelector('#error').content.cloneNode(true);
    var messageElement = errorTemplate.querySelector('.error__message');
    messageElement.textContent = message;
    document.querySelector('main').appendChild(errorTemplate);
  };

  window.util = {
    setDisabled: setDisabled,
    loadError: loadError
  };

})();
