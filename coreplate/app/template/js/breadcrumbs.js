const setBreadCrumbsClasses = (breadCrumbClass) => {
  const getAllCrumbs = document.querySelectorAll(`.${breadCrumbClass}`);
  getAllCrumbs.forEach((crumb, i) => {
    if (i === 0) {
      crumb.classList.add(BreadcrumbEnum.BLUE);
    } else if (i === 1 || (i % 3 === 0 && i % 2 !== 0)) {
      crumb.classList.add(BreadcrumbEnum.ORANGE)
    } else if (i % 2 === 0 && i % 3 !== 0) {
      crumb.classList.add(BreadcrumbEnum.PURPLE)
    } else {
      crumb.classList.add(BreadcrumbEnum.BLUE)
    }
  })
};
setBreadCrumbsClasses(BreadcrumbEnum.ITEM);
