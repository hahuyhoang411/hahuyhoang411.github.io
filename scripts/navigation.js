const navItems = [
    { name: 'Blog', url: '/blog', icon: 'book-open' },
    { name: 'About', url: '/about', icon: 'user' },
    { name: 'Contact', url: '/contact', icon: 'mail' }
];

document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const currentPath = window.location.pathname;
    
    navItems.forEach(item => {
        const isActive = currentPath === item.url;
        const linkClass = isActive ? 'active' : '';
        
        const link = document.createElement('a');
        link.href = item.url;
        link.className = `nav-item ${linkClass}`;
        link.innerHTML = `
            <i data-lucide="${item.icon}"></i>
            <span>${item.name}</span>
        `;
        nav.appendChild(link);
    });

    // Initialize Lucide icons after adding them to the DOM
    lucide.createIcons();
});
