'use strict';
/* @TODO:
* -
* */

/* eslint-disable */

var init = function init(points, divId) {
  ymaps.ready(function () {
    var myMap;
    myMap = new ymaps.Map("map", {
      center: [55.65, 37.63],
      zoom: 16,
      controls: ['zoomControl']
    });

    var myCollection = new ymaps.GeoObjectCollection();

    var _loop = function _loop(i) {
      var point = points[i];

      // Создаем балуны для каждой точки
      var createBalloonContent = function createBalloonContent() {
        // Заголовок
        var summaryHTML = '<div class="map__balloonHeader">' + point.name + '</div>';

        // Телефон
        if (Array.isArray(point.phone)) {
          point.phone.forEach(function (item) {
            summaryHTML += '<div class="map__balloonPhone">' + item + '</div>';
          });
        } else {
          summaryHTML += '<div class="map__balloonPhone">' + point.phone + '</div>';
        }

        // E-mail
        if (Array.isArray(point.email)) {
          point.email.forEach(function (item) {
            summaryHTML += '<div class="map__balloonEmail"><b>E-mail: </b>' + item + '</div>';
          });
        } else {
          summaryHTML += '<div class="map__balloonEmail"><b>E-mail: </b>' + point.email + '</div>';
        }

        // Адрес склада
        summaryHTML += '<div class="map__balloonAddress map__balloonAddress_storage"><b>Адрес склада: </b>' + point.addressStorage + '</div>';

        // Адрес офиса
        summaryHTML += '<div class="map__balloonAddress map__balloonAddress_office"><b>Адрес офиса: </b>' + point.addressOffice + '</div>';

        return summaryHTML;
      };

      myCollection.add(new ymaps.Placemark(point.coords, {
        balloonContent: createBalloonContent()
      }, {
        iconLayout: 'default#image',
        iconImageHref: '/template/img/map_mark.png',
        iconImageSize: [40, 40],
        iconImageOffset: [-40, -40],
        hideIconOnBalloonOpen: false,
        balloonOffset: [0, -40],
        balloonMaxWidth: 245
      }));
    };

    for (var i = 0; i < points.length; i++) {
      _loop(i);
    }

    myMap.geoObjects.add(myCollection);

    if (points.length > 1) {
      myMap.setBounds(myCollection.getBounds());
    } else {
      myMap.setCenter(points[0].coords);
    }

    var isMobile = function isMobile() {
      var regs = [/Android/i, /BlackBerry/i, /iPhone|iPad|iPod/i, /Opera Mini/i, /IEMobile/i];
      var result = false;

      regs.forEach(function (item) {
        if (navigator.userAgent.match(item)) {
          result = true;
        };
      });

      return result;
    };

    if (isMobile()) {
      myMap.behaviors.disable('drag');
      myCollection.options.set({ hasBalloon: false });
    }

    // Изменение иконки при ховере и открытии балуна
    var isBalloonOpened = false;
    var setNewIcon = function setNewIcon(e) {
      e.get('target').options.set('iconImageHref', '/template/img/map_mark.png');
    };

    var setDefaultIcon = function setDefaultIcon(e) {
      e.get('target').options.set('iconImageHref', '/template/img/map_mark.png');
    };

    myCollection.events.add('mouseenter', function (e) {
      return setNewIcon(e);
    }).add('mouseleave', function (e) {
      if (!isBalloonOpened) setDefaultIcon(e);
    }).add('balloonopen', function (e) {
      isBalloonOpened = true;
      setNewIcon(e);
    }).add('balloonclose', function (e) {
      isBalloonOpened = false;
      setDefaultIcon(e);
    });
  })
};
