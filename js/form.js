'use strict';

(function () {

  var addressElement = document.querySelector('#address');

  window.form = {
    setMainPinCoordinate: function (coordinate) {
      addressElement.value = coordinate[0] + ', ' + coordinate[1];
    }
  }

})();
