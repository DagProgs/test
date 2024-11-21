function getDirectionToKaaba() {
    const kaabaLat = 21.4225;
    const kaabaLon = 39.8262;

    // Получаем текущее местоположение пользователя
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            // Рассчитываем направление
            const deltaLon = kaabaLon - userLon;
            const y = Math.sin(deltaLon) * Math.cos(kaabaLat);
            const x = Math.cos(userLat) * Math.sin(kaabaLat) - 
                      Math.sin(userLat) * Math.cos(kaabaLat) * Math.cos(deltaLon);
            const angle = Math.atan2(y, x) * (180 / Math.PI);

            // Устанавливаем угол стрелки
            const needle = document.getElementById('needle');
            needle.style.transform = `rotate(${angle}deg)`;
        });
    } else {
        alert("Геолокация не поддерживается вашим браузером.");
    }
}

// Запускаем функцию
getDirectionToKaaba();
