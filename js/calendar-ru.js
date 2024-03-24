var months = new Array(13);
months[1] = "Январь";
months[2] = "Февраль";
months[3] = "Март";
months[4] = "Апрель";
months[5] = "Май";
months[6] = "Июнь";
months[7] = "Июль";
months[8] = "Август";
months[9] = "Сентябрь";
months[10] = "Октябрь";
months[11] = "Ноябрь";
months[12] = "Декабрь";

var date = new Date();
var thisMonth = months[date.getMonth() + 1];
var thisYear = date.getFullYear();
var day = date.getDate(); // Use getDate() to get the day of the month
var dayOfWeek;

switch (date.getDay()) {
  case 0:
    dayOfWeek = "Воскресенье";
    break;
  case 1:
    dayOfWeek = "Понедельник";
    break;
  case 2:
    dayOfWeek = "Вторник";
    break;
  case 3:
    dayOfWeek = "Среда";
    break;
  case 4:
    dayOfWeek = "Четверг";
    break;
  case 5:
    dayOfWeek = "Пятница";
    break;
  case 6:
    dayOfWeek = "Суббота";
    break;
}

document.getElementById("ru-day").innerHTML = (day);
document.getElementById("ru-mounth").innerHTML = (thisMonth);
document.getElementById("ru-year").innerHTML = (thisYear + " г");
document.getElementById("ru-week").innerHTML = (dayOfWeek);

/*
document.getElementById("ru-date").innerHTML = (day + " " + thisMonth + " " + thisYear + " г");
*/