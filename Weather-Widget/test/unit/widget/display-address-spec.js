"use strict";

var display = new RiseVision.Weather.DisplayAddress(gadgets);

describe("Widget - RiseVision.Weather.DisplayAddress", function() {
  it("should exist", function() {
    expect(RiseVision.Weather.DisplayAddress).not.to.equal(null);
    expect(RiseVision.Weather.DisplayAddress).to.be.a("function");
    expect(display.getWeather).to.be.a("function");
  });

  it("should return data for a display address", function() {
    function onSuccess(data) {
      expect(data).to.exist;
      expect(data.getElementsByTagName("cw_error")).to.have.length(0);
      expect(data.getElementsByTagName("observation")).to.exist;
      expect(data.getElementsByTagName("location")).to.exist;
      expect(data.getElementsByTagName("location")).to.have.length(1);
      expect(data.getElementsByTagName("forecast")).to.exist;
      expect(data.getElementsByTagName("forecast")).to.have.length(7);
    }

    display.getWeather({
      "success": onSuccess
    });
  });
});
