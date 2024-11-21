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

            const y = Math.sin(deltaLon * Math.PI / 180) * Math.cos(kaabaLat * Math.PI / 180);
            const x = Math.cos(userLat * Math.PI / 180) * Math.sin(kaabaLat * Math.PI / 180) - 
                      Math.sin(userLat * Math.PI / 180) * Math.cos(kaabaLat * Math.PI / 180) * Math.cos(deltaLon * Math.PI / 180);
            const angle = Math.atan2(y, x) * (180 / Math.PI);

            // Устанавливаем угол стрелки. Добавляем 180 градусов, чтобы стрелка указывала в нужном направлении.
            const needle = document.getElementById('needle');
            needle.style.transform = `rotate(${angle + 180}deg)`;
        });
    } else {
        alert("Геолокация не поддерживается вашим браузером.");
    }
}

// Запускаем функцию
getDirectionToKaaba();
