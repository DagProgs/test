var cacheName = 'Ver2';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
    './index.html',
	'./',
    './offline.html',
	'./css/menu.css',
	'./css/style.css',
    './js/app.js',
    './js/ar.js',
	'./js/jquery.hijri.date.min.js',
	'./js/jquery-3.6.0.min.js',
	'./js/clock.js',
	'./js/dayruznama.js',
	'./js/menu.js',
	'./js/mount.js',
	'./js/ru.js',
	'./js/script.js.js'
      ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});