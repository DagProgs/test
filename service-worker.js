const CACHE_NAME = 'myPWA-cache-v1';
const offlinePage = '/offline.html';

self.addEventListener('install', event => {
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll([offlinePage]); // Кэширование страницы по умолчанию
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    // Удаление устаревших кэшей, если они есть
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name.startsWith('myPWA-cache-') && name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request) // Возвращаем ответ из кэша или из сети
          .catch(() => caches.match(offlinePage)); // Возвращаем страницу по умолчанию в случае ошибки
      })
  );
});
