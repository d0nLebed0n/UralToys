'use strict';
// Эту зависимость закомментить в script.js
var Swiper = require('swiper');
////

(function () {
	var headerMobile = function () {
		var headerBurger = document.querySelector('.jsOpenMenu');
		var headerNav = document.querySelector('.jsMenu');
		var handleBurgerToggle = function () {
			if (headerBurger !== null && headerNav !== null) {
				headerBurger.classList.toggle('isOpened');
				headerNav.classList.toggle('isOpened');
				document.body.classList.toggle('overflow');
			};
		}
		if (headerBurger !== null && headerNav !== null) {
			headerBurger.addEventListener('click', handleBurgerToggle);
		};
	}
	var handleTogglePopup = function (currentButton:string) {
		var targetPopup:any;

		if (currentButton !== null) {
		    targetPopup = document.querySelector(currentButton);
		}

		targetPopup.addEventListener('click', function () {
			var dataPopup = targetPopup.getAttribute('data-target');

			var searchPopup = document.querySelector('' + dataPopup + '');

			if (searchPopup !== null) {
				searchPopup.classList.toggle('isShowed');
				document.body.classList.toggle('overflow');
			}
		})


	};
	var handleClosePopup = function (crossClassName:string) {
		var crossItem = document.querySelector(crossClassName);

		if (crossItem !== null) {
			crossItem.addEventListener('click', function () {
				var activePopup = document.querySelector('.popup.isShowed');
				if (activePopup !== null) {
					activePopup.classList.remove('isShowed');
					document.body.classList.toggle('overflow');
				}
			})
		}
	}

	var toggleFilter = function () {
		var jsOpenFilter = document.querySelector('.jsOpenFilter');
		var jsCloseFilter = document.querySelector('.jsCloseFilter');
		var jsFilter = document.querySelector('.jsFilterAppend');
		var handleFilterToggle = function () {
			if (jsOpenFilter !== null && jsFilter !== null && jsCloseFilter !== null) {
				jsFilter.classList.toggle('isActive');
				document.body.classList.toggle('overflow');
			};
		}
		if (jsOpenFilter !== null && jsCloseFilter !== null) {
			jsOpenFilter.addEventListener('click', handleFilterToggle);
			jsCloseFilter.addEventListener('click', handleFilterToggle);
		};
	}
	var catalogRemove = function (itemToRemove:string) {
	    if(itemToRemove !== null) {
			var parentsNodeList = document.querySelectorAll(itemToRemove + '_parent');
			parentsNodeList.forEach(function (item:any) {
				var itemFirstLink = item.querySelector('a');
				itemFirstLink.removeAttribute('href');
				itemFirstLink.style.pointerEvents = 'none';
			})
		}
	};
	var catalogList = function (itemToOpen:string, subList:string) {
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
			    })
			})
		}
	}
	var toggleList = function (mainTab:NodeList, sideTab:NodeList, brandsTab:NodeList) {
		var changeClasses = function (arr:any) {
			arr.forEach(function (element:any) {
				if (element.classList.contains('isActive') && element !== null) {
					element.classList.remove('isActive')
				} else {
					element.classList.add('isActive');
					return;
				}
			})
		  }

		changeClasses(mainTab);
		changeClasses(sideTab);
		changeClasses(brandsTab);
	};
	var openBrandList = function (index:number, multiListRow:any) {
		var brandTabs = document.querySelectorAll(multiListRow);
		brandTabs.forEach(function (brand:any, i:number) {
			brand.classList.remove('isActive');
		   	if (i === index && brand.parentNode.classList.contains('isActive')) {
		   	    brand.classList.add('isActive');
		   	};
		})
	}
	var multiTabsNavigation = function (multiTabsNode:any, multiListRow:any) {
		var tabsRow = document.querySelectorAll(multiTabsNode);
		tabsRow.forEach(function (child:any, index:number) {
			child.addEventListener('click', function (evt:Event) {
				tabsRow.forEach(function (removeClassItem) {
				    removeClassItem.classList.remove('isActive')
				})
				var target = evt.target;
				if (child === target) {
					child.classList.add('isActive');
					openBrandList(index, multiListRow);
				}
			})
		})
	}
	var brandsNavigation = function (parentClass:string, childClass:string, tabsListWrapClass:string) {

		var parent = document.querySelectorAll(parentClass);
		var child = document.querySelectorAll(childClass);
		var brandsList = document.querySelectorAll(tabsListWrapClass);

	    parent.forEach(function (item:any) {
	        item.addEventListener('click', function () {
	            toggleList(parent, child, brandsList);
	        })
	    });
	}

	var mobileFilter = function () {
	    var breakpoint = window.matchMedia('(max-width: 775px)');
		var appendFilter = function (toMobile:boolean) {
			var filter:any = document.querySelector('.aside-filter');
			var mobileBlock = document.querySelector('.jsFilterAppend');
			var filterSideBlock = document.querySelector('.aside');
			if (filter !== null && mobileBlock !== null && toMobile === true) {
			    mobileBlock.appendChild(filter);

			} else if (toMobile === false && filterSideBlock !== null && filter !== null) {
				filterSideBlock.insertBefore(filter, document.querySelector('.aside-navigation'));
			}
		}
		var status:boolean;
		var toMobile:boolean;
		var handleConditionSize = function () {
			if (breakpoint.matches === true && document.body.clientWidth <= 775 && status !== true) {
				status = true;
				toMobile = true;
				appendFilter(toMobile);
			} else if (breakpoint.matches !== true && document.body.clientWidth >= 775 && document.body.clientWidth <= 1375 && status !== false) {
				status = false;
				toMobile = false;
				appendFilter(toMobile);
			}
		}
		window.addEventListener('resize', handleConditionSize);
		window.addEventListener('load', handleConditionSize);

	}

	var counterCatalog = function () {
		var counter = document.querySelector('.counter');
		var counterMinus = document.querySelector('.minus');
		var counterPlus = document.querySelector('.plus');
		var count:any = document.querySelector('.count');

		if (counter !== null && counterPlus !== null && counterMinus !== null && count !== null) {
			counterMinus.addEventListener('click', function () {
				var totalCount = parseInt(count.value);
				if (totalCount > 1) {
				    totalCount = totalCount - 1;

					count.value = totalCount;
				}
			})

			counterPlus.addEventListener('click', function () {
				var totalCount = parseInt(count.value);

				totalCount = totalCount + 1;

				count.value = totalCount;
			})
		}
	}


	document.addEventListener('DOMContentLoaded', function () {
	    headerMobile();
		mobileFilter();
		toggleFilter();

		counterCatalog();

		catalogRemove('.catalog-nav__item');
		catalogRemove('.aside-navigation__item');

		catalogList('.aside-navigation__item', '.aside-navigation__sublist');
		catalogList('.aside-filter__position', '.jsSublist');
		brandsNavigation('.js-core', '.brands-navigation__tabs', '.brands-navigation__wrapper');

		multiTabsNavigation('.js-tab', '.brands-navigation__list');
		multiTabsNavigation('.props-table__tab', '.props-table__list');

		handleTogglePopup('.jsCallback')
		handleClosePopup('.jsClosePopup')
		if (document.querySelector('.index-slider__wrap') !== null) {
			new Swiper ('.index-slider__wrap', {
				slidesPerView: 1,
				spaceBetween: 0,
				pagination: {
					el: '.slider-buttons_index',
					clickable: true,
					renderBullet: function (index: any, slider__control: any) {
					return '<div class="' + slider__control + ' slider-orange-button "> <span class="slider__number"></span></div>';
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
			new Swiper ('.main-catalog__wrap', {
				slidesPerView: 3,
		        slidesPerColumn: 2,
				spaceBetween: 18,
				pagination: {
					el: '.slider-buttons_main-catalog',
					clickable: true,
					renderBullet: function (index: any, slider__control: any) {
					return '<div class="' + slider__control + ' slider-orange-button "> <span class="slider__number"></span></div>';
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
			new Swiper ('.catalog-slider__wrap', {
				slidesPerView: 4,
				slidesPerColumn: 2,
				slidesPerGroup: 8,
				spaceBetween: 17,
				pagination: {
					el: '.slider-buttons_catalog',
					clickable: true,
					renderBullet: function (index: any, slider__control: any) {
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
			new Swiper ('.brands-slider__block', {
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
		if (document.querySelector('.card-detail__min') !== null) {
			var gallery = new Swiper ('.card-detail__min', {
				spaceBetween: 13,
		        slidesPerView: 4,
				breakpoints: {
					1175: {
						slidesPerView: 3,
					},
					635: {
						slidesPerView: 2,
					},
				}
			});
		}
		if (document.querySelector('.card-detail__big') !== null) {
			new Swiper ('.card-detail__big', {
				spaceBetween: 0,
				thumbs: {
		          swiper: gallery,
		        },
			});
		}
	});
})();
