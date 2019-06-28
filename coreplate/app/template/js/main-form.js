'use strict';
(function () {
  $('.js-isSelectric').selectric({
    inheritOriginalWidth: true,
    arrowButtonMarkup: `<div class="text-input__arrow">
                            <svg viewBox="0 0 8 8" class="text-input__icon">
                                <path xmlns="http://www.w3.org/2000/svg" d="M2.6 0.544L3.528 3.36L4.28 5.52L4.344 5.52L5.096 3.36L6.024 0.544L7.96 0.544L5.128 7.904L3.496 7.904L0.664 0.543999L2.6 0.544Z"></path>
                            </svg>
                        </div>`,
    responsive: true
  })
})();

(function () {
  /*
        Инициализация ренж-слайдера
     */
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
