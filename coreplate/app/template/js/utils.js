'use strict';

(function () {
  var mobileMenu = function() {
    this._topMenuItem = document.querySelector('.header__top-list');
    this._menuSubWrapper = document.querySelector('.js-detachElements');
  };
  mobileMenu.prototype.getCaseOfCurrentPoint = function() {
    var menuWrapper = document.querySelector('.js-mobileWrapper'),
      menuOverlay = document.querySelector('.js-mobileOverlay'),
      menuBurger = document.querySelector('.js-openMobile');
    if (window.matchMedia("(max-width:1440px)").matches === true) {
      this._menuSubWrapper.appendChild(this._topMenuItem);
      mobileMenu.prototype.setEventListeners({menuBurger, menuWrapper, menuOverlay})
    };
  };

  mobileMenu.prototype.setEventListeners = function (props) {
    const itemsList = {
      burgerItem: props.menuBurger,
      wrapperItem: props.menuWrapper,
      overlayItem: props.menuOverlay
    };
    itemsList.burgerItem.addEventListener('click', function () {
      this.classList.toggle('js-isActive');
      itemsList.overlayItem.classList.toggle('js-isActive');
      itemsList.wrapperItem.classList.toggle('js-isActive');
    })
  };
  document.addEventListener('DOMContentLoaded', function () {

    var newMenu = new mobileMenu();
    newMenu.getCaseOfCurrentPoint();
  });
  window.utils = {
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
