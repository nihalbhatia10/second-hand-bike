/**
 * Main JavaScript File
 * Handles UI interactions, scroll effects, and dynamic behaviors.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return; // Ignore top anchors
            
            const targetEl = document.querySelector(targetId);
            if(targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Inventory Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const bikeCards = document.querySelectorAll('.bike-card');

    if (filterBtns.length > 0 && bikeCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Filter cards with smooth opacity transition
                bikeCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === category) {
                        card.style.display = 'block';
                        setTimeout(() => { card.style.opacity = '1'; }, 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => { card.style.display = 'none'; }, 300); // Wait for transition
                    }
                });
            });
        });
    }

    // --- Web3Forms Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Saving original button text
            const btnOriginalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    // Success state
                    submitBtn.innerHTML = 'Message Sent Successfully!';
                    submitBtn.style.backgroundColor = '#28a745';
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = btnOriginalText;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.disabled = false;
                    }, 4000);
                } else {
                    // Error state provided by API
                    console.log(response);
                    submitBtn.innerHTML = json.message || 'Something went wrong!';
                    submitBtn.style.backgroundColor = '#dc3545';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = btnOriginalText;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.disabled = false;
                    }, 4000);
                }
            })
            .catch(error => {
                // Network error state
                console.log(error);
                submitBtn.innerHTML = 'Something went wrong!';
                submitBtn.style.backgroundColor = '#dc3545';
                
                setTimeout(() => {
                    submitBtn.innerHTML = btnOriginalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 4000);
            });
        });
    }

    // --- Image Modal / Lightbox ---
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    
    const modalImg = document.createElement('img');
    modalImg.className = 'image-modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'image-modal-close';
    closeBtn.innerHTML = '&times;';
    
    modal.appendChild(closeBtn);
    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    const bikeImages = document.querySelectorAll('.card-image-wrapper img');
    
    bikeImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modal.classList.add('active');
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- WhatsApp Floating Button ---
    const waLink = document.createElement('a');
    waLink.href = 'https://wa.me/919881188679?text=Hello%20Can%20I%20get%20more%20info%20on%20the%20bikes%3F';
    waLink.className = 'whatsapp-float';
    waLink.target = '_blank';
    waLink.rel = 'noopener noreferrer';
    waLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>`;
    document.body.appendChild(waLink);

});
