fetch('js/json/prayer-times.json')
.then(response => response.json())
.then(data => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const todayPrayerTimes = data[currentMonth][currentDay];

    const prayerNames = {
        "Fajr": "Фаджр",
        "Sunrise": "Шурук",
        "Dhuhr": "Зухр",
        "Asr": "Аср",
        "Maghrib": "Магриб",
        "Isha": "Иша"
    };

    function sendPushNotification(prayerName) {
        if (Notification.permission === 'granted') {
            new Notification("Напоминание о намазе", {
                body: `Сейчас наступил ${prayerNames[prayerName]} намаз`
            });
        }
    }

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

    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            setInterval(checkPrayerTime, 60000); // каждую минуту
        }
    });

})
.catch(error => console.error('Ошибка загрузки данных:', error));
