const stylesheets = [
  'css-js/reset.css',
  'css-js/header.css',
  
  'css-js/main.css',
  'css-js/left-right.css',
  'css-js/prayer-times-day.css',
  'css-js/modal-description-prayer.css',
  'css-js/calendar.css',
  'css-js/times.css',
  'css-js/table.css',

  'css-js/jumma.css',
  'css-js/reklama.css',
];


stylesheets.forEach((stylesheet) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = stylesheet;
  document.head.appendChild(link);
});