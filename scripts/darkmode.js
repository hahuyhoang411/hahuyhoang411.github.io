document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    // Icons are now controlled by CSS based on body.dark-mode class

    const ensureLucideIconsIfRequired = () => {
        // Lucide icons are generally created when components load or by inline script.
        // This call might only be needed if themes dynamically changed icon *identities*,
        // not just visibility. For visibility, CSS is sufficient.
        // If issues arise, uncomment and test.
        // if (typeof lucide !== 'undefined') {
        //     lucide.createIcons();
        // }
    };

    const setDarkTheme = () => {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        // ensureLucideIconsIfRequired(); // Icons display is handled by CSS
    };

    const setLightTheme = () => {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        // ensureLucideIconsIfRequired(); // Icons display is handled by CSS
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