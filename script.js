// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Career tabs functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentImageIndex = 0;
const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        lightboxImage.src = images[currentImageIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

lightboxPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    lightboxImage.src = images[currentImageIndex];
});

lightboxNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImage.src = images[currentImageIndex];
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    } else if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex];
    } else if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex];
    }
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Create WhatsApp message
    const whatsappMessage = encodeURIComponent(
        `*Nuevo mensaje desde la web*\n\n` +
        `*Nombre:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Telefono:* ${phone || 'No proporcionado'}\n` +
        `*Servicio:* ${service}\n` +
        `*Mensaje:* ${message}`
    );
    
    // Open WhatsApp
    window.open(`https://wa.me/56992313861?text=${whatsappMessage}`, '_blank');
    
    // Also submit to Formspree for email backup
    fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
            'Accept': 'application/json'
        }
    });
    
    // Reset form
    contactForm.reset();
    
    // Show success message
    alert('Mensaje enviado! Te contactare pronto.');
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section-header, .about-content, .service-card, .gallery-item, .contact-wrapper, .sponsor-card').forEach(el => {
    observer.observe(el);
});
