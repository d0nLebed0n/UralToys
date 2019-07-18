'use strict';

(function () {
  let setFlag = 0;
  let increase = 1;

  const changeSlide = (nodeParent, node, token) => {
    nodeParent.querySelectorAll(node).forEach(function (item) {
      item.classList.remove('index-slider__item-' + token + '_min');
    })
  };

  const detachSlider = (slidesList, wrapperList) => {
    const itemsList = document.querySelectorAll(slidesList);
    const wrapper = document.querySelector(wrapperList);
    const detachItems = function (flagValue) {
      const itemToDetach = itemsList[itemsList.length - increase];
      increase++;
      setFlag = flagValue;
      wrapper.appendChild(itemToDetach);
      itemToDetach.classList.remove(SliderEnum.sideSlideClass);
      itemToDetach.classList.add(SliderEnum.insideSlideClass, SliderEnum.swiperClass);
      itemToDetach.classList.add(SliderEnum.insideSlideFront);
      itemToDetach.querySelector('.index-slider__item-plaster').classList.add('index-slider__item-plaster_blue');
      itemToDetach.querySelector('.index-slider__item-plaster').classList.remove('index-slider__item-plaster_white');
      changeSlide(itemToDetach, '.index-slider__item-plaster_min', 'plaster');
      changeSlide(itemToDetach, '.index-slider__item-title_min', 'title');
      changeSlide(itemToDetach, '.index-slider__item-subtitle_min', 'subtitle');
    };

    if (window.matchMedia("(max-width:1440px)").matches === true && setFlag === 0) {
      detachItems(1);
    }
    if (window.matchMedia("(max-width:1144px)").matches === true && setFlag === 1) {
      detachItems(4);
    }
    if (window.matchMedia("(max-width:775px)").matches === true && setFlag === 4) {
      detachItems(6);
    }
  };

  const indexSlider = new Swiper('.js-appendBody', {
    slidesPerView: 1,
    watchOverflow: true,
    clickable: true,
    grabCursor: true,
    observer: true,
    pagination: {
      el: '.swiper-pagination',
    },

  });
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
  document.addEventListener('DOMContentLoaded', () => {
    detachSlider('.index-slider__item_context_outside', '.js-appendBody .swiper-wrapper');
  });
  indexSlider.on('resize',  () => {
    detachSlider('.index-slider__item_context_outside', '.js-appendBody .swiper-wrapper');
  });
})();
