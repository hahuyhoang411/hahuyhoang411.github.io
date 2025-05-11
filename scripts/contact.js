import config from './config.js';

// Initialize EmailJS with your public key
(function() {
    emailjs.init(config.emailjs.publicKey);
})();

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;

    // Prepare the email parameters
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value,
        to_name: config.emailjs.recipientName,
        to_email: config.emailjs.recipientEmail
    };

    // Send the email
    emailjs.send(config.emailjs.serviceId, config.emailjs.templateId, templateParams)
        .then(function() {
            alert('Message sent successfully!');
            document.getElementById('contactForm').reset();
        }, function(error) {
            alert('Failed to send message. Please try again.');
            console.error('EmailJS error:', error);
        })
        .finally(function() {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
});