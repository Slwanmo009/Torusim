document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const responseContainer = document.getElementById('response');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        
        fetch('/contact', {
            method: 'POST',
            body: new URLSearchParams(formData)
        })
        .then(response => response.text())
        .then(data => {
            responseContainer.innerHTML = data;
            contactForm.reset(); // إعادة تعيين النموذج بعد الإرسال
        })
        .catch(error => {
            responseContainer.innerHTML = 'Error: ' + error.message;
        });
    });
});
