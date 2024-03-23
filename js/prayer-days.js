fetch('js/json/prayer-times.json')
.then(response => response.json())
.then(data => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const todayPrayerTimes = data[currentMonth][currentDay];

    function scheduleNotification(time, message) {
        const now = new Date();
        const timeParts = time.split(":");
        const scheduleTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(timeParts[0]), parseInt(timeParts[1]), 0);

        const diff = scheduleTime.getTime() - now.getTime();
        if (diff > 0) {
            setTimeout(() => {
                const notification = new Notification(message);
            }, diff);
        }
    }

    // Определение времени и текста уведомлений для каждого намаза
    scheduleNotification(todayPrayerTimes.Fajr, "Время для намаза Фаджр");
    scheduleNotification(todayPrayerTimes.Sunrise, "Время для намаза Шурук");
    scheduleNotification(todayPrayerTimes.Dhuhr, "Время для намаза Зухр");
    scheduleNotification(todayPrayerTimes.Asr, "Время для намаза Аср");
    scheduleNotification(todayPrayerTimes.Maghrib, "Время для намаза Магриб");
    scheduleNotification(todayPrayerTimes.Isha, "Время для намаза Иша");

})
.catch(error => console.error('Ошибка загрузки данных:', error));
