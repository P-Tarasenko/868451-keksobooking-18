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

  var onSelectChange = function () {
    peopleValueElement.innerHTML = guestsInRooms[roomValueElement.options.selectedIndex];
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

  peopleValueElement.innerHTML = guestsInRooms[0];
  priceElement.setAttribute('min', minPrice[typeElement.value]);

  window.form = {
    setAddress: setMainPinCoordinate,
    formElement: formElement,
    deactivateElements: deactivateElements,
    activate: activateForm
  };

})();
