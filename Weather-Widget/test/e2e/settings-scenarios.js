/* jshint expr: true */
/* global element: false, browser: false, by: false */

(function () {
  "use strict";

  var expect;
  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);
  expect = chai.expect;

  describe("Weather Widget Settings", function() {
    beforeEach(function () {
      browser.get("/src/settings-e2e.html");
    });

    it("Should load all components", function () {
      expect(element(by.css("#current-temp-font font-picker")).isPresent()).to.eventually.be.true;
      expect(element(by.css("#forecast-temp-font font-picker")).isPresent()).to.eventually.be.true;
      expect(element(by.css("#forecast-day-font font-picker")).isPresent()).to.eventually.be.true;
      expect(element(by.css("#address-font font-picker")).isPresent()).to.eventually.be.true;
      expect(element(by.css("#humidity-font font-picker")).isPresent()).to.eventually.be.true;
      expect(element(by.css("#background .section")).isPresent()).to.eventually.be.true;
    });

    it("Should load default settings", function () {
      expect(element(by.model("settings.additionalParams.terms")).isSelected()).to.eventually.be.false;
      expect(element(by.model("settings.additionalParams.layout")).getAttribute("value")).to.eventually.equal("current");
      expect(element(by.model("settings.additionalParams.address")).getAttribute("value")).to.eventually.equal("geolocation");
      expect(element(by.model("settings.additionalParams.customAddress")).getAttribute("value")).to.eventually.equal("");
      expect(element(by.model("settings.additionalParams.description")).getAttribute("value")).to.eventually.equal("service");
      expect(element(by.model("settings.additionalParams.customDescription")).getAttribute("value")).to.eventually.equal("");
      expect(element(by.model("settings.additionalParams.showHumidity")).isSelected()).to.eventually.be.true;
      expect(element(by.model("settings.additionalParams.windSpeed")).getAttribute("value")).to.eventually.equal("kph");
      expect(element(by.model("settings.additionalParams.unit")).getAttribute("value")).to.eventually.equal("celsius");
    });

    it("Should set default visibility", function() {
      expect(element(by.css("#current-temp-font")).isDisplayed()).to.eventually.be.true;
      expect(element(by.css("#forecast-temp-font")).isDisplayed()).to.eventually.be.false;
      expect(element(by.css("#forecast-day-font")).isDisplayed()).to.eventually.be.false;
      expect(element(by.model("settings.additionalParams.customAddress")).isDisplayed()).to.eventually.be.false;
      expect(element(by.model("settings.additionalParams.customDescription")).isDisplayed()).to.eventually.be.false;
      expect(element(by.model("settings.additionalParams.windSpeed")).isDisplayed()).to.eventually.be.true;
      expect(element(by.css("#humidity-font")).isDisplayed()).to.eventually.be.true;
    });

    it("Should show correct font settings for different layouts", function () {
      // Three-day
      element(by.css("input[type='radio'][value='three-day']")).click();

      expect(element(by.css("#current-temp-font")).isDisplayed()).to.eventually.be.false;
      expect(element(by.css("#forecast-temp-font")).isDisplayed()).to.eventually.be.true;
      expect(element(by.css("#forecast-day-font")).isDisplayed()).to.eventually.be.true;

      // Current & three-day
      element(by.css("input[type='radio'][value='current-and-three-day']")).click();

      expect(element(by.css("#current-temp-font")).isDisplayed()).to.eventually.be.true;
      expect(element(by.css("#forecast-temp-font")).isDisplayed()).to.eventually.be.true;
      expect(element(by.css("#forecast-day-font")).isDisplayed()).to.eventually.be.true;

      // Custom
      element(by.css("input[type='radio'][value='custom']")).click();

      expect(element(by.css("#current-temp-font")).isDisplayed()).to.eventually.be.true;
      expect(element(by.css("#forecast-temp-font")).isDisplayed()).to.eventually.be.true;
      expect(element(by.css("#forecast-day-font")).isDisplayed()).to.eventually.be.true;
    });

    it("Should validate terms", function () {
      expect(element(by.id("layout-error")).isDisplayed()).to.eventually.be.true;
      expect(element(by.css("button#save[disabled=disabled")).isPresent()).to.eventually.be.true;

      element(by.model("settings.additionalParams.terms")).click();

      expect(element(by.id("layout-error")).isDisplayed()).to.eventually.be.false;
      expect(element(by.css("button#save[disabled=disabled")).isPresent()).to.eventually.be.false;
    });

    it("Should validate 'Your Custom Address'", function () {
      element(by.model("settings.additionalParams.terms")).click();
      element(by.css("#address option[value='custom']")).click();

      expect(element(by.model("settings.additionalParams.customAddress")).isDisplayed()).to.eventually.be.true;
      expect(element(by.id("custom-address-error")).isDisplayed()).to.eventually.be.true;
      expect(element(by.css("button#save[disabled=disabled")).isPresent()).to.eventually.be.true;
    });

    it("Should validate 'Your Custom Description'", function () {
      element(by.model("settings.additionalParams.terms")).click();
      element(by.css("#description option[value='custom']")).click();

      expect(element(by.model("settings.additionalParams.customDescription")).isDisplayed()).to.eventually.be.true;
      expect(element(by.id("custom-description-error")).isDisplayed()).to.eventually.be.true;
      expect(element(by.css("button#save[disabled=disabled")).isPresent()).to.eventually.be.true;
    });

    it("Should hide 'Wind Speed' and 'Font'", function () {
      element(by.model("settings.additionalParams.showHumidity")).click();

      expect(element(by.model("settings.additionalParams.windSpeed")).isDisplayed()).to.eventually.be.false;
      expect(element(by.css("#humidity-font")).isDisplayed()).to.eventually.be.false;
    });

    it("Should correctly save settings", function() {
      var settings = {
        "additionalParams": {
          "terms": true,
          "layout": "current",
          "currentTempFont": {
            "size": "60",
            "bold": true,
            "font": {
              "type": "standard",
              "name": "Verdana",
              "family": "Verdana"
            },
            "italic": false,
            "underline": false,
            "color": "black",
            "highlightColor": "transparent"
          },
          "forecastTempFont": {
            "font": {
              "type": "standard",
              "name": "Verdana",
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
            "bold": true,
            "font": {
              "type": "standard",
              "name": "Verdana",
              "family": "Verdana"
            },
            "size": "20",
            "italic": false,
            "underline": false,
            "color": "black",
            "highlightColor": "transparent"
          },
          "address": "geolocation",
          "customAddress": "",
          "description": "service",
          "customDescription": "",
          "addressFont": {
            "size": "24",
            "bold": true,
            "font": {
              "type": "standard",
              "name": "Verdana",
              "family": "Verdana"
            },
            "italic": false,
            "underline": false,
            "color": "black",
            "highlightColor": "transparent"
          },
          "showHumidity": true,
          "windSpeed": "kph",
          "humidityFont": {
            "font": {
              "type": "standard",
              "name": "Verdana",
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

      element(by.model("settings.additionalParams.terms")).click();
      element(by.id("save")).click();

      expect(browser.executeScript("return window.result")).to.eventually.deep.equal({
        "params": "https://s3.amazonaws.com/widget-weather-test/0.1.0/dist/current.html?",
        "additionalParams": JSON.stringify(settings.additionalParams)
      });
    });
  });
})();
