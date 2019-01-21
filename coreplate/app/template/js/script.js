'use strict';
var Swiper = require('swiper');
(function () {
    var headerMobile = function () {
        var headerBurger = document.querySelector('.jsOpenMenu');
        var headerNav = document.querySelector('.jsMenu');
        var handleBurgerToggle = function () {
            if (headerBurger !== null && headerNav !== null) {
                headerBurger.classList.toggle('isOpened');
                headerNav.classList.toggle('isOpened');
                document.body.classList.toggle('overflow');
            }
            ;
        };
        if (headerBurger !== null && headerNav !== null) {
            headerBurger.addEventListener('click', handleBurgerToggle);
        }
        ;
    };
    var catalogRemove = function (itemToRemove) {
        if (itemToRemove !== null) {
            var parentsNodeList = document.querySelectorAll(itemToRemove + '_parent');
            parentsNodeList.forEach(function (item) {
                var itemFirstLink = item.querySelector('a');
                itemFirstLink.removeAttribute('href');
                itemFirstLink.style.pointerEvents = 'none';
            });
        }
    };
    var catalogList = function (itemToOpen, subList) {
        var itemsList = document.querySelectorAll(itemToOpen);
        if (itemsList !== null) {
            itemsList.forEach(function (item) {
                item.addEventListener('click', function (evt) {
                    var target = evt.target;
                    var itemSublist = item.querySelector(subList);
                    if (target === item && target !== null && target !== itemSublist) {
                        target = item;
                        item.classList.toggle('isActive');
                    }
                });
            });
        }
    };
    var toggleList = function (mainTab, sideTab, brandsTab) {
        var changeClasses = function (arr) {
            arr.forEach(function (element) {
                if (element.classList.contains('isActive') && element !== null) {
                    element.classList.remove('isActive');
                }
                else {
                    element.classList.add('isActive');
                    return;
                }
            });
        };
        changeClasses(mainTab);
        changeClasses(sideTab);
        changeClasses(brandsTab);
    };
    var openBrandList = function (index) {
        var brandTabs = document.querySelectorAll('.brands-navigation__list');
        brandTabs.forEach(function (brand, i) {
            brand.classList.remove('isActive');
            console.log(index);
            if (i === index && brand.parentNode.classList.contains('isActive')) {
                brand.classList.add('isActive');
            }
            ;
        });
    };
    var brandsNavigation = function (parentClass, childClass, tabsListWrapClass) {
        var parent = document.querySelectorAll(parentClass);
        var child = document.querySelectorAll(childClass);
        var brandsList = document.querySelectorAll(tabsListWrapClass);
        var childTab = document.querySelectorAll('.js-tab');
        parent.forEach(function (item) {
            item.addEventListener('click', function () {
                toggleList(parent, child, brandsList);
            });
        });
        childTab.forEach(function (child, index) {
            child.addEventListener('click', function (evt) {
                var target = evt.target;
                if (child === target) {
                    openBrandList(index);
                    return;
                }
            });
        });
    };
    document.addEventListener('DOMContentLoaded', function () {
        headerMobile();
        catalogRemove('.catalog-nav__item');
        catalogRemove('.aside-navigation__item');
        catalogList('.aside-navigation__item', '.aside-navigation__sublist');
        catalogList('.aside-filter__position', '.jsSublist');
        brandsNavigation('.js-core', '.brands-navigation__tabs', '.brands-navigation__wrapper');
        if (document.querySelector('.index-slider__wrap') !== null) {
            new Swiper('.index-slider__wrap', {
                slidesPerView: 1,
                spaceBetween: 0,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet: function (slider__control) {
                        return '<div class="' + slider__control + '"> <span class="slider__number"></span></div>';
                    },
                },
                autoplay: {
                    delay: 5600,
                },
                speed: 2000,
                loop: true,
                watchOverflow: true,
                parallax: true,
            });
        }
        if (document.querySelector('.main-catalog__wrap') !== null) {
            new Swiper('.main-catalog__wrap', {
                slidesPerView: 3,
                slidesPerColumn: 2,
                spaceBetween: 18,
                pagination: {
                    el: '.slider-buttons_main-catalog',
                    clickable: true,
                    renderBullet: function (slider__control) {
                        return '<div class="' + slider__control + '"> <span class="slider__number"></span></div>';
                    },
                },
                speed: 600,
                breakpoints: {
                    975: {
                        slidesPerView: 2,
                        slidesPerColumn: 2,
                        spaceBetween: 7,
                    },
                    479: {
                        slidesPerView: 1,
                        slidesPerColumn: 2,
                        spaceBetween: 5,
                    }
                }
            });
        }
        if (document.querySelector('.catalog-slider__wrap') !== null) {
            new Swiper('.catalog-slider__wrap', {
                slidesPerView: 4,
                slidesPerColumn: 2,
                slidesPerGroup: 8,
                spaceBetween: 17,
                pagination: {
                    el: '.slider-buttons_catalog',
                    clickable: true,
                    renderBullet: function (index, slider__control) {
                        return '<div class="slider-button slider-button_' + index + ' ' + slider__control + '"> <span class="slider__content"></span></div>';
                    },
                },
                speed: 600,
                breakpoints: {
                    1375: {
                        slidesPerView: 3,
                        slidesPerColumn: 3,
                        slidesPerGroup: 6,
                    },
                    975: {
                        slidesPerView: 2,
                        slidesPerColumn: 4,
                        slidesPerGroup: 2,
                    },
                    775: {
                        slidesPerView: 2,
                        slidesPerColumn: 4,
                        slidesPerGroup: 2,
                        spaceBetween: 5,
                    }
                }
            });
        }
        if (document.querySelector('.brands-slider__block') !== null) {
            new Swiper('.brands-slider__block', {
                slidesPerView: 6,
                spaceBetween: 16,
                navigation: {
                    nextEl: '.slider-right_brands',
                    prevEl: '.slider-left_brands',
                },
                speed: 600,
                breakpoints: {
                    1175: {
                        slidesPerView: 5,
                    },
                    975: {
                        slidesPerView: 4,
                    },
                    635: {
                        slidesPerView: 3,
                    },
                    479: {
                        slidesPerView: 2,
                    }
                }
            });
        }
    });
})();
