var RiseVision = RiseVision || {};
RiseVision.Weather = RiseVision.Weather || {};

RiseVision.Weather.DisplayAddress = function(gadgets) {
  "use strict";

  var callbacks = null;

  /*
   *  Private Methods
   */
  function setParams(names, values) {
    var weatherUrl = "",
      address = "";

    if (Array.isArray(names) && names.length > 0 && names[0] === "displayAddress") {
      if (Array.isArray(values) && values.length > 0) {
        address = JSON.parse(values[0]);

        // Only need to use and show city and province.
        weatherUrl = weatherUrl + "&name=" + encodeURIComponent(address.city + "," + address.province) + "&dummy=" + Math.ceil(Math.random() * 100);
      }

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

  /*
   *  Public Methods
   */

  /* Make a call to the Rise Vision API to get the address of the display. */
  function get(cb) {
    var id = new gadgets.Prefs().getString("id");

    callbacks = cb;

    if (id && id !== "") {
      gadgets.rpc.register("rsparam_set_" + id, setParams);
      gadgets.rpc.call("", "rsparam_get", null, id, ["displayAddress"]);
    }
  }

  return {
    "getWeather": get
  };
};
