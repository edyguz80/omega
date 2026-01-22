document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Handling with AJAX
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button');
            const originalBtnText = btn.innerText;
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        btn.innerText = '¡Mensaje Enviado!';
                        btn.style.background = '#28a745';
                        contactForm.reset();
                        setTimeout(() => {
                            btn.innerText = originalBtnText;
                            btn.style.background = '';
                            btn.disabled = false;
                        }, 3000);
                    } else {
                        throw new Error('Error al enviar');
                    }
                })
                .catch(error => {
                    btn.innerText = 'Error al enviar';
                    btn.style.background = '#dc3545';
                    setTimeout(() => {
                        btn.innerText = originalBtnText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }

    // Scroll Animation (Simple Reveal)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .nosotros-content, .form-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Add active class style dynamically
    const style = document.createElement('style');
    style.textContent = `
        .active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
