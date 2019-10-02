'use strict';

(function () {

  var mapFiltersElements = document.querySelector('.map__filters').querySelectorAll('select, fieldset');

  var enablePage = function () {
    window.util.mapElement.classList.remove('map--faded');
    window.form.formElement.classList.remove('ad-form--disabled');
    window.form.deactivate(false);
    window.util.setDisabled(mapFiltersElements, false);
  };

  window.page = {
    activate: enablePage
  };

})();
