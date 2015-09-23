"use strict";

var geolocation = new RiseVision.Weather.Geolocation(config);

describe("Widget - RiseVision.Weather.Geolocation", function() {
  it("should exist", function() {
    expect(RiseVision.Weather.Geolocation).not.to.equal(null);
    expect(RiseVision.Weather.Geolocation).to.be.a("function");
    expect(geolocation.getWeather).to.be.a("function");
  });

  it("should return data when geolocation is used", function() {
    function onSuccess(data) {
      expect(data).to.exist;
      expect(data.getElementsByTagName("cw_error")).to.have.length(0);
      expect(data.getElementsByTagName("observation")).to.exist;
      expect(data.getElementsByTagName("location")).to.exist;
      expect(data.getElementsByTagName("location")).to.have.length(1);
      expect(data.getElementsByTagName("forecast")).to.exist;
      expect(data.getElementsByTagName("forecast")).to.have.length(7);
    }

    geolocation.getWeather({
      "success": onSuccess
    });
  });
});
