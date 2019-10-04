'use strict';

(function () {

  var createData = function (arr) {
    var data = [];
    for (var i = 0; i < arr.length; i++) {
      data[i] = {
        'author': {
          'avatar': arr[i].author.avatar
        },
        'offer': {
          'title': arr[i].offer.title,
          'address': arr[i].offer.address,
          'price': arr[i].offer.price,
          'type': arr[i].offer.type,
          'rooms': arr[i].offer.rooms,
          'guests': arr[i].offer.guests,
          'checkin': arr[i].offer.checkin,
          'checkout': arr[i].offer.checkout,
          'features': arr[i].offer.features,
          'description': arr[i].offer.description,
          'photos': arr[i].offer.photos
        },
        'location': {
          'x': arr[i].location.x,
          'y': arr[i].location.y
        }
      };
    }
    return data;
  };

  window.data = {
    create: createData
  };

})();
