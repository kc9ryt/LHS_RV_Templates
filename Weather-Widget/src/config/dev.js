/* jshint ignore:start */
if (typeof angular !== "undefined") {
  angular.module("risevision.widget.weather.config", [])
    .value("current", "https://s3.amazonaws.com/widget-weather-test/0.1.0/dist/current.html")
    .value("threeDay", "https://s3.amazonaws.com/widget-weather-test/0.1.0/dist/three-day.html")
    .value("currentAndThreeDay", "https://s3.amazonaws.com/widget-weather-test/0.1.0/dist/current-and-three-day.html")
  ;

  angular.module("risevision.common.i18n.config", [])
    .constant("LOCALES_PREFIX", "components/rv-common-i18n/dist/locales/translation_")
    .constant("LOCALES_SUFIX", ".json");
}

if (typeof config === "undefined") {
  var config = {
    urlByName: decodeURI(decodeURIComponent("%68%74%74%70%3a%2f%2f%77%77%77%2e%74%69%6e%62%75%77%65%61%74%68%65%72%2e%63%6f%6d%2f%77%78%5f%66%65%65%64%2f%77%78%5f%63%75%72%72%65%6e%74%5f%65%78%74%65%6e%64%65%64%5f%62%79%5f%6e%61%6d%65%2e%70%68%70%3f%70%61%73%73%63%6f%64%65%3d%72%69%73%65%64%69%73%70%6c%61%79%25%37%43%64%6b%61%63%26%6d%65%74%72%69%63%3d%66%61%6c%73%65")),
    urlByLocation: decodeURI(decodeURIComponent("%68%74%74%70%3a%2f%2f%77%77%77%2e%74%69%6e%62%75%77%65%61%74%68%65%72%2e%63%6f%6d%2f%77%78%5f%66%65%65%64%2f%77%78%5f%63%75%72%72%65%6e%74%5f%65%78%74%65%6e%64%65%64%5f%62%79%5f%6c%61%74%6c%6f%6e%2e%70%68%70%3f%70%61%73%73%63%6f%64%65%3d%72%69%73%65%64%69%73%70%6c%61%79%25%37%43%64%6b%61%63%26%6d%65%74%72%69%63%3d%66%61%6c%73%65"))
  };
}
/* jshint ignore:end */
