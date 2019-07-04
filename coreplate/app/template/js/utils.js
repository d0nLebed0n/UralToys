'use strict';

(function () {
  const mobileMenu = function() {
    this._topMenuItem = document.querySelector('.header__top-list');
    this._menuSubWrapper = document.querySelector('.js-detachElements');
    this._mainMenu = document.querySelector('.js-mainMenu');
  };
  mobileMenu.prototype.getCaseOfCurrentPoint = function() {
    const menuWrapper = document.querySelector('.js-mobileWrapper'),
      menuOverlay = document.querySelector('.js-mobileOverlay'),
      menuBurger = document.querySelector('.js-openMobile'),
      menuClose = document.querySelector('.js-closeMenu');
    if (window.matchMedia("(max-width:1440px)").matches === true) {
      this._menuSubWrapper.appendChild(this._topMenuItem);
      mobileMenu.prototype.setEventListeners({menuBurger, menuWrapper, menuOverlay, menuClose})
    }
    if (window.matchMedia("(max-width:875px)").matches === true) {
      this._menuSubWrapper.appendChild(this._mainMenu);
      mobileMenu.prototype.hideUnusedElems(document.querySelectorAll('.js-mainMenu .navigation__link'));
    }
  };
  mobileMenu.prototype.hideUnusedElems = function (props) {
    const listLinks = props;
    listLinks.forEach(function (item) {
      console.log(item.getAttribute('data-show'));
      if (item.getAttribute('data-show') === 'false') {
        item.parentNode.style.display = 'none';
      }
    })
  };
  mobileMenu.prototype.togglePopup = function (object) {
    object.burgerItem.classList.toggle('js-isActive');
    object.overlayItem.classList.toggle('js-isActive');
    object.wrapperItem.classList.toggle('js-isActive');
    document.body.classList.toggle('js-overFlowed')
  };
  mobileMenu.prototype.setEventListeners = function (props) {
    const itemsList = {
      burgerItem: props.menuBurger,
      wrapperItem: props.menuWrapper,
      overlayItem: props.menuOverlay,
      closeItem: props.menuClose
    };
    itemsList.burgerItem.addEventListener('click', function () {
      mobileMenu.prototype.togglePopup(itemsList);
    });
    itemsList.closeItem.addEventListener('click', function () {
      mobileMenu.prototype.togglePopup(itemsList);
    });
    itemsList.overlayItem.addEventListener('click', function () {
      mobileMenu.prototype.togglePopup(itemsList);
    })
  };
  document.addEventListener('DOMContentLoaded', function () {
    const newMenu = new mobileMenu();
    newMenu.getCaseOfCurrentPoint();
  });
})();

(function () {
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
