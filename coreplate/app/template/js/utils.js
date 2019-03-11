'use strict';

(function () {
  var checkVisibility = function (target) {
    var targetPosition = {
      top: window.pageYOffset + target.getBoundingClientRect().top,
      left: window.pageXOffset + target.getBoundingClientRect().left,
      right: window.pageXOffset + target.getBoundingClientRect().right,
      bottom: window.pageYOffset + target.getBoundingClientRect().bottom
    };


    var windowPosition = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      right: window.pageXOffset + document.documentElement.clientWidth,
      bottom: window.pageYOffset + document.documentElement.clientHeight
    };

    if (targetPosition.bottom > windowPosition.top &&
			targetPosition.top < windowPosition.bottom &&
			targetPosition.right <= windowPosition.right) {

      return false;
    } else {
      return true;
    }
  };

  var ieCheck = function () {
    var ua = navigator.userAgent;
    var doc = document.documentElement;
    if ((ua.match(/rv:11.0/i))) {
      doc.className = doc.className + 'ie11';
    }
  };
  window.utils = {
    checkVis: checkVisibility,
    getIE: function () {
      var currentAgent = navigator.userAgent;
      if ((currentAgent.match(/rv:11.0/i))) {
        return false;
      } else {
        return true;
      }
    },
  };
})();
