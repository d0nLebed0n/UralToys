/* @TODO:
* инициализацию в catalog.js
* Разгрести IIFE помойку
* */
(function () {
  class HorizontalTabs {
    constructor(props) {
      this._sortButton = document.querySelector(`.js-toggleSort`);
      this._sortList = document.querySelector(`.js-openSort`);
      this._filterButton = document.querySelector(`.js-toggleFilter`);
      this._filterItem = document.querySelector(`.js-filter`);
      this._desktopWrapper = document.querySelector(`.js-appendWrap`);
      this._mobileWrapper = document.querySelector(`.js-appendFilter`);
      this._closeFilter = document.querySelector(`.filter__close`);
      this._openFilterTab = document.querySelectorAll(`.filter__button`);

      this._breakPoint = window.matchMedia("(max-width:735px)");
      this._filterBreakPoint = window.matchMedia("(max-width:479px)");
    }

    setFilter() {
      const checkChildrensAvailability = (parentNode, elementToCheck) => {
          const childrenList = parentNode.children;
          for (let i = 0; i <= childrenList.length; i++) {
            for (let ii = 0; ii <= elementToCheck.classList.length; ii++) {
              if (childrenList[i] !== undefined) {
                if (childrenList[i].classList.contains(elementToCheck.classList[ii]) === true) {
                  return false;
                }
              }
            }
          }
          return true;
      };
      if (this._breakPoint.matches === true && checkChildrensAvailability(this._mobileWrapper, this._filterItem) === true) {
        this._mobileWrapper.appendChild(this._filterItem);
      }

      if (this._filterBreakPoint.matches === true) {
        const getCrumbsHeight = document.querySelector(`.breadcrumbs`).offsetHeight;
        const getHorizontalTabsHeight = document.querySelector(`.horizontal-tabs`).offsetHeight;
        const getTitleHeight = document.querySelector(`.inner-title`).offsetHeight;
        const getHeadersHeight = document.querySelector(`.header`).offsetHeight;

        this._filterItem.style.top = `-${getCrumbsHeight + getHorizontalTabsHeight + getTitleHeight}px`;
        this._filterItem.style.maxHeight = `calc(100vh - ${getHeadersHeight}px)`;
      } else {
        this._filterItem.style.top = `0px`;
        this._filterItem.style.maxHeight = `auto`;
      }
    }

    _toggleFilter(targetElement) {
      targetElement.classList.toggle(`js-isOpened`);
      targetElement.closest(`.filter__item`).querySelector(`.filter__item-body`).classList.toggle(`js-isOpened`);
    }

    setEventListeners() {
      this._sortButton.addEventListener(`click`, () => {
        this._sortList.classList.toggle(`js-isOpened`);
        this._mobileWrapper.classList.toggle(`js-isOpened`);
        document.querySelector(`.page`).classList.toggle(`js-isOpenedByCatalogTabs`);
      });
      this._filterButton.addEventListener(`click`, () => {
        this._filterItem.classList.toggle(`js-isOpened`);
        this._mobileWrapper.classList.toggle(`js-isOpened`);
        document.querySelector(`.page`).classList.toggle(`js-isOpenedByCatalogTabs`);
      });
      this._closeFilter.addEventListener(`click`, () => {
        this._filterItem.classList.toggle(`js-isOpened`);
        this._mobileWrapper.classList.toggle(`js-isOpened`);
        document.querySelector(`.page`).classList.toggle(`js-isOpenedByCatalogTabs`);
      });
      this._openFilterTab.forEach((item) => {
        item.addEventListener(`click`, () => {
          this._toggleFilter(event.target);
        });
      });
      window.addEventListener(`resize`, () => {
        this.setFilter()
      });
    }
  }


  document.addEventListener(`DOMContentLoaded`, () => {
    const createHorizontalPanel = new HorizontalTabs();
    createHorizontalPanel.setEventListeners();
    createHorizontalPanel.setFilter();
  })
})();
