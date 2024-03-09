self.addEventListener('push', function(event) {
    const data = event.data.json();
  
    const options = {
      body: 'Приготовьтесь к выполнению намаза.',
    };
  
    event.waitUntil(
      self.registration.showNotification('Время для намаза!', options)
    );
  });
  