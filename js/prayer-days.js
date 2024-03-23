// Загрузка данных из файла prayer-times.json
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

    for (const time in todayPrayerTimes) {
        const hour = todayPrayerTimes[time][0];
        const minute = todayPrayerTimes[time][1];

        const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
        document.getElementById(time.toLowerCase() + "-time").innerText = formattedTime;
        document.getElementById(time.toLowerCase() + "-name").innerText = prayerNames[time];
    }

    function sendNotification(title, body) {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    const notification = new Notification(title, {
                        body: body,
                    });
                }
            });
        }
    }

    function checkPrayerTime() {
        for (const time in todayPrayerTimes) {
            const hour = todayPrayerTimes[time][0];
            const minute = todayPrayerTimes[time][1];
            const prayerTotalMinutes = hour * 60 + minute;
            
            const currentTime = new Date();
            const currentTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
            
            if (currentTotalMinutes === prayerTotalMinutes) {
                sendNotification('Напоминание о намазе', `Пора ${prayerNames[time]}`);
            }
        }
    }

    setInterval(checkPrayerTime, 60000); // Проверка каждую минуту

    // Обработчик для кнопки запроса уведомлений
    document.getElementById('requestNotificationButton').addEventListener('click', () => {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                alert('Уведомления разрешены');
            } else if (permission === 'denied') {
                alert('Уведомления не разрешены');
            }
        });
    });

})
.catch(error => console.error('Ошибка загрузки данных:', error));
