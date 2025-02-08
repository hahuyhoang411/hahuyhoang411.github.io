function initializeCustomSelect() {
    const containers = document.querySelectorAll('.custom-select-container');

    containers.forEach(container => {
        const trigger = container.querySelector('.custom-select-trigger');
        const content = container.querySelector('.custom-select-content');
        const items = container.querySelectorAll('.custom-select-item');
        const input = container.querySelector('input[type="hidden"]');
        const valueSpan = container.querySelector('.select-value');

        // Handle trigger click
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = container.getAttribute('data-open') === 'true';
            container.setAttribute('data-open', !isOpen);
        });

        // Handle item selection
        items.forEach(item => {
            item.addEventListener('click', () => {
                const value = item.getAttribute('data-value');
                const text = item.textContent.trim();
                
                // Update hidden input
                input.value = value;
                
                // Update trigger text
                valueSpan.textContent = text;
                
                // Update selected state
                items.forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                
                // Close dropdown
                container.setAttribute('data-open', false);
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                container.setAttribute('data-open', false);
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCustomSelect);