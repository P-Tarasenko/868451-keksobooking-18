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
  var resetButtonElement = formElement.querySelector('.ad-form__reset');
  var loadPinAvatarElement = formElement.querySelector('#avatar');
  var displayPinAvatarElement = formElement.querySelector('.ad-form-header__preview').querySelector('img');
  var loadAdPhotoElement = formElement.querySelector('#images');
  var adPhotoContainerElement = formElement.querySelector('.ad-form__photo-container');
  var adPhotoElement = adPhotoContainerElement.querySelector('.ad-form__photo');
  var adTitle = formElement.querySelector('#title');
  var adPrice = formElement.querySelector('#price');
  var guestsInRooms = {
    0: '<option value="1">для 1 гостя</option>',
    1: '<option value="1">для 1 гостя</option><option value="2">для 2 гостей</option>',
    2: '<option value="1">для 1 гостя</option><option value="2">для 2 гостей</option><option value="3">для 3 гостей</option>',
    3: '<option value="0">Не для гостей</option>'
  };

  var minPrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var createImage = function () {
    var image = document.createElement('img');
    image.setAttribute('width', 70);
    image.setAttribute('height', 70);
    image.style.display = 'none';
    return image;
  };

  var createPhotoElement = function () {
    var photoNode = adPhotoElement.cloneNode();
    photoNode.append(createImage());
    return photoNode;
  };

  var resetAdPhotos = function () {
    var photos = adPhotoContainerElement.querySelectorAll('.ad-form__photo');
    for (var i = 1; i < photos.length; i++) {
      photos[i].parentNode.removeChild(photos[i]);
    }
    adPhotoElement.innerHTML = '';
    adPhotoElement.append(createImage());
  };

  var addInvalidDisplay = function (evt) {
    evt.target.style.border = '3px solid red';
  };

  var removeInvalidDisplay = function (elem) {
    elem.style.border = '';
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

  var deactivateForm = function () {
    formElement.reset();
    displayPinAvatarElement.src = 'img/muffin-grey.svg';
    resetAdPhotos();
    removeInvalidDisplay(adTitle);
    removeInvalidDisplay(adPrice);
    deactivateElements(true);
    disabledForm();
  };

  var successSubmitForm = function () {
    window.page.deactivate();
    window.notification.showSuccessMessage();
  };

  var onSelectChange = function () {
    peopleValueElement.innerHTML = guestsInRooms[roomValueElement.options.selectedIndex];
  };

  typeElement.addEventListener('change', function (evt) {
    priceElement.setAttribute('min', minPrices[evt.target.value]);
    priceElement.setAttribute('placeholder', minPrices[evt.target.value]);
  });

  timeInElement.addEventListener('change', function (evt) {
    timeOutElement.value = evt.target.value;
  });

  timeOutElement.addEventListener('change', function (evt) {
    timeInElement.value = evt.target.value;
  });

  roomValueElement.addEventListener('change', onSelectChange);

  formElement.addEventListener('submit', function (evt) {
    window.backend.submit(new FormData(formElement), successSubmitForm, window.notification.showErrorMessage);
    evt.preventDefault();
  });

  resetButtonElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.page.deactivate();
  });

  loadAdPhotoElement.addEventListener('change', function () {
    var file = loadAdPhotoElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.util.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        adPhotoContainerElement.lastElementChild.lastElementChild.style.display = '';
        adPhotoContainerElement.lastElementChild.lastElementChild.src = reader.result;
        adPhotoContainerElement.append(createPhotoElement());
      });

      reader.readAsDataURL(file);
    }
  });

  adTitle.addEventListener('invalid', function (evt) {
    addInvalidDisplay(evt);
  });

  adTitle.addEventListener('input', function () {
    if (adTitle.validity.valid) {
      removeInvalidDisplay(adTitle);
    }
  });

  adPrice.addEventListener('invalid', function (evt) {
    addInvalidDisplay(evt);
  });


  adPrice.addEventListener('input', function () {
    if (adPrice.validity.valid) {
      removeInvalidDisplay(adPrice);
    }
  });

  peopleValueElement.innerHTML = guestsInRooms[0];
  priceElement.setAttribute('min', minPrices[typeElement.value]);
  window.util.loadPicture(loadPinAvatarElement, displayPinAvatarElement);
  adPhotoElement.append(createImage());

  window.form = {
    setAddress: setMainPinCoordinate,
    formElement: formElement,
    deactivateElements: deactivateElements,
    activate: activateForm,
    deactivate: deactivateForm
  };

})();
