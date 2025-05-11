function initializeCustomSelect() {
    const containers = document.querySelectorAll('.custom-select-container');

    containers.forEach(container => {
        const trigger = container.querySelector('.custom-select-trigger');
        const content = container.querySelector('.custom-select-content');
        const items = container.querySelectorAll('.custom-select-item');
        const input = container.querySelector('input[type="hidden"]');
        const valueSpan = container.querySelector('.select-value');

        if (!trigger || !content || !items.length || !input || !valueSpan) return; // Basic check

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = container.getAttribute('data-open') === 'true';
            container.setAttribute('data-open', String(!isOpen));
            trigger.setAttribute('aria-expanded', String(!isOpen));
        });

        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop propagation to prevent document click handler from immediately closing
                const value = item.getAttribute('data-value');
                const text = item.textContent.trim();
                
                input.value = value;
                valueSpan.textContent = text;
                
                items.forEach(i => {
                    i.classList.remove('selected');
                    i.setAttribute('aria-selected', 'false');
                });
                item.classList.add('selected');
                item.setAttribute('aria-selected', 'true');
                
                container.setAttribute('data-open', 'false');
                trigger.setAttribute('aria-expanded', 'false');
            });
        });
    });

    // Single document click listener to close all open custom selects
    document.addEventListener('click', (e) => {
        containers.forEach(container => {
            const trigger = container.querySelector('.custom-select-trigger');
            if (container.getAttribute('data-open') === 'true' && !container.contains(e.target)) {
                container.setAttribute('data-open', 'false');
                if(trigger) trigger.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCustomSelect);