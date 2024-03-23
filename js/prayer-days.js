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
                timeElement.classList.add("highlighted");
                timeElement.classList.remove("not-passed");
            } else {
                timeElement.classList.add("not-passed");
                timeElement.classList.remove("highlighted");
            }
        }
    }

    function nextTime(currentTime) {
        const times = Object.keys(todayPrayerTimes);
        const currentIndex = times.indexOf(currentTime);
        return currentIndex !== -1 && times[currentIndex + 1];
    }

    updatePrayerTimeColor();
    setInterval(updatePrayerTimeColor, 10000);
})
.catch(error => console.error('Ошибка загрузки данных:', error));
