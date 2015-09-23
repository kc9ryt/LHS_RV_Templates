/* global gadgets, config, i18n */

var RiseVision = RiseVision || {};
RiseVision.Weather = RiseVision.Weather || {};

RiseVision.Weather = (function (gadgets, config, i18n) {
  "use strict";

  var params,
    isLoading = true,
    imagesLoaded = 0,
    prefs = new gadgets.Prefs(),
    utils = RiseVision.Common.Utilities,
    refreshInterval = 1800000,
    errorInterval = 60000;

  /*
   *  Private Methods
   */
  function getWeather() {
    var address = params.address,
      geolocation = null,
      display = null,
      custom = null;

    if (address === "geolocation") {
      geolocation = new RiseVision.Weather.Geolocation(config);

      geolocation.getWeather({
        "success": showWeather,
        "error": handleErrors
      });
    }
    else if (address === "display") {
      display = new RiseVision.Weather.DisplayAddress(gadgets);

      display.getWeather({
        "success": showWeather,
        "error": handleErrors
      });
    }
    else if (address === "custom") {
      custom = new RiseVision.Weather.CustomAddress(config);

      custom.getWeather(params.customAddress, {
        "success": showWeather,
        "error": handleErrors
      });
    }
  }

  function showWeather(data) {
    var icon_name = "",
      current = null,
      location = null,
      place = "",
      windDirection = "",
      mph = 0,
      kph = 0,
      hasAddress = false,
      hasHumidity = false,
      forecast = null,
      forecasts = [],
      dayOfWeek = "",
      today = new Date().getDay() + 1,
      tomorrow = (today + 1) > 7 ? 1 : today + 1,
      nextDay = (tomorrow + 1 > 7) ? 1 : tomorrow + 1;

    if (data) {
      // No weather data found for this location.
      if (data.getElementsByTagName("cw_error").length > 0) {
        retry();
      }
      else {
        $(".container").show();
        $(".error").hide();

        i18n.init({ fallbackLng: "en",
          resGetPath: "locales/__ns_____lng__.json"
        }, function() {
          $(".container").i18n();

          // Find the observation tag that has an icon_name other than 'cw_no_report_icon'
          // and use that one for current weather data.
          $.each(data.getElementsByTagName("observation"), function(index, value) {
            // Skip first observation data as it doesn't seem to be very reliable.
            if (index !== 0) {
              icon_name = value.getAttribute("icon_name");

              if ((icon_name !== null) && (icon_name !== "cw_no_report_icon")) {
                current = this;
                return false;
              }
            }
          });

          // No observation data found that has an icon.
          if (current === null) {
            // Use observation data from second listing as it seems to be more reliable.
            if (data.getElementsByTagName("observation").length > 1) {
              current = data.getElementsByTagName("observation")[1];
            }
            // Use the first observation if there is only one.
            else {
              current = data.getElementsByTagName("observation")[0];
            }
          }

          // Current weather
          if (current && (params.layout !== "three-day")) {
            if (current.getAttribute("icon_name")) {
              loadImage(current.getAttribute("icon_name"), $(".current-icon"));
              $(".current-icon").attr("title", current.getAttribute("description"));
            }
            else {
              $(".current-icon").hide();
            }

            // Temperature
            $(".current-temp").html((params.unit === "celsius") ?
              convertTemp(current.getAttribute("temperature")) + "&#176;C" :
              convertTemp(current.getAttribute("temperature")) + "&#176;F");
          }

          // Description
          if (params.description === "custom") {
            $(".address").text(params.customDescription);
            hasAddress = true;
          }
          else if (params.description === "service") {
            location = data.getElementsByTagName("location")[0];

            if (location) {
              place = location.getAttribute("city_name");

              if (location.getAttribute("state_name")) {
                place += ", " + location.getAttribute("state_name");
              }

              $(".address").text(place);
              hasAddress = true;
            }
          }

          // Wind and humidity
          if (current) {
            if (params.showHumidity) {
              windDirection = i18n.t("weather." + current.getAttribute("wind_short"));

              if (!isNaN(current.getAttribute("humidity"))) {
                $(".humidity").text(i18n.t("weather.humidity") + " " + current.getAttribute("humidity") + "%");
              }

              if (params.windSpeed === "mph") {
                if (current.getAttribute("wind_short") && current.getAttribute("wind_speed")) {
                  $(".wind").text(i18n.t("weather.wind") + " " + windDirection + " " + i18n.t("weather.at") + " " +
                    parseInt(current.getAttribute("wind_speed")) + " " + i18n.t("common.units.mph"), 10);
                }
              }
              else if (params.windSpeed === "kph") {
                if (current.getAttribute("wind_short") && current.getAttribute("wind_speed")) {
                  mph = parseInt(current.getAttribute("wind_speed"), 10);
                  kph = Math.round(mph * 1.609344);

                  $(".wind").text(i18n.t("weather.wind") + " " + windDirection + " " + i18n.t("weather.at") +
                    " " + kph + " " + i18n.t("common.units.kph"));
                }
              }

              hasHumidity = true;
            }
            else {
              $(".humidity-wind").hide();
            }
          }

          if (!hasAddress && !hasHumidity) {
            $(".info").hide();
          }

          forecast = data.getElementsByTagName("forecast");

          // Forecasted weather
          if (forecast) {
            if (params.layout !== "current") {
              for (var i = 0; i < forecast.length; i++) {
                dayOfWeek = parseInt(forecast[i].getAttribute("day_of_week"), 10);

                if ((dayOfWeek === today)) {
                  forecasts[0] = forecast[i];
                }
                else if (dayOfWeek === tomorrow) {
                  forecasts[1] = forecast[i];
                }
                else if (dayOfWeek === nextDay) {
                  forecasts[2] = forecast[i];
                }
              }
            }

            // Images
            $(".icon").each(function(index) {
              if (forecasts[index].getAttribute("icon_name")) {
                loadImage(forecasts[index].getAttribute("icon_name"), $(this));
                $(this).attr("title", forecasts[index].getAttribute("description"));
              }
              else {
                $(this).hide();
              }
            });

            // Weekday
            $(".day-of-week").each(function(index) {
              $(this).html(i18n.t("common." + forecasts[index].getAttribute("weekday").toLowerCase()));
            });

            // Temperature
            $(".forecast-temp").each(function(index) {
              $(this).html(convertTemp(forecasts[index].getAttribute("high_temp")) + "&#176; / " +
                convertTemp(forecasts[index].getAttribute("low_temp")) + "&#176;");
            });
          }

          setTimeout(function() {
            getWeather();
          }, refreshInterval);
        });
      }
    }
    else {
     retry();
    }

    if (isLoading) {
      isLoading = false;
      ready();
    }
  }

  function retry() {
    if (isLoading) {
      $(".container").hide();
      $(".error").text(i18n.t("weather.errors.no-data")).show();
    }

    setTimeout(function() {
      getWeather();
    }, errorInterval);
  }

  /* Load a weather image. */
  function loadImage(icon, $element) {
    var img = new Image(),
      url = "img/" + icon + ".png";

    img.onload = function() {
      $element.attr("src", url);
      onImageLoaded();
    };

    img.onerror = function() {
      console.log("Image " + icon + " not found on " + new Date() + " for " + $(".address").text());
      onImageLoaded();
    };

    img.src = url;
  }

  /* Event handler for when a weather image has been loaded. */
  function onImageLoaded() {
    imagesLoaded++;

    if (params.layout === "current") {
      if (imagesLoaded === 1) {
        $(document).trigger("dataPopulated");
      }
    }
    else if (params.layout === "three-day") {
      if (imagesLoaded === 3) {
        $(document).trigger("dataPopulated");
      }
    }
    else if (params.layout === "current-and-three-day") {
      if (imagesLoaded === 4) {
        $(document).trigger("dataPopulated");
      }
    }
    /* When using a custom layout, the number of images is unknown.
       The `dataPopulated` event will fire once per image. */
    else {
      $(document).trigger("dataPopulated");
    }
  }

  /* Unable to connect to the weather service. */
  function handleErrors(errors) {
    if (errors.length > 0) {
      console.log("Unable to connect to the weather service at " + new Date() +
        ". Please check your Internet connection.");

      // Keep trying to connect at a regular interval.
      setTimeout(function() {
        getWeather();
      }, errorInterval);
    }
  }

  /* Convert temperature to correct unit. */
  function convertTemp(temp) {
    if (params.unit === "celsius") {
      return parseInt(((temp - 32) * 5 / 9.0), 10);
    }
    // Default temperature is in Fahrenheit.
    else {
      return parseInt(temp, 10);
    }
  }

  function ready() {
    gadgets.rpc.call("", "rsevent_ready", null, prefs.getString("id"), true,
      true, true, true, true);
  }

  /*
   *  Public Methods
   */
  function setParams(names, values) {
    if (Array.isArray(names) && names.length > 0 && names[0] === "additionalParams") {
      if (Array.isArray(values) && values.length > 0) {
        params = JSON.parse(values[0]);

        // Load fonts.
        var fontSettings = [
          {
            "class": "current-temp",
            "fontSetting": params.currentTempFont
          },
          {
            "class": "forecast-temp",
            "fontSetting": params.forecastTempFont
          },
          {
            "class": "day-of-week",
            "fontSetting": params.forecastDayFont
          },
          {
            "class": "address",
            "fontSetting": params.addressFont
          },
          {
            "class": "humidity-wind",
            "fontSetting": params.humidityFont
          }
        ];

        utils.loadFonts(fontSettings);
        document.body.style.background = params.background.color;
        $(".container").width(prefs.getInt("rsW")).height(prefs.getInt("rsH"));

        if (!params.terms) {
          $(".container").hide();
          $(".error").text(i18n.t("weather.errors.no-terms")).show();
          ready();
        }

        getWeather();
      }
    }
  }

  return {
    "setParams": setParams
  };
})(gadgets, config, i18n);
