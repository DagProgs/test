const btn = document.querySelector('.btnicon')
const theme = document.querySelector('.theme')
const currentTheme = localStorage.getItem('theme')

function setTheme(name){
  theme.setAttribute('data-theme', name)
  localStorage.setItem('theme', name)
}



if (currentTheme) {
  theme.setAttribute('data-theme', currentTheme)
} else {
  setTheme('light')
}

btn.addEventListener('click', () => {
  if (theme.getAttribute('data-theme') === 'light') {
    setTheme('dark')
  } else if (theme.getAttribute('data-theme') === 'dark') { 
    setTheme('light')
  } else { 
    setTheme('light')
  }
})