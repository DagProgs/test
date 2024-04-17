const menuToggle = document.getElementById('menuToggle');
const menu = document.querySelector('.menu');
let isOpen = false;
let isAnimating = false;

menuToggle.addEventListener('click', function () {
    if (!isAnimating) {
        isOpen = !isOpen;
        isAnimating = true;
        const svgIcon = isOpen ? `
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M15 18l-6-6 6-6" fill="#fff"/>`
            :
            `
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 18h18v-2H3v2z" fill="#fff"/>
                <path d="M3 13h18v-2H3v2z" fill="#fff"/>
                <path d="M3 6v2h18V6H3z" fill="#fff"/>`;

        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">${svgIcon}</svg>`;

        menu.style.left = isOpen ? '0' : '-200px';
        menuToggle.style.transform = isOpen ? 'translateX(160px)' : 'translateX(0)'; // сдвигаем иконку
        menuToggle.querySelector('svg').style.fill = isOpen ? '#fff' : '#000'; // изменяем цвет иконки

        setTimeout(() => {
            isAnimating = false;
        }, 300);
    }
});

document.addEventListener('touchstart', function (e) {
    const startX = e.changedTouches[0].clientX;
    let moveX;

    document.addEventListener('touchmove', function (e) {
        moveX = e.changedTouches[0].clientX;

        const menuIsOpen = menu.style.left === '0px';
        if (moveX - startX > 50 && !menuIsOpen) {
            menu.style.left = '0';
            menuToggle.style.transform = 'translateX(160px)';
            menuToggle.querySelector('svg').style.fill = '#fff';
            isOpen = true;
        } else if (moveX - startX < -50 && menuIsOpen) {
            menu.style.left = '-200px';
            menuToggle.style.transform = 'translateX(0)';
            menuToggle.querySelector('svg').style.fill = '#000';
            isOpen = false;
        }

        const svgIcon = isOpen ? `
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M15 18l-6-6 6-6" fill="#fff"/>`
            :
            `
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 18h18v-2H3v2z" fill="#fff"/>
                <path d="M3 13h18v-2H3v2z" fill="#fff"/>
                <path d="M3 6v2h18V6H3z" fill="#fff"/>`;


        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">${svgIcon}</svg>`;
    });
});