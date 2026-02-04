// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== CAREER TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentImageIndex = 0;
const images = [];

galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    images.push(img.src);
    
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(img.src);
    });
});

function openLightbox(src) {
    lightboxImage.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    lightboxImage.src = images[currentImageIndex];
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImage.src = images[currentImageIndex];
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Disable submit button while sending
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // 1. Send to Email via Formspree
    try {
        await fetch('https://formspree.io/f/Fernandatapia@live.cl', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
    } catch (error) {
        console.log('Email sending attempted');
    }
    
    // 2. Create WhatsApp message
    const whatsappMessage = `¡Hola Fernanda! 👋%0A%0A` +
        `*Nombre:* ${name}%0A` +
        `*Email:* ${email}%0A` +
        `${phone ? `*Teléfono:* ${phone}%0A` : ''}` +
        `*Servicio de interés:* ${service}%0A%0A` +
        `*Mensaje:*%0A${message}`;
    
    // 3. Open WhatsApp
    window.open(`https://wa.me/56992313861?text=${whatsappMessage}`, '_blank');
    
    // Reset form and button
    submitBtn.innerHTML = '<span>¡Mensaje enviado!</span><i class="fas fa-check"></i>';
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
    }, 2000);
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .achievement-category, .triatlon-card, .gallery-item').forEach(el => {
    observer.observe(el);
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.dataset.suffix || '');
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (!isNaN(target)) {
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===== PARALLAX EFFECT ON HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

console.log('🏊‍♀️🚴‍♀️🏃‍♀️ Fernanda Tapia Santander - Website loaded successfully!');
