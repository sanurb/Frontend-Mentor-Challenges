(function () {
    const THEME_STORAGE_KEY = 'theme';
    const Theme = { LIGHT: 'light', DARK: 'dark' };

    // Establece el tema inicial basado en localStorage o preferencias del sistema
    const setInitialTheme = () => {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme) {
            document.body.classList.toggle('dark-theme', storedTheme === Theme.DARK);
        } else if (prefersDark) {
            document.body.classList.add('dark-theme');
        }
    };

    // Cambia el tema y almacena la selección en localStorage
    const toggleTheme = () => {
        const isDarkMode = document.body.classList.toggle('dark-theme');
        const newTheme = isDarkMode ? Theme.DARK : Theme.LIGHT;
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    };

    document.addEventListener('DOMContentLoaded', () => {
        const themeSwitch = document.getElementById('theme-switch');
        if (!themeSwitch) return;

        setInitialTheme();

        // Actualiza el estado del interruptor basado en el tema actual
        themeSwitch.checked = document.body.classList.contains('dark-theme');

        themeSwitch.addEventListener('change', toggleTheme);
    });
})();
