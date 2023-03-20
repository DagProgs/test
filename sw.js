'use strict';
importScripts('/sw-toolbox.js');
//перечисление файлов, которые можно кэшировать
toolbox.precache([
'/index.html'
]);
toolbox.router.get('/img/images/*', toolbox.cacheFirst);
toolbox.router.get('/*', toolbox.networkFirst, { networkTimeoutSeconds: 5 });