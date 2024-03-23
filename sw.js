self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    console.log('Notification clicked');
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      fetch(event.request)
    );
  });
  