// Загрузка данных из файла prayer-times.json
fetch('js/json/prayer-times.json')
.then(response => response.json())
.then(data => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const todayPrayerTimes = data[currentMonth][currentDay];

    const { Notification } = window;

    function checkPrayerTime() {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();

        for (const time in todayPrayerTimes) {
            const hour = todayPrayerTimes[time][0];
            const minute = todayPrayerTimes[time][1];

            if (currentHour === hour && currentMinute === minute) {
                const prayerName = time;
                const prayerBody = `Сейчас наступил ${prayerName} намаз`;

                // Отправка локального push уведомления
                if (Notification.permission === 'granted') {
                    new Notification("Напоминание о намазе", { body: prayerBody });
                }
            }
        }
    }

    // Запрос разрешения для отправки уведомлений
    Notification.requestPermission()
    .then(permission => {
        if (permission === 'granted') {
            // Вызов функции checkPrayerTime каждую минуту для проверки наступления времени намаза
            setInterval(checkPrayerTime, 60000); // каждую минуту (60000 миллисекунд)
        }
    });

})
.catch(error => console.error('Ошибка загрузки данных:', error));
