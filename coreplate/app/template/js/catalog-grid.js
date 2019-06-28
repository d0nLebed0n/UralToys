'use strict';
(function () {
  const parseGridRow = (parseItem, templateString) => {
    const getAllItems = document.querySelectorAll(parseItem);
    const mobileGridElement = 'catalog-grid__item-is-mobile';
    let checkBreakPoint = false;
    getAllItems.forEach((item, index) => {
      item.classList.add(templateString + index);
      item.classList.remove(mobileGridElement);
    });
    if (window.matchMedia("(max-width:775px)").matches === true && !checkBreakPoint) {
      getAllItems.forEach((item, index) => {
        item.classList.remove(templateString + index);
        item.classList.add(mobileGridElement);
      });
      checkBreakPoint = !checkBreakPoint;
    }
  };

  parseGridRow('.catalog-grid__item_size_big', 'catalog-grid__item_position_');
})();
