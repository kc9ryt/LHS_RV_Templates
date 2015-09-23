"use strict";

describe("Weather Settings", function() {
  beforeEach(module("risevision.widget.weather.settings"));

  var defaultSettings, $scope;

  beforeEach(function() {
    inject(function($injector, $rootScope, $controller) {
      defaultSettings = $injector.get("defaultSettings");
      $scope = $rootScope.$new();

      $controller("weatherSettingsController", { $scope: $scope });
    });
  });

  it("should define defaultSettings", function() {
    expect(defaultSettings).to.be.truely;
    expect(defaultSettings).to.be.an("object");
  });

  it("should define weatherSettingsController", function() {
    expect($scope.termsAccepted).to.be.truely;
    expect($scope.termsAccepted).to.be.false;
    expect($scope.showCurrent).to.be.truely;
    expect($scope.showCurrent).to.be.true;
    expect($scope.showForecast).to.be.truely;
    expect($scope.showForecast).to.be.false;
    expect($scope.showCustomAddress).to.be.truely;
    expect($scope.showCustomAddress).to.be.false;
    expect($scope.showCustomDescription).to.be.truely;
    expect($scope.showCustomDescription).to.be.false;
    expect($scope.showHumidity).to.be.truely;
    expect($scope.showHumidity).to.be.true;
  });
});