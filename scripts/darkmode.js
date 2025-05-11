document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const sunIcon = darkModeToggle ? darkModeToggle.querySelector('.sun-icon') : null;
    const moonIcon = darkModeToggle ? darkModeToggle.querySelector('.moon-icon') : null;

    const ensureLucideIcons = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };

    const setDarkTheme = () => {
        body.classList.add('dark-mode');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'inline-block';
        localStorage.setItem('theme', 'dark');
        ensureLucideIcons();
    };

    const setLightTheme = () => {
        body.classList.remove('dark-mode');
        if (sunIcon) sunIcon.style.display = 'inline-block';
        if (moonIcon) moonIcon.style.display = 'none';
        localStorage.setItem('theme', 'light');
        ensureLucideIcons();
    };

    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkTheme();
        } else {
            setLightTheme(); // Default to light theme
        }
    };

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                setLightTheme();
            } else {
                setDarkTheme();
            }
        });
    }

    // Apply the saved theme on initial load
    applyTheme();
}); 