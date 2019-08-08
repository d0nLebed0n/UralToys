/* @TODO:
* Обернуть
* */
const toggleCatalogList = () => {
  const getAllItems = document.querySelectorAll(`.js-isParent`);
  getAllItems.forEach((item) => {
    const itemSublist = item.querySelector(`.js-subList`);
    const itemButton = item.querySelector(`.js-openSublist`);
    const itemName = item.querySelector(`.catalog-desktop__position`);

    itemButton.addEventListener(`click`, () => {
      itemSublist.classList.toggle(`js-isOpened`);
      itemName.classList.toggle(`js-isOpened`);
    })
  })
};

toggleCatalogList();
