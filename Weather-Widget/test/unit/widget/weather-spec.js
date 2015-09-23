"use strict";

describe("Widget - RiseVision.Weather", function() {
  it("should exist", function() {
    expect(RiseVision.Weather).to.exist;
    expect(RiseVision.Weather).to.be.an("object");
    expect(RiseVision.Weather.setParams).to.be.a("function");
  });
});
