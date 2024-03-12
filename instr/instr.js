// Проверяем user-agent на наличие iPhone
    if (navigator.userAgent.match(/iPhone/i)) {
      // Перенаправляем пользователя на страницу с инструкциями
      window.location.href = '../instr.html';
    }