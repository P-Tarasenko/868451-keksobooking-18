'use strict';

(function () {
  var mainElement = document.querySelector('main');

  var showSuccessMessage = function () {
    var successMessageTemplate = document.querySelector('#success').content.cloneNode(true);
    mainElement.appendChild(successMessageTemplate);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentPressEsc);
  };

  var showErrorMessage = function (message) {
    var errorTemplate = document.querySelector('#error').content.cloneNode(true);
    var messageElement = errorTemplate.querySelector('.error__message');
    var closeButton = errorTemplate.querySelector('.error__button');

    messageElement.textContent = message;
    mainElement.appendChild(errorTemplate);

    closeButton.addEventListener('click', onDocumentClick);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentPressEsc);
  };

  var onDocumentClick = function () {
    var successMessage = document.querySelector('.success');
    var errorMessage = document.querySelector('.error');
    if (successMessage) {
      mainElement.removeChild(successMessage);
    } else {
      mainElement.removeChild(errorMessage);
    }
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentPressEsc);
  };

  var onDocumentPressEsc = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      var successMessage = document.querySelector('.success');
      var errorMessage = document.querySelector('.error');
      if (successMessage) {
        mainElement.removeChild(successMessage);
      } else {
        mainElement.removeChild(errorMessage);
      }
      document.removeEventListener('keydown', onDocumentPressEsc);
      document.removeEventListener('click', onDocumentClick);
    }
  };

  window.notification = {
    showErrorMessage: showErrorMessage,
    showSuccessMessage: showSuccessMessage
  };

})();
