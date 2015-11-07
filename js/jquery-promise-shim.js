(function ($, _) {
  var ajax = $.ajax;

  $.ajax = function () {
    var ajaxArgs = arguments;

    return new Promise(function (resolve, reject) {

      ajax.apply($, ajaxArgs).done(function (response, status, xhr) {
        resolve(_.isObject(response) ? response : { response: response });
      }).fail(function (xhr, status, error) {
        reject({ error: status });
      });
    });
  }
})(window.$, window._);
