'use strict';

(function () {

  var mapElement = document.querySelector('.map');
  var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
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
          'x': getRandomNumber(mapElement.offsetWidth),
          'y': getRandomInRange(130, 630)
        }
      };
    }
    return data;
  };

  window.data = {
    createData: createData
  };

})();
