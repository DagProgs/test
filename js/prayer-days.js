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

    function sendNotification(prayerName) {
        const title = "Время для намаза " + prayerName;
        const options = {
            body: "Приготовьтесь к намазу",
            icon: "assets/icons/icon-192x192.png"
        };

        new Notification(title, options);
    }

    function updatePrayerTimeColor() {
        const currentTime = new Date();
        const currentTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        
        for (const time in todayPrayerTimes) {
            const hour = todayPrayerTimes[time][0];
            const minute = todayPrayerTimes[time][1];
            const prayerTotalMinutes = hour * 60 + minute;

            if (currentTotalMinutes === prayerTotalMinutes) {
                sendNotification(prayerNames[time]);
            }
        }
    }
    
    function nextTime(currentTime) {
        const times = Object.keys(todayPrayerTimes);
        const currentIndex = times.indexOf(currentTime);
        return currentIndex !== -1 && times[currentIndex + 1];
    }

    updatePrayerTimeColor(); 
    setInterval(updatePrayerTimeColor, 60000); // Проверять каждую минуту

})
.catch(error => console.error('Ошибка загрузки данных:', error));
