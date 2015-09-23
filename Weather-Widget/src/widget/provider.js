/* global gadgets */
var RiseVision = RiseVision || {};
RiseVision.Weather = RiseVision.Weather || {};
RiseVision.Weather.Provider = {};

RiseVision.Weather.Provider = (function () {
  "use strict";

  /*
   *  Public Methods
   */
  function get(url, callbacks) {
    var params = {};

    params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.DOM;

    gadgets.io.makeRequest(url, function(resp) {
      if (resp && resp.data) {
        if (callbacks && callbacks.success && typeof(callbacks.success) === "function") {
          callbacks.success(resp.data);
        }
      }
      else if (resp && resp.errors) {
        if (callbacks && callbacks.error && typeof(callbacks.error) === "function") {
          callbacks.error(resp.errors);
        }
      }
    }, params);
  }

  return {
    "getWeather": get
  };
})();
