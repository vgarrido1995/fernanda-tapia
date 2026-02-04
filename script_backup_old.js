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
    const whatsappMessage = `Â¡Hola Fernanda! ðŸ‘‹%0A%0A` +
        `*Nombre:* ${name}%0A` +
        `*Email:* ${email}%0A` +
        `${phone ? `*TelÃ©fono:* ${phone}%0A` : ''}` +
        `*Servicio de interÃ©s:* ${service}%0A%0A` +
        `*Mensaje:*%0A${message}`;
    
    // 3. Open WhatsApp
    window.open(`https://wa.me/56992313861?text=${whatsappMessage}`, '_blank');
    
    // Reset form and button
    submitBtn.innerHTML = '<span>Â¡Mensaje enviado!</span><i class="fas fa-check"></i>';
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

console.log('ðŸŠâ€â™€ï¸ðŸš´â€â™€ï¸ðŸƒâ€â™€ï¸ Fernanda Tapia Santander - Website loaded successfully!');

// ===== LANGUAGE SWITCHER =====
const langBtns = document.querySelectorAll('.lang-btn');
const translatableElements = document.querySelectorAll('[data-es][data-en]');

// Translations for static content
const translations = {
    es: {
        heroSubtitle: 'Triatleta Semi-Pro  Profesora de Educación Física  Licenciada en Educación',
        heroDescription: 'Ex Seleccionada Nacional de Baloncesto y Ciclismo en Ruta. Profesora de Educación Física dedicada a impulsar el rendimiento deportivo.',
        btnServices: 'Mis Servicios',
        btnContact: 'Contáctame',
        statDisciplines: 'Disciplinas',
        statYears: 'Años en Deporte',
        statCompetitions: 'Competencias',
        aboutTag: 'Conóceme',
        aboutTitle: 'Sobre Mí',
        aboutSubtitle: 'Pasión por el deporte de alto rendimiento',
        careerTag: 'Mi Historia',
        careerTitle: 'Trayectoria Deportiva',
        sponsorsTag: 'Confían en mí',
        sponsorsTitle: 'Mis Auspiciadores',
        servicesTag: 'Lo que ofrezco',
        servicesTitle: 'Mis Servicios',
        servicesSubtitle: 'Servicios profesionales para mejorar tu rendimiento deportivo',
        galleryTag: 'Momentos',
        galleryTitle: 'Galería',
        contactTag: 'Hablemos',
        contactTitle: 'Contacto',
        contactDescription: '¿Listo para llevar tu rendimiento al siguiente nivel? Contáctame y comencemos a trabajar juntos en tus objetivos deportivos.',
        formName: 'Nombre completo',
        formEmail: 'Email',
        formPhone: 'Teléfono (opcional)',
        formService: 'Servicio de interés',
        formMessage: 'Tu mensaje',
        formSubmit: 'Enviar mensaje',
        scroll: 'Scroll'
    },
    en: {
        heroSubtitle: 'Semi-Pro Triathlete  Physical Education Teacher  Education Graduate',
        heroDescription: 'Former National Team Member in Basketball and Road Cycling. Physical Education Teacher dedicated to boosting athletic performance.',
        btnServices: 'My Services',
        btnContact: 'Contact Me',
        statDisciplines: 'Disciplines',
        statYears: 'Years in Sports',
        statCompetitions: 'Competitions',
        aboutTag: 'Meet Me',
        aboutTitle: 'About Me',
        aboutSubtitle: 'Passion for high performance sports',
        careerTag: 'My Story',
        careerTitle: 'Sports Career',
        sponsorsTag: 'They Trust Me',
        sponsorsTitle: 'My Sponsors',
        servicesTag: 'What I Offer',
        servicesTitle: 'My Services',
        servicesSubtitle: 'Professional services to improve your athletic performance',
        galleryTag: 'Moments',
        galleryTitle: 'Gallery',
        contactTag: 'Let\'s Talk',
        contactTitle: 'Contact',
        contactDescription: 'Ready to take your performance to the next level? Contact me and let\'s start working together on your athletic goals.',
        formName: 'Full name',
        formEmail: 'Email',
        formPhone: 'Phone (optional)',
        formService: 'Service of interest',
        formMessage: 'Your message',
        formSubmit: 'Send message',
        scroll: 'Scroll'
    }
};

function switchLanguage(lang) {
    // Update active button
    langBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update nav links
    translatableElements.forEach(el => {
        el.textContent = el.dataset[lang];
    });
    
    // Update other content
    const t = translations[lang];
    
    // Hero section
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
    
    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) heroDesc.textContent = t.heroDescription;
    
    // Buttons
    const btnPrimary = document.querySelector('.hero-buttons .btn-primary');
    if (btnPrimary) btnPrimary.textContent = t.btnServices;
    
    const btnSecondary = document.querySelector('.hero-buttons .btn-secondary');
    if (btnSecondary) btnSecondary.textContent = t.btnContact;
    
    // Stats
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels.length >= 3) {
        statLabels[0].textContent = t.statDisciplines;
        statLabels[1].textContent = t.statYears;
        statLabels[2].textContent = t.statCompetitions;
    }
    
    // Section tags and titles
    const sectionTags = document.querySelectorAll('.section-tag');
    const sectionTitles = document.querySelectorAll('.section-title');
    
    // About
    if (sectionTags[0]) sectionTags[0].textContent = t.aboutTag;
    if (sectionTitles[0]) sectionTitles[0].textContent = t.aboutTitle;
    const aboutH3 = document.querySelector('.about-text h3');
    if (aboutH3) aboutH3.textContent = t.aboutSubtitle;
    
    // Career
    if (sectionTags[1]) sectionTags[1].textContent = t.careerTag;
    if (sectionTitles[1]) sectionTitles[1].textContent = t.careerTitle;
    
    // Sponsors
    if (sectionTags[2]) sectionTags[2].textContent = t.sponsorsTag;
    if (sectionTitles[2]) sectionTitles[2].textContent = t.sponsorsTitle;
    
    // Services
    if (sectionTags[3]) sectionTags[3].textContent = t.servicesTag;
    if (sectionTitles[3]) sectionTitles[3].textContent = t.servicesTitle;
    const servicesSubtitle = document.querySelector('.services .section-subtitle');
    if (servicesSubtitle) servicesSubtitle.textContent = t.servicesSubtitle;
    
    // Gallery
    if (sectionTags[4]) sectionTags[4].textContent = t.galleryTag;
    if (sectionTitles[4]) sectionTitles[4].textContent = t.galleryTitle;
    
    // Contact
    if (sectionTags[5]) sectionTags[5].textContent = t.contactTag;
    if (sectionTitles[5]) sectionTitles[5].textContent = t.contactTitle;
    const contactDesc = document.querySelector('.contact-info p');
    if (contactDesc) contactDesc.textContent = t.contactDescription;
    
    // Form labels
    const formLabels = document.querySelectorAll('.form-group label');
    if (formLabels.length >= 5) {
        formLabels[0].textContent = t.formName;
        formLabels[1].textContent = t.formEmail;
        formLabels[2].textContent = t.formPhone;
        formLabels[3].textContent = t.formService;
        formLabels[4].textContent = t.formMessage;
    }
    
    const submitBtn = document.querySelector('.submit-btn span');
    if (submitBtn) submitBtn.textContent = t.formSubmit;
    
    // Scroll indicator
    const scrollText = document.querySelector('.scroll-indicator span');
    if (scrollText) scrollText.textContent = t.scroll;
    
    // Save preference
    localStorage.setItem('preferredLang', lang);
}

// Event listeners for language buttons
langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        switchLanguage(btn.dataset.lang);
    });
});

// Always start in Spanish (default)
