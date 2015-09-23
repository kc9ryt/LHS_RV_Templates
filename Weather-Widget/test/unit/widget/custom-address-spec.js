"use strict";

var custom = new RiseVision.Weather.CustomAddress(config);

describe("Widget - RiseVision.Weather.CustomAddress", function() {
  it("should exist", function() {
    expect(RiseVision.Weather.CustomAddress).not.to.equal(null);
    expect(RiseVision.Weather.CustomAddress).to.be.a("function");
    expect(custom.getWeather).to.be.a("function");
  });

  it("should return data for a custom address", function() {
    var customAddress = "Mississauga, ON";

    function onSuccess(data) {
      expect(data).to.exist;
      expect(data.getElementsByTagName("cw_error")).to.have.length(0);
      expect(data.getElementsByTagName("observation")).to.exist;
      expect(data.getElementsByTagName("location")).to.exist;
      expect(data.getElementsByTagName("location")).to.have.length(1);
      expect(data.getElementsByTagName("forecast")).to.exist;
      expect(data.getElementsByTagName("forecast")).to.have.length(7);
    }

    custom.getWeather(customAddress, {
      "success": onSuccess
    });
  });
});
