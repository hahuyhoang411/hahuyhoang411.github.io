import config from './config.js';

async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        const targetElement = document.getElementById(elementId);
        if (targetElement) {
            targetElement.innerHTML = html;
        }
        
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Update active nav item (typically for header)
        if (elementId === 'header-container') {
            const currentPath = window.location.pathname;
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.classList.remove('active'); // Ensure only one is active
                const href = item.getAttribute('href');
                if (href) { // Check if href exists
                    const itemPath = new URL(href, window.location.origin).pathname;
                    if (currentPath === itemPath || 
                        (currentPath === '/' && itemPath === '/index.html') || 
                        (currentPath.endsWith('/') && href === 'index.html' && itemPath === currentPath + 'index.html')) {
                        item.classList.add('active');
                    }
                }
            });

            // Populate social links
            if (config && config.site && config.site.social) {
                const twitterLink = document.getElementById('social-twitter');
                if (twitterLink) twitterLink.href = config.site.social.twitter || '#';

                const linkedinLink = document.getElementById('social-linkedin');
                if (linkedinLink) linkedinLink.href = config.site.social.linkedin || '#';

                const githubLink = document.getElementById('social-github');
                if (githubLink) githubLink.href = config.site.social.github || '#';
            }
        }

        // Update copyright year if footer is loaded
        if (elementId === 'footer-container' && typeof updateCopyrightYear === 'function') {
            updateCopyrightYear();
        }

    } catch (error) {
        console.error(`Error loading component from ${componentPath}:`, error);
        const targetElement = document.getElementById(elementId);
        if (targetElement) {
            targetElement.innerHTML = `<p>Error loading content. Please try refreshing.</p>`;
        }
    }
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-container', '/components/header.html');
    loadComponent('footer-container', '/components/footer.html');
});