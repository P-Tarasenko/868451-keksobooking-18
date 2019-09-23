'use strict';

var COUNT = 8;
var HALF_WIDTH_PIN = 25;
var HALF_HEIGHT_PIN = 35;
var map = document.querySelector('.map');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var listOfPins = document.querySelector('.map__pins');
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var time = ['12:00', '13:00', '14:00'];

var getRandomNumber = function (max) {
  return Math.round(Math.random() * max);
};
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var createRandomArr = function (arr) {
  var list = [];
  for (var e = 0; e < getRandomNumber(arr.length - 1); e++) {
    list[e] = arr[e];
  }
  return list;
};
var createData = function () {
  var data = [];
  for (var i = 0; i < COUNT; i++) {
    data[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + getRandomNumber(8) + '.png'
      },
      'offer': {
        'title': 'Заголовок',
        'address': '' + getRandomNumber(600) + ', ' + getRandomNumber(500),
        'price': getRandomInRange(10000, 100000),
        'type': types[getRandomNumber(types.length - 1)],
        'rooms': getRandomNumber(4),
        'guests': getRandomNumber(10),
        'checkin': time[getRandomNumber(2)],
        'checkout': time[getRandomNumber(2)],
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
var data = createData();
var createPins = function (arr) {
  var similarPin = pin.cloneNode(true);
  similarPin.setAttribute('style', 'left: ' + (arr.location.x - HALF_WIDTH_PIN) + 'px; ' + 'top: ' + (arr.location.y - HALF_HEIGHT_PIN) + 'px;');
  similarPin.setAttribute('src', arr.author.avatar);
  similarPin.setAttribute('alt', arr.offer.title);
  return similarPin;
};
var addPins = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createPins(arr[i]));
  }
  listOfPins.appendChild(fragment);
};
addPins(data);
map.classList.remove('map--faded');
