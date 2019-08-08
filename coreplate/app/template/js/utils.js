'use strict';
/* TODO:
* Разобрать IIFE помойку
* */
(function () {
  window.utils = {
    getIE: function () {
      const currentAgent = navigator.userAgent;
      return currentAgent.match(/rv:11.0/i);
    },
    checkVisibility: (target) => {
      const targetPosition = {
          top: window.pageYOffset + target.getBoundingClientRect().top,
          left: window.pageXOffset + target.getBoundingClientRect().left,
          right: window.pageXOffset + target.getBoundingClientRect().right,
          bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
        windowPosition = {
          top: window.pageYOffset,
          left: window.pageXOffset,
          right: window.pageXOffset + document.documentElement.clientWidth,
          bottom: window.pageYOffset + document.documentElement.clientHeight
        };
      return targetPosition.bottom > windowPosition.top &&
        targetPosition.top < windowPosition.bottom &&
        targetPosition.right <= windowPosition.right;
    }
  };
})();

(function () {
  /* TODO:
  * @ Ускорить работу на планшетах и мобильниках, некорректно обсчитываются другие скрипты.
  * */
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
    /* TODO:
    * @ Почистить от шлака в почках
    * */
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
      document.querySelector(`.page`).classList.toggle(this._overflowed);
      document.querySelector(`body`).classList.toggle(this._overflowed);
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

  class FixedItems {
    constructor(props) {
      this._startPoint = props.startPoint || false;
      this._items = props.fixedItemsEnum;
      this._beforeItem = props.beforeItem || false;
      this._mainWrapper = document.querySelector(`.main`);
      this._elementToTop = this._items.MAIN_WRAPPER.offsetHeight;
    }
    _checkScroll() {
      const scrollY = window.scrollY;

      return scrollY > this._elementToTop;
    }
    _toggleSearch() {
      this._items.SEARCH_FIXED_BUTTON.classList.toggle(`js-isActive`);
      this._items.SEARCH_FIXED_LABEL.classList.toggle(`js-isActive`);
    }
    _toggleClasses() {
      if (this._checkScroll() === true) {
        /* TODO:
        * Лол
        * */
        for (let key in this._items) {
          this._items[key].classList.add(`js-isFixed`);
        }
        this._mainWrapper.style.paddingTop = `${this._elementToTop}px`;

      } else {

        for (let key in this._items) {
          this._items[key].classList.remove(`js-isFixed`);
        }

        this._mainWrapper.style.paddingTop = `0px`;

      }
    }
    setEventListeners() {
      document.addEventListener(`scroll`, () => {
        this._toggleClasses();
      });
      this._items.SEARCH_FIXED_BUTTON.addEventListener(`click`, () => {
        this._toggleSearch();
      });
      this._items.SEARCH_FIXED_CLOSE.addEventListener(`click`, () => {
        this._toggleSearch();
      })
    }
  }

  /* TODO:
  * Всю инициализацию описывать в script.js каждой страницы
  * */
  document.addEventListener('DOMContentLoaded', function () {
    const newMenu = new MobileMenu(MobileEnum);
    const mainNavigation = new MobileNavigation(NavigationEnum.MAIN_CATALOG);
    const innerNavigation = new MobileNavigation(NavigationEnum.INNER_CATALOG);
    const fixedHeader = new FixedItems(HeaderToFixedEnum);
    newMenu.getCaseOfCurrentPoint();
    mainNavigation.addEventListener();
    innerNavigation.addEventListener();
    fixedHeader.setEventListeners();
  });
})();

(function () {
  $('.js-isSelectric').selectric({
    inheritOriginalWidth: true,
    arrowButtonMarkup: `<div class="text-input__arrow">
                            <svg viewBox="0 0 8 8" class="text-input__icon">
                                <path xmlns="http://www.w3.org/2000/svg" d="M2.6 0.544L3.528 3.36L4.28 5.52L4.344 5.52L5.096 3.36L6.024 0.544L7.96 0.544L5.128 7.904L3.496 7.904L0.664 0.543999L2.6 0.544Z"></path>
                            </svg>
                        </div>`,
    responsive: true
  })
})();
