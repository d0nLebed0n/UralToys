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

  class MobileNavigation {
    constructor(props) {
      console.log(props);
      this._catalogItem = props.TAB_TOGGLE;
      this._mobileBreakpoint = props.BREAKPOINT;
      this._mobileList = props.TAB_PARENT;
      this._mobileListItem = props.TAB_TARGET;
      this._activeClass = props.ACTIVE_CLASS;
      this._openCatalog = this._openCatalog.bind(this);
    }
    _openCatalog(node) {
      node.classList.toggle(this._activeClass);
      node.closest(this._mobileList).querySelector(this._mobileListItem).classList.toggle(this._activeClass);
    }
    addEventListener() {
      if (this._mobileBreakpoint.matches === true) {
        this._catalogItem.forEach((item) => {
          item.addEventListener(`click`, () => {
            this._openCatalog(item)
          });
        });
      }
    }

  }

  document.addEventListener('DOMContentLoaded', function () {
    const NavigationEnum = {
      MAIN_CATALOG: {
        TAB_TOGGLE: document.querySelectorAll(`.navigation__item_svg .navigation__link svg`),
        BREAKPOINT: window.matchMedia("(max-width: 875px)"),
        TAB_PARENT: `.navigation__item_svg`,
        TAB_TARGET: `.navigation__hidden-list`,
        ACTIVE_CLASS: `js-isOpened`,
      },
      INNER_CATALOG: {
        TAB_TOGGLE: document.querySelectorAll(`.js-openCategory`),
        BREAKPOINT: window.matchMedia("(max-width: 875px)"),
        TAB_PARENT: `.navigation__hidden-item`,
        TAB_TARGET: `.navigation__hidden-sublist`,
        ACTIVE_CLASS: `js-isOpened`,
      }
    };
    const newMenu = new mobileMenu();
    newMenu.getCaseOfCurrentPoint();
    const mainNavigation = new MobileNavigation(NavigationEnum.MAIN_CATALOG);
    const innerNavigation = new MobileNavigation(NavigationEnum.INNER_CATALOG);
    mainNavigation.addEventListener();
    innerNavigation.addEventListener();
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
