'use strict';

var COUNT = 8;
var HALF_WIDTH_PIN = 25;
var HALF_HEIGHT_PIN = 35;
var map = document.querySelector('.map');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var card = document.querySelector('#card').content.querySelector('.map__card');
var listOfPins = map.querySelector('.map__pins');
var photoTemplate = card.querySelector('.popup__photos').querySelector('.popup__photo').cloneNode(true);
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var typesRu = {
  palace: 'Дворец',
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};
var time = ['12:00', '13:00', '14:00'];

var getRandomNumber = function (max) {
  return Math.round(Math.random() * max);
};

var getRandomInRange = function (min, max) {
  return Math.round(Math.random() * (max - min + 1)) + min;
};

var createRandomArr = function (arr) {
  var list = [];
  for (var e = 0; e < getRandomInRange(1, arr.length - 1); e++) {
    list[e] = arr[e];
  }
  return list;
};

var getRandomItem = function (arr) {
  return arr[getRandomNumber(arr.length - 1)];
};

var createData = function (count) {
  var data = [];
  for (var i = 0; i < count; i++) {
    data[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Заголовок',
        'address': '' + getRandomNumber(600) + ', ' + getRandomNumber(500),
        'price': getRandomInRange(10000, 100000),
        'type': getRandomItem(types),
        'rooms': getRandomNumber(4),
        'guests': getRandomNumber(10),
        'checkin': getRandomItem(time),
        'checkout': getRandomItem(time),
        'features': createRandomArr(featuresArr),
        'description': 'Описание',
        'photos': createRandomArr(photosArr)
      },
      'location': {
        'x': getRandomNumber(map.offsetWidth),
        'y': getRandomInRange(130, 630)
      }
    };
  }
  return data;
};

var data = createData(COUNT);

var createPin = function (obj) {
  var similarPin = pin.cloneNode(true);
  var img = similarPin.querySelector('img');
  similarPin.style.left = (obj.location.x - HALF_WIDTH_PIN) + 'px';
  similarPin.style.top = (obj.location.y - HALF_HEIGHT_PIN) + 'px';
  img.setAttribute('src', obj.author.avatar);
  img.setAttribute('alt', obj.offer.title);
  return similarPin;
};

var addPins = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createPin(arr[i]));
  }
  listOfPins.appendChild(fragment);
};

addPins(data);
map.classList.remove('map--faded');

var makeCard = function (obj) {
  var cardElement = card.cloneNode(true);
  var photosElement = cardElement.querySelector('.popup__photos');
  var string = '';

  cardElement.querySelector('.popup__title').textContent = obj.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = obj.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typesRu[obj.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ' , выезд до ' + obj.offer.checkout;

  for (i = 0; i < data[0].offer.features.length; i++) {
    string += '<li class="popup__feature popup__feature--' + data[0].offer.features[i] + '"></li>';
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

map.insertBefore(makeCard(data[0]), map.querySelector('.map__filters-container'));
