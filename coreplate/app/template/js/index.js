'use strict';

(function () {
  const SliderEnum = {
    sideSlideClass: 'index-slider__item_context_outside',
    sideSlideMinText: 'index-slider__item-title_min',
    insideSlideClass: 'index-slider__item_context_inside',
    swiperClass: 'swiper-slide',
    insideSlideFront: 'index-slider__item-front',
    plasterClassName: 'index-slider__item-plaster_blue',

  };
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

    if (window.matchMedia("(max-width:1440px)").matches === true) {
      switch (setFlag) {
      case 0:
        const itemToDetach = itemsList[itemsList.length - increase];
        increase++;
        setFlag = 1;
        wrapper.appendChild(itemToDetach);
        itemToDetach.classList.remove(SliderEnum.sideSlideClass);
        itemToDetach.classList.add(SliderEnum.insideSlideClass, SliderEnum.swiperClass);
        itemToDetach.classList.add(SliderEnum.insideSlideFront);
        itemToDetach.querySelector('.index-slider__item-plaster').classList.add('index-slider__item-plaster_blue');
        itemToDetach.querySelector('.index-slider__item-plaster').classList.remove('index-slider__item-plaster_white');
        changeSlide(itemToDetach, '.index-slider__item-plaster_min', 'plaster');
        changeSlide(itemToDetach, '.index-slider__item-title_min', 'title');
        changeSlide(itemToDetach, '.index-slider__item-subtitle_min', 'subtitle');
        break;
      default:
        return null;
      }
    }

    if (window.matchMedia("(max-width:1144px)").matches === true) {
      switch (setFlag) {
        case 1:
          const itemToDetach = itemsList[itemsList.length - increase];
          increase++;
          setFlag = 4;
          wrapper.appendChild(itemToDetach);
          itemToDetach.classList.remove(SliderEnum.sideSlideClass);
          itemToDetach.classList.add(SliderEnum.insideSlideClass, SliderEnum.swiperClass);
          itemToDetach.classList.add(SliderEnum.insideSlideFront);
          itemToDetach.querySelector('.index-slider__item-plaster').classList.add('index-slider__item-plaster_blue');
          itemToDetach.querySelector('.index-slider__item-plaster').classList.remove('index-slider__item-plaster_white');
          changeSlide(itemToDetach, '.index-slider__item-plaster_min', 'plaster');
          changeSlide(itemToDetach, '.index-slider__item-title_min', 'title');
          changeSlide(itemToDetach, '.index-slider__item-subtitle_min', 'subtitle');
          break;
        default:
          return null;
      }
    }

    if (window.matchMedia("(max-width:775px)").matches === true) {
      switch (setFlag) {
        case 4:
          const itemToDetach = itemsList[itemsList.length - increase];
          setFlag = 6;
          wrapper.appendChild(itemToDetach);
          itemToDetach.classList.remove(SliderEnum.sideSlideClass);
          itemToDetach.classList.add(SliderEnum.insideSlideClass, SliderEnum.swiperClass);
          itemToDetach.classList.add(SliderEnum.insideSlideFront);
          itemToDetach.querySelector('.index-slider__item-plaster').classList.add('index-slider__item-plaster_blue');
          itemToDetach.querySelector('.index-slider__item-plaster').classList.remove('index-slider__item-plaster_white');
          changeSlide(itemToDetach, '.index-slider__item-plaster_min', 'plaster');
          changeSlide(itemToDetach, '.index-slider__item-title_min', 'title');
          changeSlide(itemToDetach, '.index-slider__item-subtitle_min', 'subtitle');
          break;
        default:
          return null;
      }
    }
  };


  const indexSlider = new Swiper('.js-appendBody', {
    slidesPerView: 1,
    watchOverflow: true,
    effect: 'flip',
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
