'use strict';

(function () {

  var setDisabled = function (arr, value) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = value;
    }
  };

  window.util = {
    setDisabled: setDisabled
  };

})();
