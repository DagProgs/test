let activeTab = 1; // Переменная для отслеживания активной вкладки
const tabTitles = ['День', 'Месяц', 'Год']; // Массив с названиями для вкладок

const headerHeight = 60; // Высота заголовка
const footerHeight = 50; // Высота нижнего колонтитула
let swipeAction = false; // Флаг для отслеживания свайпа

function showTab(tabNumber) {
  const tabContents = document.querySelectorAll('.main_tab_content');
  const activeLine = document.getElementById('footer-active-line');
  const tabButtons = document.querySelectorAll('.footer_tab_button');

  // Скрываем все вкладки
  tabContents.forEach(tab => {
    tab.style.display = 'none';
  });

  // Показываем выбранную вкладку
  document.getElementById(`tab${tabNumber}`).style.display = 'block';

  // Обновляем заголовок в зависимости от выбранной вкладки
  const headerTitle = document.getElementById('header-title-tabs');
  headerTitle.textContent = tabTitles[tabNumber - 1];

  // Позиционирование красной линии
  const activeButton = tabButtons[tabNumber - 1];
  activeLine.style.left = `${activeButton.offsetLeft}px`;
  activeLine.style.width = `${activeButton.offsetWidth}px`;

  activeTab = tabNumber; // Обновляем активную вкладку
}

// Вызываем функцию для отображения содержимого первой вкладки при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  showTab(1);
});

// Добавляем обработчики событий для вкладок
const tabButtons = document.querySelectorAll('.footer_tab_button');
tabButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    swipeAction = false; // Сбрасываем флаг при нажатии на вкладку
    showTab(index + 1); // Показываем выбранную вкладку
  });
});

// Свайп для переключения вкладок
let startX = 0;
let startY = 0;

document.addEventListener('touchstart', function (event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
});

document.addEventListener('touchend', function (event) {
  const endX = event.changedTouches[0].clientX;
  const endY = event.changedTouches[0].clientY;
  const diffX = endX - startX;

  // Проверяем, находится ли касание в области контента
  if (startY > headerHeight && startY < window.innerHeight - footerHeight) {
    if (Math.abs(diffX) > 50) { // Убедимся, что свайп достаточно длинный
      if (diffX > 50 && activeTab > 1) {
        // Свайп вправо
        showTab(activeTab - 1);
        swipeAction = true; // Устанавливаем флаг, что был свайп
      } else if (diffX < -50 && activeTab < tabTitles.length) {
        // Свайп влево
        showTab(activeTab + 1);
        swipeAction = true; // Устанавливаем флаг, что был свайп
      }
    }
  }
});
