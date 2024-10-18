function loadHTML(file, elementId) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      if (elementId === 'head') {
        // Добавляем содержимое в head
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const headElements = doc.head.children;
        for (let i = 0; i < headElements.length; i++) {
          document.head.appendChild(headElements[i].cloneNode(true));
        }
      } else {
        // Добавляем содержимое в body
        document.getElementById(elementId).innerHTML = data;

        // Загружаем все скрипты из загруженного контента
        const scripts = document.getElementById(elementId).getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
          eval(scripts[i].innerText); // Выполняем скрипты
        }
      }
    });
}