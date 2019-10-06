'use strict';

(function () {
  var showError = function (message) {
    var errorTemplate = document.querySelector('#error').content.cloneNode(true);
    var messageElement = errorTemplate.querySelector('.error__message');
    messageElement.textContent = message;
    document.querySelector('main').appendChild(errorTemplate);
  };

  window.notification = {
    showError: showError
  };

})();
