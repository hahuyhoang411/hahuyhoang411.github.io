function updateCopyrightYear() {
    const copyrightYearSpan = document.getElementById('copyright-year');
    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateCopyrightYear(); 
}); 