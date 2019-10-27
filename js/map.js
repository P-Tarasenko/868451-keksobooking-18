'use strict';

(function () {

  var HALF_WIDTH_PIN = 25;
  var HALF_HEIGHT_PIN = 35;
  var HALF_MAIN_PIN = Math.round(62 / 2);
  var HEIGHT_MAIN_PIN = 84;
  var MAX_VISIBLE_PINS = 5;
  var MIN_Y_VALUE = 130;
  var MAX_Y_VALUE = 630;
  var MAIN_PIN_START_COORDS = {
    x: 570,
    y: 375
  };
  var cardData = [];
  var pins = [];
  var filtersFormElement = document.querySelector('.map__filters');
  var housingTypeElement = filtersFormElement.querySelector('#housing-type');
  var priceTypeElement = filtersFormElement.querySelector('#housing-price');
  var roomsTypeElement = filtersFormElement.querySelector('#housing-rooms');
  var guestsTypeElement = filtersFormElement.querySelector('#housing-guests');
  var mapElement = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPinElement = document.querySelector('.map__pin--main');
  var mapFiltersElements = document.querySelector('.map__filters').querySelectorAll('select, fieldset');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var listOfPinsElement = mapElement.querySelector('.map__pins');
  var photoTemplate = cardTemplate.querySelector('.popup__photos').querySelector('.popup__photo').cloneNode(true);
  var typesRu = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var activateMap = function () {
    window.backend.load(loadSuccess, window.notification.showErrorMessage);
    mapElement.classList.remove('map--faded');
  };

  var activateForm = function () {
    window.util.setDisabled(mapFiltersElements, false);
  };

  var getMainPinCoordinateDisabledPage = function () {
    return [mainPinElement.offsetLeft + HALF_MAIN_PIN, mainPinElement.offsetTop + HALF_MAIN_PIN];
  };

  var getMainPinCoordinateActivePage = function () {
    return [mainPinElement.offsetLeft + HALF_MAIN_PIN, mainPinElement.offsetTop + HEIGHT_MAIN_PIN];
  };

  var restoreMainPinCoords = function () {
    mainPinElement.style.top = MAIN_PIN_START_COORDS.y + 'px';
    mainPinElement.style.left = MAIN_PIN_START_COORDS.x + 'px';
  };

  var createMaxPinsArray = function (arr) {
    return arr.slice(0, MAX_VISIBLE_PINS);
  };

  var clearListOfPins = function () {
    pins = listOfPinsElement.querySelectorAll('button[type=button]');
    for (var i = 0; i < pins.length; i++) {
      var node = pins[i];
      listOfPinsElement.removeChild(node);
    }
  };

  var deleteCard = function () {
    if (mapElement.querySelector('.map__card')) {
      mapElement.removeChild(mapElement.querySelector('.map__card'));
    }
  };

  var loadSuccess = function (data) {
    cardData = data;
    addPins(createMaxPinsArray(cardData));
  };

  var openCard = function (data) {
    deleteCard();
    mapElement.insertBefore(makeCard(data), mapElement.querySelector('.map__filters-container'));
    var closeButton = mapElement.querySelector('.popup__close');
    document.addEventListener('keydown', onCardEscPress);
    closeButton.addEventListener('click', function () {
      closeCard();
    });
  };

  var closeCard = function () {
    mapElement.removeChild(mapElement.querySelector('.map__card'));
    document.removeEventListener('keydown', onCardEscPress);
  };

  var createPin = function (obj) {
    var similarPin = pinTemplate.cloneNode(true);
    var img = similarPin.querySelector('img');
    similarPin.style.left = (obj.location.x - HALF_WIDTH_PIN) + 'px';
    similarPin.style.top = (obj.location.y - HALF_HEIGHT_PIN) + 'px';
    img.setAttribute('src', obj.author.avatar);
    img.setAttribute('alt', obj.offer.title);

    similarPin.addEventListener('click', function () {
      openCard(obj);
    });
    return similarPin;
  };

  var addPins = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(createPin(arr[i]));
    }
    clearListOfPins();
    listOfPinsElement.appendChild(fragment);
  };

  var makeCard = function (obj) {
    var cardElement = cardTemplate.cloneNode(true);
    var photosElement = cardElement.querySelector('.popup__photos');
    var string = '';

    cardElement.querySelector('.popup__title').textContent = obj.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = obj.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typesRu[obj.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ' , выезд до ' + obj.offer.checkout;

    for (i = 0; i < obj.offer.features.length; i++) {
      string += '<li class="popup__feature popup__feature--' + obj.offer.features[i] + '"></li>';
    }

    cardElement.querySelector('.popup__features').innerHTML = string;
    cardElement.querySelector('.popup__description').textContent = obj.offer.description;
    photosElement.innerHTML = '';

    for (var i = 0; i < obj.offer.photos.length; i++) {
      var photo = photoTemplate.cloneNode(true);

      photo.src = obj.offer.photos[i];
      photosElement.appendChild(photo);
    }
    if (obj.offer.photos.length === 0) {
      photosElement.classList.add('hidden');
    }

    cardElement.querySelector('.popup__avatar').setAttribute('src', obj.author.avatar);

    return cardElement;
  };

  var deactivateMap = function () {
    filtersFormElement.reset();
    restoreMainPinCoords();
    clearListOfPins();
    deleteCard();
    mapElement.classList.add('map--faded');
    window.util.setDisabled(mapFiltersElements, true);
    window.form.setAddress(getMainPinCoordinateDisabledPage());

    mainPinElement.addEventListener('mousedown', onMainPinClick);
    mainPinElement.addEventListener('mousedown', onMainPinMove);
    mainPinElement.addEventListener('keydown', onMainPinPress);
  };

  var runPage = function () {
    window.form.setAddress(getMainPinCoordinateActivePage());
    window.page.activate();
    mainPinElement.removeEventListener('mousedown', onMainPinClick);
    mainPinElement.removeEventListener('keydown', onMainPinPress);
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeCard();
    }
  };

  var onMainPinMove = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var x = mainPinElement.offsetLeft - shift.x;
      var y = mainPinElement.offsetTop - shift.y;

      x = Math.max(0, x);
      x = Math.min(mapElement.offsetWidth - mainPinElement.offsetWidth, x);
      y = Math.max(MIN_Y_VALUE, y);
      y = Math.min(MAX_Y_VALUE - HEIGHT_MAIN_PIN, y);

      mainPinElement.style.top = y + 'px';
      mainPinElement.style.left = x + 'px';
      window.form.setAddress(getMainPinCoordinateActivePage());
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onMainPinClick = function () {
    runPage();
  };

  var onMainPinPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      runPage();
    }
  };

  // ___________________

  var filterByType = function (item) {
    return housingTypeElement.value === 'any' ? true : item.offer.type === housingTypeElement.value;
  };

  var filterByPrice = function (item) {
    if (priceTypeElement.value === 'any') {
      return true;
    } else if (priceTypeElement.value === 'middle') {
      return item.offer.price > 10000 && item.offer.price < 50000;
    } else if (priceTypeElement.value === 'low') {
      return item.offer.price <= 10000;
    } else if (priceTypeElement.value === 'high') {
      return item.offer.price >= 50000;
    }
  };

  var filterByRooms = function (item) {
    return roomsTypeElement.value === 'any' ? true : item.offer.rooms.toString() === roomsTypeElement.value;
  };

  var filterByGuests = function (item) {
    return guestsTypeElement.value === 'any' ? true : item.offer.guests.toString() === guestsTypeElement.value;
  };
  // ---------------
  var featuresElement = filtersFormElement.querySelector('#housing-features');
    var featuresList = Array.from(featuresElement.querySelectorAll('input[type=checkbox]'));
    // ---------------------
  var filterByFeatures = function (item) {
    var checkedFeatures = featuresList.filter(function (item) {
      return item.checked;
    })
      .map(function (item) {
        return item.value
      });

    if (checkedFeatures.length > 0) {
      for (var i = 0; i < checkedFeatures.length; i++) {
        var flag = false;
        for (var j = 0; j < item.offer.features.length; j++) {
          // debugger;
          if (item.offer.features[j] === checkedFeatures[i]) {
            return flag = true;
          }
        };

        if (flag = false) {
          break;
        }
        return flag;
      }

      console.log(flag);
      console.log(checkedFeatures);
      console.log(cardData);
    } else {
      return true;
    }
  };

  var filterData = function (data) {
    return data.filter(filterByType)
    .filter(filterByPrice)
    .filter(filterByRooms)
    .filter(filterByGuests)
    .filter(filterByFeatures);
  };

  filtersFormElement.addEventListener('change', function () {
    addPins(createMaxPinsArray(filterData(cardData)));
  });

  // housingTypeElement.addEventListener('change', function () {
  //   var typeOfHousing = cardData.filter(function (element) {
  //     return housingTypeElement.value === 'any' ? true : element.offer.type === housingTypeElement.value;
  //   });
  //   addPins(createMaxPinsArray(typeOfHousing));
  // });

  // ____________________

  mainPinElement.addEventListener('mousedown', onMainPinClick);
  mainPinElement.addEventListener('mousedown', onMainPinMove);
  mainPinElement.addEventListener('keydown', onMainPinPress);

  window.form.deactivateElements(true);
  window.util.setDisabled(mapFiltersElements, true);
  window.form.setAddress(getMainPinCoordinateDisabledPage());

  window.map = {
    activate: activateMap,
    activateForm: activateForm,
    deactivate: deactivateMap
  };

})();
