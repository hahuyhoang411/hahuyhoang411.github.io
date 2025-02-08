async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // Initialize Lucide icons
        lucide.createIcons();
        
        // Update active nav item
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (currentPath.endsWith(href)) {
                item.classList.add('active');
            }
        });
    } catch (error) {
        console.error(`Error loading component from ${componentPath}:`, error);
    }
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-container', '/components/header.html');
    loadComponent('footer-container', '/components/footer.html');
});