  self.addEventListener('push', function(event) {
    event.waitUntil(
      fetch('prayer-times.json')
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          const currentDate = new Date();
          const currentDay = currentDate.getDate();
          const currentMonth = currentDate.getMonth() + 1; 
          const prayTimes = data["3"]["25"][currentMonth][currentDay]; 
          
          const currentHour = currentDate.getHours();
          const currentMinute = currentDate.getMinutes();
  
          let prayerName = '';
          let prayerTime = [];
  
          for (let prayer in prayTimes) {
            let prayerHour = prayTimes[prayer][0];
            let prayerMinute = prayTimes[prayer][1];
  
            if (currentHour === prayerHour && currentMinute === prayerMinute) {
              prayerName = prayer;
              prayerTime = [prayerHour, prayerMinute];
              break;
            }
          }
  
          if (prayerName) {
            const options = {
              body: `Пора на ${prayerName}!`,
              icon: 'assets/icons/icon-192x192.png',
              badge: 'assets/icons/badge.png'
            };
  
            self.registration.showNotification(`Пора на ${prayerName}!`, options);
          }
        })
    );
  });
  
  self.addEventListener('activate', function(event) {
    setInterval(function() {
      self.dispatchEvent(new PushEvent('push'));
    }, 60000); // Проверка каждую минуту
  });
  