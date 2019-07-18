'use strict';

(function () {
  window.utils = {
    getIE: function () {
      const currentAgent = navigator.userAgent;
      if (currentAgent.match(/rv:11.0/i)) {
        return false;
      } else {
        return true;
      }
    },
  };
})();

(function () {
  class MobileMenu {
    constructor(props) {
      this._topMenuItem = props.TOP_MENU_NAVIGATION;
      this._menuSubWrapper = props.MENU_SUB_WRAPPER;
      this._mainMenu = props.MAIN_NAVIGATION;
      this._search = props.SEARCH;
      this._activeClass = props.ACTIVE_CLASS;
      this._overflowed = props.OVERFLOWED_CLASS;
      this._burgerClass = props.BURGER_CLASS;
      this._overflowedClass = props.OVERLAY_CLASS;
      this._menuClass = props.MENU_CLASS;
      this._closeClass = props.CLOSE_CLASS;

      this._breakPoints = {
        DESKTOP: "(max-width:1440px)",
        TABLET: "(max-width:875px)",
        MOBILE: "(max-width:479px)",
      }
    }

    getCaseOfCurrentPoint() {
      const menuWrapper = document.querySelector(this._menuClass),
        menuOverlay = document.querySelector(this._overflowedClass),
        menuBurger = document.querySelector(this._burgerClass),
        menuClose = document.querySelector(this._closeClass);

      if (window.matchMedia(this._breakPoints.DESKTOP).matches === true) {
        this._menuSubWrapper.appendChild(this._topMenuItem);
        this._setEventListeners({menuBurger, menuWrapper, menuOverlay, menuClose})
      }
      if (window.matchMedia(this._breakPoints.TABLET).matches === true) {
        this._menuSubWrapper.appendChild(this._mainMenu);
        this._hideUnusedElements(document.querySelectorAll('.js-mainMenu .navigation__link'));
      }
      if (window.matchMedia(this._breakPoints.MOBILE).matches === true) {
        this._menuSubWrapper.appendChild(this._search);
      }
    }

    _hideUnusedElements(props) {

      // props.forEach(function (item) {
      //   if (item.getAttribute('data-show') === 'false') {
      //     item.parentNode.style.display = 'none';
      //   }
      // })

    }

    _togglePopup(object) {

      object.burgerItem.classList.toggle(this._activeClass);
      object.overlayItem.classList.toggle(this._activeClass);
      object.wrapperItem.classList.toggle(this._activeClass);
      document.body.classList.toggle(this._overflowed);

    }

    _setEventListeners(props) {

      const itemsList = {
        burgerItem: props.menuBurger,
        wrapperItem: props.menuWrapper,
        overlayItem: props.menuOverlay,
        closeItem: props.menuClose
      };

      itemsList.burgerItem.addEventListener('click', () => {
        this._togglePopup(itemsList);
      });
      itemsList.closeItem.addEventListener('click', () => {
        this._togglePopup(itemsList);
      });
      itemsList.overlayItem.addEventListener('click', () => {
        this._togglePopup(itemsList);
      })
    }
  }

  class MobileNavigation {
    constructor(props) {
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
    const newMenu = new MobileMenu(MobileEnum);
    const mainNavigation = new MobileNavigation(NavigationEnum.MAIN_CATALOG);
    const innerNavigation = new MobileNavigation(NavigationEnum.INNER_CATALOG);
    newMenu.getCaseOfCurrentPoint();
    mainNavigation.addEventListener();
    innerNavigation.addEventListener();
  });
})();
