import {CountUp} from "../../libs/countUp.min.js";
/* @TODO:
* Разбить на нативные модули
* Снести IIFE
* */
(function () {
  const getAllCounts = document.querySelectorAll(`.js-counter`);
  const countWrapper = document.querySelector(`.about__features-wrap`);

  const easingFn = (t, b, c, d) => {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  };

  const countOptions = {
    duration: 9,
    easingFn,
  };

  let flag = true;

  const countFn = () => {
    if (window.utils.checkVisibility(countWrapper) && flag) {
      flag = !flag;
      getAllCounts.forEach((item) => {
        const countUp = new CountUp(item, parseInt(item.textContent), countOptions);
        countUp.start();
      })
    }
  };
  countFn();
  document.addEventListener(`scroll`, () => {
    countFn();
  })
})();
