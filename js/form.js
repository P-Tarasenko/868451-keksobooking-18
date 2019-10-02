'use strict';

(function () {

  var formElement = document.querySelector('.ad-form');
  var addressElement = document.querySelector('#address');
  var adFormFieldsElements = formElement.querySelectorAll('fieldset');
  var peopleValueElement = formElement.querySelector('#capacity');
  var roomValueElement = formElement.querySelector('#room_number');
  var guestsInRooms = {
    0: '<option value="1">для 1 гостя</option>',
    1: '<option value="1">для 1 гостя</option><option value="2">для 2 гостей</option>',
    2: '<option value="1">для 1 гостя</option><option value="2">для 2 гостей</option><option value="3">для 3 гостей</option>',
    3: '<option value="0">Не для гостей</option>'
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

  roomValueElement.addEventListener('change', onSelectChange);

  peopleValueElement.innerHTML = guestsInRooms[0];

  window.form = {
    setAddress: setMainPinCoordinate,
    formElement: formElement,
    deactivateElements: deactivateElements,
    activate: activateForm
  };

})();
