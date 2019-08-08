/* @TODO:
* пойдет, ебать
* */

'use strict';
(function () {
  if (!document.querySelector(`.items-slider__wrap`).classList.contains(`items-slider__wrap_type_one-row`)) {
    const itemsSlider = new Swiper('.items-slider__wrap', {
      slidesPerColumn: 2,
      spaceBetween: 20,
      slidesPerView: 8,
      watchOverflow: true,
      clickable: true,
      grabCursor: true,
      observer: true,

      breakpoints: {
        1440: {
          slidesPerView: 6,
        },
        1100: {
          slidesPerView: 5,
        },
        1000: {
          slidesPerView: 4,
          spaceBetween: 10
        },
        775: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        550: {
          slidesPerView:2,
          spaceBetween: 10,
          slidesPerColumn: 1,
        },
        330: {
          slidesPerView:1,
          spaceBetween: 10,
          slidesPerColumn: 1,
        }
      },
      navigation: {
        nextEl: '.items-slider__controls-item_right',
        prevEl: '.items-slider__controls-item_left'
      }
    })
  } else if (document.querySelector(`.items-slider__wrap`).classList.contains(`items-slider__wrap_type_one-row`)) {
    const itemsSlider = new Swiper('.items-slider__wrap', {
      slidesPerColumn: 1,
      spaceBetween: 20,
      slidesPerView: 8,
      watchOverflow: true,
      clickable: true,
      grabCursor: true,
      observer: true,

      breakpoints: {
        1440: {
          slidesPerView: 6,
        },
        1100: {
          slidesPerView: 5,
        },
        1000: {
          slidesPerView: 4,
          spaceBetween: 10
        },
        775: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        550: {
          slidesPerView:2,
          spaceBetween: 10,
        },
        330: {
          slidesPerView:1,
          spaceBetween: 10,
          slidesPerColumn: 1,
        }
      },
      navigation: {
        nextEl: '.items-slider__controls-item_right',
        prevEl: '.items-slider__controls-item_left'
      }
    })
  }
})();
