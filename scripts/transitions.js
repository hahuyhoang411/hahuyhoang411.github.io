document.body.classList.add('fade');

document.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(function() {
        document.body.classList.remove('fade');
    }, 230);
});