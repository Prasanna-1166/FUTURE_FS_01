window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const menuIcon = mobileMenuBtn.querySelector('i');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change icon between bars and times
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    });
});

// Simple typing effect
const text = "Prasanna Kumar";
let idx = 0;
const speed = 100;

function typeWriter() {
    if (idx < text.length) {
        document.getElementById("name-typing").innerHTML += text.charAt(idx);
        idx++;
        setTimeout(typeWriter, speed);
    }
}

// Clear initial text for typing effect
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById("name-typing");
    if (typingElement) {
        typingElement.innerText = "";
        typeWriter();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('portfolio-contact');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;

        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('https://formsubmit.co/ajax/prasann.1166@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Something went wrong. Please try again later.', 'error');
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Custom Notification Function
function showNotification(message, type) {
    // Check if notification already exists
    const existingNotify = document.querySelector('.notification');
    if (existingNotify) existingNotify.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    
    // Simple styling via JS for convenience or move to CSS
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '1rem 2rem',
        borderRadius: '10px',
        backgroundColor: type === 'success' ? '#22c55e' : '#ef4444',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '2000',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });

    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.style.opacity = '1', 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Scroll Reveal Animation (Enhanced)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            // If it's a grid, reveal children with stagger
            if (entry.target.classList.contains('skills-grid') || 
                entry.target.classList.contains('projects-grid') ||
                entry.target.classList.contains('certifications-grid')) {
                const children = entry.target.querySelectorAll('.card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('reveal-active');
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Initialize Reveal Elements
document.addEventListener('DOMContentLoaded', () => {
    // Reveal Sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal-element');
        revealOnScroll.observe(section);
    });

    // Reveal Grids for Stagger
    document.querySelectorAll('.skills-grid, .projects-grid, .certifications-grid').forEach(grid => {
        revealOnScroll.observe(grid);
    });

    // Reveal Cards individually if not in those grids (e.g. About content)
    document.querySelectorAll('.about-content, .about-image').forEach(el => {
        el.classList.add('reveal-element');
        revealOnScroll.observe(el);
    });
});
