var RiseVision = RiseVision || {};
RiseVision.Weather = RiseVision.Weather || {};

RiseVision.Weather.Geolocation = function(config) {
  "use strict";

  var errorInterval = 60000;

  /*
   *  Public Methods
   */

  /* Use geolocation to determine the location of the display. */
  function get(callbacks) {
    var weatherUrl = "";

    if (!!navigator.geolocation) {
      // This function will recover on its own if the Internet is disconnected.
      navigator.geolocation.getCurrentPosition(function(position) {
        weatherUrl = config.urlByLocation + "&lat=" + position.coords.latitude +
          "&lon=" + position.coords.longitude + "&dummy=" + Math.ceil(Math.random() * 100);

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
      }, function() {
        setTimeout(function() {
          get();
        }, errorInterval);

        console.log("Unable to obtain geolocation position.");
      });
    }
  }

  return {
    "getWeather": get
  };
};
