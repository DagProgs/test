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
    "revision": "ccb5ea7bf2478ee060d0fb268885f9e3"
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

// API with network-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)timeline/,
  workbox.strategies.networkFirst()
)

// API with cache-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)favorites/,
  workbox.strategies.cacheFirst()
)

// OTHER EVENTS

// Загрузка данных из файла prayer-times.json
fetch('js/json/prayer-times.json')
.then(response => response.json())
.then(data => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const todayPrayerTimes = data[currentMonth][currentDay];

    const prayerNames = {
        "Fajr": "Фаджр",
        "Sunrise": "Шурук",
        "Dhuhr": "Зухр",
        "Asr": "Аср",
        "Maghrib": "Магриб",
        "Isha": "Иша"
    };

    // Функция для отправки push уведомления
    async function sendPushNotification(time) {
        const options = {
            body: `Время для намаза ${prayerNames[time]}`,
            icon: 'path/to/icon.png'
        };

        await self.registration.showNotification('Название вашего приложения', options);
    }

    // Функция для сохранения уведомлений в IndexedDB
    async function saveNotificationToIndexedDB() {
        // Логика сохранения уведомлений
    }

    // Background Sync
    self.addEventListener('sync', event => {
        if (event.tag === 'prayer-notification-sync') {
            event.waitUntil(sendSavedNotifications());
        }
    });

    async function sendSavedNotifications() {
        const storedNotifications = await getStoredNotificationsFromIndexedDB();

        storedNotifications.forEach(notification => {
            sendPushNotification(notification.time);
        });

        await clearStoredNotificationsFromIndexedDB();
    }

    async function getStoredNotificationsFromIndexedDB() {
        // Логика получения данных из IndexedDB
    }

    async function clearStoredNotificationsFromIndexedDB() {
        // Логика удаления данных из IndexedDB
    }

    // Обновление цвета времени намаза и отправка уведомлений
    function updatePrayerTimeColor() {
        const currentTime = new Date();
        const currentTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
      
        for (const time in todayPrayerTimes) {
            const hour = todayPrayerTimes[time][0];
            const minute = todayPrayerTimes[time][1];
            const prayerTotalMinutes = hour * 60 + minute;
      
            if (currentTotalMinutes === prayerTotalMinutes) {
                saveNotificationToIndexedDB({ time });
            }

            // Другая логика по обновлению цвета времени намаза
        }
    }

    // Вызов функции для обновления цвета каждые 10 секунд
    updatePrayerTimeColor(); // Сначала выполнить функцию один раз при загрузке страницы
    setInterval(updatePrayerTimeColor, 10000); // каждые 10 секунд (10000 миллисекунд)

})
.catch(error => console.error('Ошибка загрузки данных:', error));

