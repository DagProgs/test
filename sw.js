const cacheName = 'latestNews-v1';
const offlineUrl = 'offline.html';

// Cache our known resources during install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll([
      './js/main.js',
      './js/article.js',
      './images/newspaper.svg',
      './css/site.css',
      './data/latest.json',
      './data/data-1.json',
      './article.html',
      './index.html',
      offlineUrl
    ]))
  );
});

function timeout(delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(new Response('', {
        status: 408,
        statusText: 'Request timed out.'
      }));
    }, delay);
  });
}

//Cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// Install event
self.addEventListener("install", (evt) => {
  //Cache the static pages
  evt.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// Activate event
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    //Get the cached keys and see if there is older version of cache
    caches.keys().then((keys) => {
      //Find and separate the old caches and delete them
      return Promise.all(
        keys
          .filter((key) => key !== cacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', function(event) {

  // Check for the googleapis domain
  if (/googleapis/.test(event.request.url)) {
    return event.respondWith(Promise.race([timeout(3000),fetch(event.request.url)]));
  }

  // Else process all other requests as expected
  return event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      }
      var requestToCache = event.request.clone();

      return fetch(requestToCache).then(
        function(response) {
          if(!response || response.status !== 200) {
            return response;
          }

          var responseToCache = response.clone();
          caches.open(cacheName)
          .then(function(cache) {
            cache.put(requestToCache, responseToCache);
          });

          return response;
        }
      ).catch(error => {
        // Check if the user is offline first and is trying to navigate to a web page
        if (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html')) {
          // Return the offline page
          return caches.match(offlineUrl);
        }
      });
    })
  );
});
