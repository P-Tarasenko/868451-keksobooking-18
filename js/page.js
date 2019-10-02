'use strict';

(function () {

  var enablePage = function () {
    window.map.activate();
    window.form.activate();
    window.form.deactivateElements(false);
    window.map.activateForm();
  };

  window.page = {
    activate: enablePage
  };

})();
