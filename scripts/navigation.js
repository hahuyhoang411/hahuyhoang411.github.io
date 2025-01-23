const navItems = [
    { name: 'Blog', url: '/blog', icon: 'fa-book-open' },
    { name: 'About', url: '/about', icon: 'fa-user' },
    { name: 'Contact', url: '/contact', icon: 'fa-envelope' }
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
            <i class="fas ${item.icon}"></i>
            <span>${item.name}</span>
        `;
        nav.appendChild(link);
    });
});
