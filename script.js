// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const projectsGrid = document.getElementById('projectsGrid');

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Navigation
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Smooth Scrolling
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        closeMobileMenu();
    }
}

// Projects Data
const projects = [
    {
        id: 1,
        title: 'E-commerce Product Strategy',
        description: 'Led product strategy for a B2B e-commerce platform, resulting in 40% increase in user engagement and 25% revenue growth through data-driven feature prioritization.',
        image: '📈',
        technologies: ['Product Strategy', 'User Research', 'A/B Testing', 'Analytics'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true
    },
    {
        id: 2,
        title: 'Mobile App Launch',
        description: 'Managed end-to-end product launch for a mobile task management app, achieving 100K+ downloads in first quarter and 4.5-star rating.',
        image: '📱',
        technologies: ['Product Launch', 'User Experience', 'Market Research', 'Agile'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true
    },
    {
        id: 3,
        title: 'Customer Analytics Dashboard',
        description: 'Designed and launched a comprehensive analytics dashboard that improved customer insights by 60% and reduced decision-making time by 50%.',
        image: '📊',
        technologies: ['Data Analytics', 'SQL', 'Tableau', 'User Research'],
        liveUrl: '#',
        githubUrl: '#',
        featured: false
    },
    {
        id: 4,
        title: 'SaaS Product Optimization',
        description: 'Optimized a SaaS product through user research and A/B testing, resulting in 35% improvement in conversion rates and 20% reduction in churn.',
        image: '⚡',
        technologies: ['Product Optimization', 'A/B Testing', 'User Research', 'Analytics'],
        liveUrl: '#',
        githubUrl: '#',
        featured: false
    },
    {
        id: 5,
        title: 'Enterprise Feature Rollout',
        description: 'Led the successful rollout of enterprise features to 500+ customers, achieving 95% adoption rate and positive customer feedback.',
        image: '🏢',
        technologies: ['Enterprise PM', 'Stakeholder Management', 'Product Launch', 'Customer Success'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true
    },
    {
        id: 6,
        title: 'User Experience Redesign',
        description: 'Redesigned core user flows based on extensive user research, resulting in 45% improvement in user satisfaction scores.',
        image: '🎨',
        technologies: ['UX Design', 'User Research', 'Prototyping', 'Design Thinking'],
        liveUrl: '#',
        githubUrl: '#',
        featured: false
    }
];

// Render Projects
function renderProjects() {
    if (!projectsGrid) return;
    
    const featuredProjects = projects.filter(project => project.featured);
    const otherProjects = projects.filter(project => !project.featured);
    const allProjects = [...featuredProjects, ...otherProjects];
    
    projectsGrid.innerHTML = allProjects.map(project => `
        <div class="project-card fade-in-up" style="animation-delay: ${project.id * 0.1}s">
            <div class="project-image">
                ${project.image}
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.liveUrl}" class="demo" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.githubUrl}" class="github" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Contact Form Handler
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    e.target.reset();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // Dark mode navbar
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            }
        }
    });
}

// Typing Effect for Hero Title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // Disable typing effect - show text immediately
    // Uncomment the code below if you want to re-enable the typing effect
    
    /*
    const originalText = heroTitle.innerHTML;
    const words = originalText.split(' ');
    heroTitle.innerHTML = '';
    
    let wordIndex = 0;
    let charIndex = 0;
    
    function typeWord() {
        if (wordIndex < words.length) {
            const word = words[wordIndex];
            const wordSpan = document.createElement('span');
            wordSpan.style.opacity = '0';
            wordSpan.style.transform = 'translateY(20px)';
            wordSpan.style.transition = 'all 0.3s ease';
            wordSpan.textContent = word + ' ';
            
            heroTitle.appendChild(wordSpan);
            
            setTimeout(() => {
                wordSpan.style.opacity = '1';
                wordSpan.style.transform = 'translateY(0)';
            }, 100);
            
            wordIndex++;
            setTimeout(typeWord, 200);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWord, 500);
    */
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Render projects
    renderProjects();
    
    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    hamburger.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(() => {
    // Any scroll-based functionality can go here
}, 10)); 