// Функция для получения текущего направления киблы
function getQibla() {
    // Координаты Каабы в Мекке
    const qiblaLat = 21.4225;
    const qiblaLon = 39.8262;

    // Получаем текущее местоположение пользователя
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            // Вычисляем угол киблы
            const deltaLon = qiblaLon - userLon;
            const y = Math.sin(deltaLon * Math.PI / 180) * Math.cos(qiblaLat * Math.PI / 180);
            const x = Math.cos(userLat * Math.PI / 180) * Math.sin(qiblaLat * Math.PI / 180) -
                      Math.sin(userLat * Math.PI / 180) * Math.cos(qiblaLat * Math.PI / 180) * Math.cos(deltaLon * Math.PI / 180);
            const angle = Math.atan2(y, x) * (180 / Math.PI);

            // Поворачиваем стрелку компаса
            const needle = document.getElementById('needle');
            needle.style.transform = `rotate(${angle}deg)`;
        });
    } else {
        alert("Геолокация не поддерживается вашим браузером.");
    }
}

// Вызываем функцию для получения направления киблы
getQibla();
