const staticCacheName = 's-app-v0'
const dynamicCacheName = 'd-app-v0'

const assetUrls = [
    'index.html',
    'offline.html',
	'/css/font-awesome.min.css',
	'/css/index.css',
	'/css/RuznamaKurakh_end.css',
    '/js/app.js',
    '/js/main.js',
	'/js/jquery.hijri.date.min.js',
	'/js/jquery-3.6.0.min.js',
	'/js/jquery-ui.min.js',
	'/js/dayruznama.js',
	'/js/script.js.js',
	'/js/wwb18.min.js',
    '/images/no-image.jpg'
]

self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName)
  await cache.addAll(assetUrls)
})

self.addEventListener('activate', async event => {
  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName)
      .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', event => {
  const {request} = event

  const url = new URL(request.url)
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request))
  } else {
    event.respondWith(networkFirst(request))
  }
})


async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? await fetch(request)
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName)
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (e) {
    const cached = await cache.match(request)
    return cached ?? await caches.match('/offline.html')
  }
}




const staticCacheName = 'static-kurahruznama-v2';
const dynamicCacheName = 'dynamic-kurahruznama-v2';

const staticAssets = [
	'./',
    './index.html',
    './offline.html',
	'./css/font-awesome.min.css',
	'./css/index.css',
	'./css/RuznamaKurakh_end.css',
    './js/app.js',
    './js/main.js',
	'./js/jquery.hijri.date.min.js',
	'./js/jquery-3.6.0.min.js',
	'./js/jquery-ui.min.js',
	'./js/dayruznama.js',
	'./js/script.js.js',
	'./js/wwb18.min.js',
    './images/no-image.jpg'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(staticAssets);
    console.log('Service worker has been installed');
});

self.addEventListener('activate', async event => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (![staticCacheName, dynamicCacheName].includes(key)) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', event => {
    console.log(`Trying to fetch ${event.request.url}`);
    event.respondWith(checkCache(event.request));
});

async function checkCache(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || checkOnline(req);
}

async function checkOnline(req) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const res = await fetch(req);
        await cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedRes = await cache.match(req);
        if (cachedRes) {
            return cachedRes;
        } else if (req.url.indexOf('.html') !== -1) {
            return caches.match('./offline.html');
        } else {
            return caches.match('./images/no-image.jpg');
        }
    }
}