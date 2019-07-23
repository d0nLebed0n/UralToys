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

const SliderEnum = {
  sideSlideClass: 'index-slider__item_context_outside',
  sideSlideMinText: 'index-slider__item-title_min',
  insideSlideClass: 'index-slider__item_context_inside',
  swiperClass: 'swiper-slide',
  insideSlideFront: 'index-slider__item-front',
  plasterClassName: 'index-slider__item-plaster_blue',
};

const MobileEnum = {
  MENU_SUB_WRAPPER:  document.querySelector('.js-detachElements'),
  TOP_MENU_NAVIGATION:  document.querySelector('.header__top-list'),
  MAIN_NAVIGATION: document.querySelector('.js-mainMenu'),
  SEARCH: document.querySelector('.search'),
  ACTIVE_CLASS: 'js-isActive',
  OVERFLOWED_CLASS: 'js-overFlowed',
  BURGER_CLASS: '.js-openMobile',
  MENU_CLASS: '.js-mobileWrapper',
  OVERLAY_CLASS: '.js-mobileOverlay',
  CLOSE_CLASS: '.js-closeMenu'
};

const BreadcrumbEnum = {
  ITEM: `breadcrumbs__item`,
  BLUE: `breadcrumbs__item_blue`,
  ORANGE: `breadcrumbs__item_orange`,
  PURPLE: `breadcrumbs__item_purple`,
};
