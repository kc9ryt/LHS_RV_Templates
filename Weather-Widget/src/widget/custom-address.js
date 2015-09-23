var RiseVision = RiseVision || {};
RiseVision.Weather = RiseVision.Weather || {};

RiseVision.Weather.CustomAddress = function(config) {
  "use strict";

  /*
   *  Public Methods
   */
  function get(address, callbacks) {
    var weatherUrl = "";

    if (address !== "") {
      weatherUrl = config.urlByName + "&name=" + encodeURIComponent(address) +
        "&dummy=" + Math.ceil(Math.random() * 100);

      RiseVision.Weather.Provider.getWeather(weatherUrl, {
        "success": function(data) {
          if (callbacks && callbacks.success && typeof(callbacks.success) === "function") {
            callbacks.success(data);
          }
        },
        "error": function(errors) {
          if (callbacks && callbacks.error && typeof(callbacks.error) === "function") {
            callbacks.error(errors);
          }
        }
      });
    }
  }

  return {
    "getWeather": get
  };
};
