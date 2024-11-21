// Координаты Каабы
const kaabaLatitude = 21.4225;  // Широта Каабы
const kaabaLongitude = 39.8262; // Долгота Каабы

// Функция для вычисления направления к Каабе
function getDirectionToKaaba(lat, lon) {
    const deltaLon = kaabaLongitude - lon;
    const x = Math.cos(kaabaLatitude * Math.PI / 180) * Math.sin(deltaLon * Math.PI / 180);
    const y = Math.cos(lat * Math.PI / 180) * Math.sin(kaabaLatitude * Math.PI / 180) -
              Math.sin(lat * Math.PI / 180) * Math.cos(kaabaLatitude * Math.PI / 180) * Math.cos(deltaLon * Math.PI / 180);
    const angle = Math.atan2(x, y) * (180 / Math.PI);
    return (angle + 360) % 360; // Приводим угол к диапазону [0, 360]
}

// Функция для обновления компаса
function updateCompass() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const direction = getDirectionToKaaba(lat, lon);
                
                // Обновляем компас
                const needle = document.getElementById('needle');
                needle.style.transform = `translateX(-50%) rotate(${direction}deg)`;
                
                // Обновляем текст направления
                document.getElementById('direction').innerText = `Направление к Каабе: ${direction.toFixed(2)}°`;
            },
            (error) => {
                alert("Не удалось получить ваше местоположение: " + error.message);
            }
        );
    } else {
        alert("Геолокация не поддерживается вашим браузером.");
    }
}

// Добавляем обработчик события на кнопку
document.getElementById('locationButton').addEventListener('click', updateCompass);
