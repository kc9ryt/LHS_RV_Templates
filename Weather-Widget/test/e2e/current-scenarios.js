var system = require("system");
var e2ePort = system.env.E2E_PORT || 8099;

casper.test.begin("Weather Widget - Current - e2e Testing", function (test) {
  casper.start("http://localhost:"+e2ePort+"/src/current-e2e.html",
    function () {
      test.assertTitle("Weather Widget - Current", "Test page has loaded");
    }
  );

  casper.waitForText("Humidity", function() {
    casper.then(function() {
      casper.test.comment("Weather Details");

      test.assertSelectorHasText(".address", "Glen Eden Ski Area, Ontario", "City is correct");
      test.assertSelectorHasText(".humidity", "Humidity 44%", "Humidity is correct");
      test.assertSelectorHasText(".wind", "Wind NW at 18 kph", "Wind is correct");


      casper.test.comment("Current Weather");

      test.assertEquals(this.getElementAttribute(".current-icon", "src"), "img/mostly_cloudy.png", "Image is correct");
      test.assertEquals(this.getElementAttribute(".current-icon", "title"), "Partly sunny. Chilly.", "Image title is correct");
      test.assertSelectorHasText(".current-temp", "2°C", "Temperature is correct");


      casper.test.comment("Error Message");

      test.assertNotVisible(".error", "Error message is not displayed");
    });
  });

  casper.run(function() {
    test.done();
  });
});
