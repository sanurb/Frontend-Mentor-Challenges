const themeInput = document.getElementById('theme-switch');

themeInput.addEventListener('change', () => document.body.classList.toggle('dark-theme'));