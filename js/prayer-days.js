// Функция для отправки push уведомлений
function sendPushNotification(prayerName) {
    if (Notification.permission === 'granted') {
        new Notification("Напоминание о намазе", {
            body: `Сейчас наступил ${prayerNames[prayerName]} намаз`
        });
    }
}

// Проверка наступления времени намаза и отправка уведомления
function checkPrayerTime() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    for (const time in todayPrayerTimes) {
        const hour = todayPrayerTimes[time][0];
        const minute = todayPrayerTimes[time][1];

        if (currentHour === hour && currentMinute === minute) {
            sendPushNotification(time);
        }
    }
}

// Запрос разрешения на отправку уведомлений
Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
        // Вызов функции checkPrayerTime каждую минуту для проверки наступления времени намаза
        setInterval(checkPrayerTime, 60000); // каждую минуту (60000 миллисекунд)
    }
});
