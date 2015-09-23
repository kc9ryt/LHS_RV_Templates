(function(window) {

  "use strict";

  window.gadget = window.gadget || {};

  window.gadget.settings = {
    "params": {
      "layoutURL": "http://s3.amazonaws.com/Widget-Weather-Test/current.html"
    },
    "additionalParams": {
      "terms": true,
      "layout": "current",
      "currentTempFont": {
        "font": {
          "family": "Verdana"
        },
        "size": "60",
        "bold": true,
        "italic": false,
        "underline": false,
        "color": "black",
        "highlightColor": "transparent"
      },
      "forecastTempFont": {
        "font": {
          "family": "Verdana"
        },
        "size": "20",
        "bold": false,
        "italic": false,
        "underline": false,
        "color": "black",
        "highlightColor": "transparent"
      },
      "forecastDayFont": {
        "font": {
          "family": "Verdana"
        },
        "size": "20",
        "bold": true,
        "italic": false,
        "underline": false,
        "color": "black",
        "highlightColor": "transparent"
      },
      "address": "custom",
      "customAddress": "Mississauga, ON",
      "description": "service",
      "customDescription": "",
      "addressFont": {
        "font": {
          "family": "Verdana"
        },
        "size": "24",
        "bold": true,
        "italic": false,
        "underline": false,
        "color": "black",
        "highlightColor": "transparent"
      },
      "showHumidity": true,
      "windSpeed": "kph",
      "humidityFont": {
        "font": {
          "family": "Verdana"
        },
        "size": "20",
        "bold": false,
        "italic": false,
        "underline": false,
        "color": "black",
        "highlightColor": "transparent"
      },
      "unit": "celsius",
      "background": {
        "color": "transparent"
      }
    }
  };
})(window);
