const kaabaCoordinates = { lat: 21.4225, lon: 39.8262 }; // Координаты Каабы
const needle = document.getElementById('needle');
const directionText = document.getElementById('direction');
const locationButton = document.getElementById('locationButton');
let watchingPosition = false; // Переменная для отслеживания состояния геолокации

function getBearing(lat1, lon1, lat2, lon2) {
    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const toDegrees = (radians) => radians * (180 / Math.PI);

    const dLon = toRadians(lon2 - lon1);
    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);

    const x = Math.sin(dLon) * Math.cos(lat2Rad);
    const y = Math.cos(lat1Rad) * Math.sin(lat2Rad) - 
              Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
    const bearing = toDegrees(Math.atan2(x, y));

    return (bearing + 360) % 360; // Приведение к положительному значению
}

function updateCompass(event) {
    const { latitude, longitude } = event.coords;
    const bearing = getBearing(latitude, longitude, kaabaCoordinates.lat, kaabaCoordinates.lon);
    
    needle.style.transform = `translateX(-50%) rotate(${-bearing}deg)`;
    directionText.innerText = `Направление на Каабу: ${bearing.toFixed(2)}°`;
}

function handleError(error) {
    console.error('Ошибка геолокации: ', error);
    alert('Не удалось получить ваше местоположение. Пожалуйста, проверьте настройки геолокации.');
}

function startGeolocation() {
    if (navigator.geolocation && !watchingPosition) {
        watchingPosition = true; // Устанавливаем флаг, что геолокация включена
        navigator.geolocation.watchPosition(updateCompass, handleError);
        locationButton.disabled = true; // Отключаем кнопку после нажатия
        locationButton.innerText = 'Геолокация включена';
    } else {
        alert('Геолокация уже включена или не поддерживается вашим браузером.');
    }
}

locationButton.addEventListener('click', startGeolocation);
