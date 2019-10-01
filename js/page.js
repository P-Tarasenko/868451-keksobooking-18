'use strict';

(function () {

  var mapFiltersElements = document.querySelector('.map__filters').querySelectorAll('select, fieldset');

  var setDisabled = function (arr, value) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = value;
    }
  };

  window.page = {
    enablePage: function () {
      window.util.mapElement.classList.remove('map--faded');
      window.form.formElement.classList.remove('ad-form--disabled');
      setDisabled(window.form.adFormFieldsElements, false);
      setDisabled(mapFiltersElements, false);
    },
    setDisabled: setDisabled
  };

})();
