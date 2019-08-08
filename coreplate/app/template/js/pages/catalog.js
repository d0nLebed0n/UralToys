'use strict';


(function () {
  const slider = document.getElementById('form-range');
  const sliderMin = document.getElementById('input-min');
  const sliderMax = document.getElementById('input-max');
  const sliderValues = [sliderMin, sliderMax];
  const MIN_VALUE = parseInt(document.querySelector('.jsMinPrice').innerHTML);
  const MAX_VALUE = parseInt(document.querySelector('.jsMaxPrice').innerHTML);

  noUiSlider.create(slider, {
    start: [MIN_VALUE + MAX_VALUE / 3, MAX_VALUE - MAX_VALUE / 3],
    connect: true,
    range: {
      'min': MIN_VALUE,
      'max': MAX_VALUE
    }
  });

  slider.noUiSlider.on('update', function (values, handle) {
    sliderValues[handle].value = Math.round(values[handle]);
  });

  sliderValues.forEach(function (sliderValue, handle) {

    sliderValue.addEventListener('change', function () {
      stepsSlider.noUiSlider.setHandle(handle, this.value);
    });

    sliderValue.addEventListener('keydown', function (e) {
      const values = slider.noUiSlider.get();
      const value = Number(values[handle]);
      const steps = slider.noUiSlider.steps();
      const step = steps[handle];
      let position;
      switch (e.which) {
        case 13:
          slider.noUiSlider.setHandle(handle, this.value);
          break;
        case 38:
          position = step[1];
          if (position === false) {
            position = 1;
          }
          if (position !== null) {
            slider.noUiSlider.setHandle(handle, value + position);
          }
          break;
        case 40:
          position = step[0];
          if (position === false) {
            position = 1;
          }
          if (position !== null) {
            slider.noUiSlider.setHandle(handle, value - position);
          }
          break;
      }
    });
  });
})();

(function () {
  const filterCount = (props) => {
    const BRANDS_WRAP = document.querySelector(`.js-filterCount`);
    const ALL_BRANDS = document.querySelectorAll(`.js-filterCount .filter__item-label`);
    const BRAND_TO_ARR = Array.prototype.slice.call(ALL_BRANDS, 0);
    const TOGGLE_BUTTON = document.querySelector(`.filter__load-more`);
    const TOGGLE_BUTTON_COUNT = document.querySelector(`.js-count`);

    const sortBrands = () => {
      return BRAND_TO_ARR.sort((first, second) => {
        const getFirstCount = parseInt(first.querySelector(`.filter__item-count`).textContent);
        const getSecondCount = parseInt(second.querySelector(`.filter__item-count`).textContent);
        if (getFirstCount > getSecondCount) return 1;
        if (getFirstCount < getSecondCount) return -1;
        return 0;
      })
    };

    const renderBrands = (onCallback) => {
      const filteredArray = sortBrands();
      BRANDS_WRAP.innerHTML = '';

      filteredArray.forEach((item) => {
        BRANDS_WRAP.appendChild(item);
      });
      BRANDS_WRAP.appendChild(TOGGLE_BUTTON);
      onCallback();
    };

    const toggleBrands = () => {
      const currentArray = document.querySelectorAll(`.js-filterCount .filter__item-label`);
      const toggleClass = () => {
        return currentArray.forEach((item, index) => {
          if (index >= 4) {
            item.classList.toggle(`visually-hidden`);
          }
        });
      };

      toggleClass();
      TOGGLE_BUTTON_COUNT.innerHTML = `${currentArray.length}`;
      TOGGLE_BUTTON.addEventListener(`click`, toggleClass);

    };

    renderBrands(toggleBrands);
  };

  filterCount();
})();

(function () {
  const itemsSlider = new Swiper('.card__image-slider', {
    spaceBetween: 0,
    slidesPerView: 1,
    watchOverflow: true,
    clickable: true,
    grabCursor: true,
    observer: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })
})();
