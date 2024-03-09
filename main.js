// Загрузка данных из файла prayer-times.json
fetch('prayer-times.json')
  .then(response => response.json())
  .then(data => {
    const today = new Date();
    const dayOfMonth = today.getDate().toString();
    
    // Получаем времена намазов для текущего дня
    const prayerTimesToday = data[dayOfMonth];

    if (prayerTimesToday) {
      const currentTime = today.getHours() * 60 + today.getMinutes();

      // Пройдемся по всем намазам на текущий день и проверим, если время наступило
      for (const prayerTime in prayerTimesToday) {
        const prayerName = prayerTime;
        const prayerStartTime = prayerTimesToday[prayerTime][0] * 60 + prayerTimesToday[prayerTime][1];

        if (currentTime === prayerStartTime) {
          // Время для выполнения намаза
          self.registration.showNotification(`Время для намаза ${prayerName}!`, {
            body: 'Приготовьтесь к выполнению намаза.',
          });
        }
      }
    } else {
      console.log('Для текущего дня нет данных о времени намазов в файле.');
    }
  })
  .catch(error => {
    console.error('Ошибка при загрузке данных:', error);
  });
