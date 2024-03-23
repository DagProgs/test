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

    // Функция для создания уведомления
    function createNotification(time, prayerName) {
        const notification = new Notification('Наступило время для намаза ' + prayerName, {
            body: 'Время намаза ' + prayerName + ' наступило в ' + time,
            icon: 'assets/icon/icon.png' // путь к иконке уведомления, можно использовать свою
        });

        notification.onclick = function () {
            // Действие при клике на уведомление, например, переход на страницу с расписанием намазов
            window.open('index.html', '_blank');
        };
    }

    // Функция для проверки наступления времени для каждого намаза и создания уведомления
    function checkPrayerTimes() {
        const currentTime = new Date();
        const currentTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

        for (const time in todayPrayerTimes) {
            const hour = todayPrayerTimes[time][0];
            const minute = todayPrayerTimes[time][1];
            const prayerTotalMinutes = hour * 60 + minute;

            if (currentTotalMinutes >= prayerTotalMinutes) {
                const prayerName = prayerNames[time];
                createNotification(`${hour}:${minute}`, prayerName);
            }
        }
    }

    // Вызов функции checkPrayerTimes каждую минуту для проверки времени намаза
    checkPrayerTimes(); // Сначала выполнить функцию один раз при загрузке страницы
    setInterval(checkPrayerTimes, 60000); // каждую минуту (60000 миллисекунд)

})
.catch(error => console.error('Ошибка загрузки данных:', error));
