/* global RiseVision, gadgets */
(function (window, document, gadgets) {
  "use strict";

  var prefs = new gadgets.Prefs(),
    id = prefs.getString("id");

  // Disable context menu (right click menu)
  window.oncontextmenu = function () {
    return false;
  };

  document.body.onmousedown = function() {
    return false;
  };

  gadgets.rpc.register("rsparam_set_" + id, RiseVision.Weather.setParams);
  gadgets.rpc.call("", "rsparam_get", null, id, ["additionalParams"]);
})(window, document, gadgets);
