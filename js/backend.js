'use strict';

(function () {
  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var url = 'https://js.dump.academy/keksobooking/data';

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', onError);

    xhr.addEventListener('timeout', onError);

    xhr.timeout = 10000; // 10s

    xhr.open('GET', url);
    xhr.send();
  };

  var loadError = function () {
    var errorTemplate = document.querySelector('#error').content.cloneNode(true);
    document.querySelector('main').appendChild(errorTemplate);
  };

  window.backend = {
    load: load,
    loadError: loadError
  };

})();
