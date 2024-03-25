self.addEventListener('push', function(event) {
    event.waitUntil(
      fetch('prayer-times.json')
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          const currentDate = new Date();
          const currentDay = currentDate.getDate();
          const currentMonth = currentDate.getMonth() + 1; // Месяцы в JavaScript начинаются с 0 - 11
          const prayTimes = data["3"]["25"][currentMonth][currentDay]; // Получаем времена намаза для текущего дня и месяца
          
          const currentTime = new Date();
          const currentHour = currentTime.getHours();
          const currentMinute = currentTime.getMinutes();
  
          let prayerName = '';
          let prayerTime = [];
  
          for (let prayer in prayTimes) {
            let prayerHour = prayTimes[prayer][0];
            let prayerMinute = prayTimes[prayer][1];
  
            if (currentHour < prayerHour || (currentHour === prayerHour && currentMinute < prayerMinute)) {
              prayerName = prayer;
              prayerTime = [prayerHour, prayerMinute];
              break;
            }
          }
  
          if (prayerName) {
            const options = {
              body: `Время для молитвы ${prayerName} в ${prayerTime[0]}:${prayerTime[1]}`,
              icon: 'assets/icons/icon-192x192.png',
              badge: 'assets/icons/badge.png'
            };
  
            return self.registration.showNotification(`Время для молитвы ${prayerName}`, options);
          }
        })
    );
  });
  

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
  