'use strict';
(function () {
  const itemsSlider = new Swiper('.items-slider__wrap', {
    slidesPerColumn: 2,
    spaceBetween: 20,
    slidesPerView: 8,
    watchOverflow: true,
    clickable: true,
    grabCursor: true,
    observer: true,
    navigation: {
      nextEl: '.items-slider__controls-item_right',
      prevEl: '.items-slider__controls-item_left'
    }
  })
})();
