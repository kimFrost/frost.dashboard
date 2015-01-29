'use strict';

// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

(function (window, document, undefined) {

  var base = {
    options: {
      debug: true,
      feedUrl: 'feed.json'
    },
    data: {},
    logCount: 0,
    states: {}
  };
/**---------------------------------------
  Log
---------------------------------------**/
  base.log = function (msg, msg2) {
    if (!base.options.debug) {
      return;
    }
    try {
      if (base.logCount > 500) {
        console.clear();
        base.logCount = 0;
      }
      if (msg2 !== undefined) {
        console.log(msg, msg2);
      }
      else {
        console.log(msg);
      }
      base.logCount++;
    }
    catch (err) {
      //send error to developer platform
    }
  };
/**---------------------------------------
  Debug
---------------------------------------**/
  var getFeed = function() {
    var xmlhttp = new XMLHttpRequest();
    var feedUrl = base.options.feedUrl;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var data = JSON.parse(xmlhttp.responseText);
        base.log('data', data);
        //injectHtml();
      }
    };
    xmlhttp.open('GET', feedUrl, true);
    xmlhttp.send();
  };
/**---------------------------------------
  Initialize
---------------------------------------**/
  var initiate = function () {
    getFeed();
  };
  initiate();
  window.dashboard = base;

})(window, window.document);
