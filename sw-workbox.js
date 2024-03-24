importScripts('workbox-v4.3.0/workbox-sw.js');

// SETTINGS

// Path prefix to load modules locally
workbox.setConfig({
  modulePathPrefix: 'workbox-v4.3.0/'
});

// Turn on logging
workbox.setConfig({
  debug: true
});

// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// PRECACHING

// We inject manifest here using "workbox-build" in workbox-build-inject.js
workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "70039343aaab47e8cec0dab479b57df6"
  },
  {
    "url": "css/style.css",
    "revision": "216600c441ddbcb5c532c38ed5674e0b"
  },
  {
    "url": "main.js",
    "revision": "2676aa2c3d7a9eb04f238bf700c3c7d3"
  },
  {
    "url": "js/calendar-ar.js",
    "revision": "354b6295d66a7a9fb054ee57f3c7001a"
  },
  {
    "url": "js/calendar-ru.js",
    "revision": "a00564cbe2169a01b57b03b148cfb6fa"
  },
  {
    "url": "js/clock.js",
    "revision": "59cec707bbaf501a5fd944e9b573b62e"
  },
  {
    "url": "js/jquery-3.6.0.min.js",
    "revision": "0732e3eabbf8aa7ce7f69eedbd07dfdd"
  },
  {
    "url": "js/line-timer.js",
    "revision": "b3305349138e5e3c0fbabc094f3e8a8d"
  },
  {
    "url": "js/prayer-days.js",
    "revision": "70fe03d94140ba637b638ad0545f9058"
  },
  {
    "url": "js/prayer-times-mounths.js",
    "revision": "7ed9d0e8bc6545156595e8fbd36cd55c"
  },
  {
    "url": "js/pwacompat.min.js",
    "revision": "038770ef3eb91f3e8a50a3916cb7cf28"
  },
  {
    "url": "assets/icons/icon-128x128.png",
    "revision": "25c8eb241d5e0c913da717f6007736b2"
  },
  {
    "url": "assets/icons/icon-144x144.png",
    "revision": "6e606e6871ccc1fdc7222dee1d72d42e"
  },
  {
    "url": "assets/icons/icon-152x152.png",
    "revision": "33b8202ee77c28c332a4fa3efee61d34"
  },
  {
    "url": "assets/icons/icon-192x192.png",
    "revision": "c5d401eb140c47f0d0a1b8880b5c8b49"
  },
  {
    "url": "assets/icons/icon-384x384.png",
    "revision": "47f069d621e0e363d1f0b560be4335dc"
  },
  {
    "url": "assets/icons/icon-512x512.png",
    "revision": "84f212482ada6ec3913a2a76d4b89c0d"
  },
  {
    "url": "assets/icons/icon-72x72.png",
    "revision": "9c82c0475577731db0e52b9fa62e8c05"
  },
  {
    "url": "assets/icons/icon-96x96.png",
    "revision": "9815fb3c4b57df1e8cda23d01fc66078"
  }
]);

// RUNTIME CACHING

// Google fonts
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      })
    ]
  })
);

// OTHER EVENTS

// Receive push and show a notification
self.addEventListener('push', function(event) {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/assets/icons/icon-192x192.png'
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Обработка клика на уведомлении
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('https://dagprogs.github.io/test/'));
});

// Получаем времена намазов из файла prayer-times.json
fetch('js/json/prayer-times.json')
  .then(response => response.json())
  .then(data => {
    const prayerTimes = data; // Данные времен намазов из файла

    // Функция для проверки времени намаза и отправки уведомлений
    function checkPrayerTimeAndNotify() {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
      const totalCurrentMinutes = currentHour * 60 + currentMinutes;

      for (const prayerTime in prayerTimes) {
        const prayerHour = prayerTimes[prayerTime].hour;
        const prayerMinutes = prayerTimes[prayerTime].minute;
        const totalPrayerMinutes = prayerHour * 60 + prayerMinutes;

        if (totalCurrentMinutes >= totalPrayerMinutes && totalCurrentMinutes < (totalPrayerMinutes + 10)) {
          const notificationOptions = {
            body: `Сейчас время для ${prayerTime}`,
            icon: 'assets/icons/icon-192x192.png'
          };
          self.registration.showNotification('Наступило время намаза', notificationOptions);
          break; // Прерываем цикл после отправки уведомления
        }
      }
    }

    // Вызов функции для проверки времени намаза и отправки уведомлений каждые минуту
    setInterval(checkPrayerTimeAndNotify, 60000); // Проверка каждую минуту

  })
  .catch(error => console.error('Ошибка загрузки времен намазов:', error));
