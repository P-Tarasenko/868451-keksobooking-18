'use strict';

(function () {

  var enablePage = function () {
    window.map.activate();
    window.form.activate();
    window.form.deactivateElements(false);
    window.map.activateForm();
  };

  var disablePage = function () {
    window.map.deactivate();
    window.form.deactivate();
  };

  window.page = {
    activate: enablePage,
    deactivate: disablePage
  };

})();
