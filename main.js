import { Workbox } from './workbox-v4.3.0/workbox-window.prod.mjs';

if (!localStorage.getItem('appInstalled') && !window.matchMedia('(display-mode: standalone)').matches && /iPhone|iPod/i.test(navigator.userAgent)) {
    // Открываем модальное окно только на устройствах iPhone
    document.getElementById('myModal').style.display = "block";
    localStorage.setItem('appInstalled', 'true');
}

// Закрытие модального окна при нажатии на кнопку "Close"
document.getElementsByClassName("close")[0].onclick = function() {
    document.getElementById('myModal').style.display = "none";
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw-workbox.js')
    .then(function(registration) {
        console.log('Service Worker зарегистрирован', registration);
    })
    .catch(function(error) {
        console.error('Ошибка регистрации Service Worker:', error);
    });
}

function sendNotification(title, body) {
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({title: title, body: body});
    } else {
        console.error('Service Worker не активен');
    }
}

// Ваш другой JavaScript код здесь
// Например, код для загрузки данных из JSON и обновления интерфейса

