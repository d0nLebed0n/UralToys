'use strict';

/* @TODO:
* переписать
* */

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
