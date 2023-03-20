var cacheName = 'secondVersion6';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        './index.html',
		'./js/dayruznama.js',
		'./js/jquery-3.6.0.min.js',
		'./js/db/ruznama_k.db',
		'./css/style.css'
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


// вызов модального окна
const askUserToUpdate = reg => {
  return Modal.confirm({
    onOk: async () => {
      // вешаем обработчик изменения состояния
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });

      // пропускаем ожидание 
      if (reg && reg.waiting) {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    },

    onCancel: () => {
      Modal.destroyAll();
    },
    icon: null,
    title: 'Хорошие новости! ? ',
    content:
      'Мы только что обновили версию приложения! Чтобы получить обновления, нажмите на кнопку ниже (страница перезагрузится)',
    cancelText: 'Не обновлять',
    okText: 'Обновить'
  });
};

// проверка регистрации
const registerValidSW = (swUrl, config) => {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      if (registration.waiting) {
        // оброботчик SW в ожидании
        askUserToUpdate(registration);
      }
    ...
