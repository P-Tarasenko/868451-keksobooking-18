'use strict';

(function () {

  var formElement = document.querySelector('.ad-form');
  var addressElement = document.querySelector('#address');
  var adFormFieldsElements = formElement.querySelectorAll('fieldset');
  var peopleValueElement = formElement.querySelector('#capacity');
  var roomValueElement = formElement.querySelector('#room_number');
  var timeInElement = formElement.querySelector('#timein');
  var timeOutElement = formElement.querySelector('#timeout');
  var typeElement = formElement.querySelector('#type');
  var priceElement = formElement.querySelector('#price');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var guestsInRooms = {
    0: '<option value="1">для 1 гостя</option>',
    1: '<option value="1">для 1 гостя</option><option value="2">для 2 гостей</option>',
    2: '<option value="1">для 1 гостя</option><option value="2">для 2 гостей</option><option value="3">для 3 гостей</option>',
    3: '<option value="0">Не для гостей</option>'
  };

  var minPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var setMainPinCoordinate = function (coordinate) {
    addressElement.value = coordinate[0] + ', ' + coordinate[1];
  };

  var deactivateElements = function (value) {
    window.util.setDisabled(adFormFieldsElements, value);
  };

  var activateForm = function () {
    formElement.classList.remove('ad-form--disabled');
  };

  var disabledForm = function () {
    formElement.classList.add('ad-form--disabled');
  };

  var showSuccessMessage = function () {
    document.body.appendChild(successMessageTemplate);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentPressEsc);
  };

  var deactivateForm = function () {
    formElement.reset();
    deactivateElements(true);
    disabledForm();
    showSuccessMessage();
  };

  var onDocumentClick = function () {
    var successMessage = document.querySelector('.success');
    document.body.removeChild(successMessage);
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentPressEsc);
  };

  var onDocumentPressEsc = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      var successMessage = document.querySelector('.success');
      document.body.removeChild(successMessage);
      document.removeEventListener('keydown', onDocumentPressEsc);
      document.removeEventListener('click', onDocumentClick);
    }
  };

  var onSelectChange = function () {
    peopleValueElement.innerHTML = guestsInRooms[roomValueElement.options.selectedIndex];
  };

  typeElement.addEventListener('change', function (evt) {
    priceElement.setAttribute('min', minPrice[evt.target.value]);
    priceElement.setAttribute('placeholder', minPrice[evt.target.value]);
  });

  timeInElement.addEventListener('change', function (evt) {
    timeOutElement.value = evt.target.value;
  });

  timeOutElement.addEventListener('change', function (evt) {
    timeInElement.value = evt.target.value;
  });

  roomValueElement.addEventListener('change', onSelectChange);

  formElement.addEventListener('submit', function (evt) {
    window.backend.submit(new FormData(formElement), window.page.deactivate, function (error) {
      console.log(error);
    });
    evt.preventDefault();
  });

  peopleValueElement.innerHTML = guestsInRooms[0];
  priceElement.setAttribute('min', minPrice[typeElement.value]);

  window.form = {
    setAddress: setMainPinCoordinate,
    formElement: formElement,
    deactivateElements: deactivateElements,
    activate: activateForm,
    deactivate: deactivateForm
  };

})();
