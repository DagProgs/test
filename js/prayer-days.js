// Функция для отправки уведомления при наступлении времени намаза
function sendNotification(prayerName) {
    if (!("Notification" in window)) {
        console.error("Браузер не поддерживает уведомления");
    } else if (Notification.permission === "granted") {
        new Notification(prayerName + " - время для намаза", {
            icon: 'assets/icons/icon-192x192.png',
            body: "Приготовьтесь к намазу",
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(prayerName + " - время для намаза", {
                    icon: 'assets/icons/icon-192x192.png',
                    body: "Приготовьтесь к намазу",
                });
            }
        });
    }
}

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

    // Функция для обновления цвета времени намаза
    function updatePrayerTimeColor() {
        const currentTime = new Date();
        const currentTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

        for (const time in todayPrayerTimes) {
            const hour = todayPrayerTimes[time][0];
            const minute = todayPrayerTimes[time][1];
            const prayerTotalMinutes = hour * 60 + minute;

            const next = nextTime(time);

            if (!todayPrayerTimes || (time === "Isha" && (currentTotalMinutes >= prayerTotalMinutes || currentTotalMinutes < (todayPrayerTimes["Fajr"][0] * 60 + todayPrayerTimes["Fajr"][1])))) {
                sendNotification(prayerNames[time]);
            } else if (currentTotalMinutes >= prayerTotalMinutes && currentTotalMinutes < (todayPrayerTimes[next][0] * 60 + todayPrayerTimes[next][1])) {
                // Добавить логику для обновления цвета элемента времени намаза на странице
            } else {
                // Дополнительная логика для обновления цвета элемента времени намаза на странице
            }
        }
    }

    function nextTime(currentTime) {
        const times = Object.keys(todayPrayerTimes);
        const currentIndex = times.indexOf(currentTime);
        return currentIndex !== -1 && times[currentIndex + 1];
    }

    updatePrayerTimeColor();
    setInterval(updatePrayerTimeColor, 10000); // Обновление каждые 10 секунд

})
.catch(error => console.error('Ошибка загрузки данных:', error));
