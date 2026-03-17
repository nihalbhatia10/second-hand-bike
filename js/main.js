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

});
