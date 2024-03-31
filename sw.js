self.addEventListener('push', event => {
    const data = event.data.json();
    const prayerTime = data.prayerName;

    event.waitUntil(
        self.registration.showNotification('Намазное время', {
            body: `Время для ${prayerTime}`
        })
    );
});

self.addEventListener('sync', function(event) {
    if (event.tag === 'syncData') {
        event.waitUntil(doSync());
    }
});

function doSync() {
    // Placeholder для логики синхронизации данных
    console.log('Фоновая синхронизация прошла успешно');
}

self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

async function checkPrayerTimes() {
    const jsonData = await fetch('prayer_times.json');
    const data = await jsonData.json();

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    const currentPrayerTimes = data[currentMonth][currentDay];

    Object.entries(currentPrayerTimes).forEach(([prayerName, prayerTime]) => {
        const prayerHour = prayerTime[0];
        const prayerMinute = prayerTime[1];

        if (currentHour === prayerHour && currentMinute === prayerMinute) {
            sendPushNotification(prayerName);
        }
    });
}

function sendPushNotification(prayerName) {
    self.registration.showNotification('Намазное время', {
        body: `Время для ${prayerName}`
    });
}

setInterval(checkPrayerTimes, 60000); // Проверяем каждую минуту
