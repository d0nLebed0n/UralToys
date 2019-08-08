
/* @TODO:
* Разбить на нативные модули
* Снести IIFE
* Подтянуть импортом все классы и инициализировать
* */
(function () {
  const brandsSLider = new Swiper('.single-column-slider__wrap', {
    slidesPerView: 10,
    spaceBetween: 74,
    breakpoints: {
      1440: {
        slidesPerView: 8,
        spaceBetween: 52,
      },
      1100: {
        slidesPerView: 6,
        spaceBetween: 52,
      },
      1000: {
        slidesPerView: 4,
        spaceBetween: 52,
      },
      635: {
        slidesPerView:3,
        spaceBetween: 52,
      },
      550: {
        slidesPerView:3,
        spaceBetween: 27,
      }
    },
    navigation: {
      nextEl: '.single-column-slider__controls-item_right',
      prevEl: '.single-column-slider__controls-item_left'
    }
  })
})();
