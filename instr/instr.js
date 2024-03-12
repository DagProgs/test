if (navigator.userAgent.match(/iPhone/i)) {
    window.location.href = 'instr.html';
} else {
    location.reload(true); // перезагрузить страницу без кэширования
}
