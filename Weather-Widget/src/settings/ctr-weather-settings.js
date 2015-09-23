angular.module("risevision.widget.weather.settings")
  .controller("weatherSettingsController", ["$scope", "current", "threeDay", "currentAndThreeDay",
    function ($scope, current, threeDay, currentAndThreeDay) {
      $scope.termsAccepted = false;
      $scope.showCurrent = true;
      $scope.showForecast = false;
      $scope.showCustomAddress = false;
      $scope.showCustomDescription = false;
      $scope.showHumidity = true;

      $scope.current = current;
      $scope.threeDay = threeDay;
      $scope.currentAndThreeDay = currentAndThreeDay;

      $scope.$watch("settings.additionalParams.terms", function (terms) {
        if (terms !== undefined) {
          $scope.termsAccepted = terms;
        }
      });

      $scope.$watch("settings.additionalParams.layoutURL", function (url) {
        if (url !== undefined) {
          $scope.settings.params.layoutURL = url;
        }
      });

      $scope.$watch("settings.additionalParams.layout", function (layout) {
        if (layout !== undefined) {
          if (layout === "current") {
            $scope.showCurrent = true;
            $scope.showForecast = false;
            $scope.settings.params.layoutURL = current;
          }
          else if (layout === "three-day") {
            $scope.showCurrent = false;
            $scope.showForecast = true;
            $scope.settings.params.layoutURL = threeDay;
          }
          else if ((layout === "current-and-three-day") || (layout === "custom")) {
            $scope.showCurrent = true;
            $scope.showForecast = true;

            if (layout === "custom") {
              $scope.settings.params.layoutURL = $scope.settings.additionalParams.layoutURL;
            }
            else {
              $scope.settings.params.layoutURL = currentAndThreeDay;
            }
          }
        }
      });

      $scope.$watch("settings.additionalParams.address", function (address) {
        $scope.showCustomAddress = (address === "custom") ? true : false;
      });

      $scope.$watch("settings.additionalParams.description", function (description) {
        $scope.showCustomDescription = (description === "custom") ? true : false;
      });

      $scope.$watch("settings.additionalParams.showHumidity", function (showHumidity) {
        if (showHumidity !== undefined) {
          $scope.showHumidity = showHumidity;
        }
      });
    }
  ])
  .value("defaultSettings", {
    params: {
      "layoutURL": ""
    },
    additionalParams: {
      "terms": false,
      "layout": "current",
      "currentTempFont": {
        "size": "60",
        "bold" : true
      },
      "forecastTempFont": {},
      "forecastDayFont": {
        "bold" : true
      },
      "address": "geolocation",
      "customAddress": "",
      "description": "service",
      "customDescription": "",
      "addressFont": {
        "size": "24",
        "bold" : true
      },
      "showHumidity": true,
      "windSpeed": "kph",
      "humidityFont": {},
      "unit": "celsius",
      "background": {}
    }
  });
