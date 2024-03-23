// Загрузка данных из файла prayer-times.json и отправка push уведомлений
fetch('js/json/prayer-times.json')
.then(response => response.json())
.then(data => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const todayPrayerTimes = data[currentMonth][currentDay];

    const nextPrayerTime = getNextPrayerTime(todayPrayerTimes);

    // Отправка push уведомления
    self.registration.showNotification('Намазное время', {
        body: `Время для выполнения намаза ${nextPrayerTime} приближается`,
        icon: 'assets/icons/icon-192x192.png',
        badge: 'assets/icons/icon-72x72.png'
    });
})
.catch(error => console.error('Ошибка загрузки данных:', error));

// Функция для определения следующего времени намаза
function getNextPrayerTime(prayerTimes) {
    const currentTime = new Date();
    const currentTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    for (const time in prayerTimes) {
        const hour = prayerTimes[time][0];
        const minute = prayerTimes[time][1];
        const prayerTotalMinutes = hour * 60 + minute;

        if (prayerTotalMinutes > currentTotalMinutes) {
            return time;
        }
    }

    // Если все намазы уже прошли, то возвращаем первый намаз на следующий день
    const nextDay = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);
    const nextDayPrayerTimes = data[nextDay.getMonth() + 1][nextDay.getDate()];
    return Object.keys(nextDayPrayerTimes)[0];
}
