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

    function sendBrowserNotification(title, options) {
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.getRegistration().then(function(registration) {
                registration.showNotification(title, options);
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(function(permission) {
                if (permission === 'granted') {
                    sendBrowserNotification(title, options);
                }
            });
        }
    }

    function checkPrayerTimeForNotification(time) {
        const currentTime = new Date();
        const currentTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        const hour = todayPrayerTimes[time][0];
        const minute = todayPrayerTimes[time][1];
        const prayerTotalMinutes = hour * 60 + minute;

        if (currentTotalMinutes >= prayerTotalMinutes && currentTotalMinutes < prayerTotalMinutes + 10) {
            sendBrowserNotification("Наступает время намаза " + prayerNames[time], {
                body: "Время для выполнения намаза " + prayerNames[time] + " приближается",
                icon: 'assets/isons/icon.png'
            });
        }
    }

    function updatePrayerTimeColor() {
        // Код для обновления времени намаза и проверки отправки уведомлений
    }

    updatePrayerTimeColor(); // Сначала выполнить функцию один раз при загрузке страницы
    setInterval(() => {
        for (const time in todayPrayerTimes) {
            checkPrayerTimeForNotification(time);
        }
    }, 10000); // каждые 10 секунд

})
.catch(error => console.error('Ошибка загрузки данных:', error));
