

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initializeLoadingScreen();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize stats counter
    initializeStatsCounter();
    
    // Initialize testimonials
    initializeTestimonials();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize form handling
    initializeFormHandling();
});

// Loading Screen
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 500);
    }, 2000);
}

// Animation Observer
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('portfolio-item')) {
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

// Stats Counter Animation
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        });
    });
    
    if (statNumbers.length > 0) {
        observer.observe(statNumbers[0].closest('.stats-container'));
    }
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
}






// Testimonials Functionality
let currentTestimonialIndex = 0;
let testimonialInterval;

function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length === 0) return;
    
    // Auto-rotate testimonials
    testimonialInterval = setInterval(() => {
        changeTestimonial(1);
    }, 5000);
    
    // Pause on hover
    const testimonialSection = document.querySelector('.testimonials-slider');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialSection.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                changeTestimonial(1);
            }, 5000);
        });
    }
}

function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function changeTestimonial(direction) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    currentTestimonialIndex += direction;
    
    if (currentTestimonialIndex >= testimonials.length) {
        currentTestimonialIndex = 0;
    } else if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = testimonials.length - 1;
    }
    
    showTestimonial(currentTestimonialIndex);
}

function currentTestimonial(index) {
    currentTestimonialIndex = index - 1;
    showTestimonial(currentTestimonialIndex);
}
const mslCarousel = document.getElementById('mslCarouselTrack');
const mslOriginalContent = mslCarousel.innerHTML;
const mslSlideHeight = 250;
let mslIndex = 0;

mslCarousel.innerHTML += mslOriginalContent;
const mslTotalSlides = mslCarousel.children.length;

setInterval(() => {
  mslIndex++;
  mslCarousel.style.transform = `translateY(-${mslIndex * mslSlideHeight}px)`;
  if (mslIndex >= mslTotalSlides / 2) {
    setTimeout(() => {
      mslCarousel.style.transition = 'none';
      mslCarousel.style.transform = 'translateY(0)';
      mslIndex = 0;
      setTimeout(() => {
        mslCarousel.style.transition = 'transform 1s ease-in-out';
      }, 50);
    }, 1000);
  }
}, 3000);

const mslOverlay = document.getElementById('msl-preview-overlay');
const mslPreviewImg = document.getElementById('msl-preview-img');
const mslCloseBtn = document.getElementById('msl-close-btn');

document.querySelectorAll('.msl-slide-image-wrapper').forEach(wrapper => {
  wrapper.addEventListener('click', () => {
    const img = wrapper.querySelector('img');
    mslPreviewImg.src = img.src;
    mslOverlay.style.display = 'flex';
  });
});

mslCloseBtn.addEventListener('click', () => {
  mslOverlay.style.display = 'none';
  mslPreviewImg.src = '';
});

mslOverlay.addEventListener('click', (e) => {
  if (e.target === mslOverlay) {
    mslOverlay.style.display = 'none';
    mslPreviewImg.src = '';
  }
});
// Navigation
function initializeNavigation() {
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll handling for navigation
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const menu = document.querySelector('.nav-menu');
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
            
            // Handle smooth scrolling
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                scrollToSection(href.substring(1));
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function toggleMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}




// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});











// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#667eea'
    };
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="font-size: 1.25rem; color: ${colors[type]};">${icons[type] || icons.info}</div>
            <div style="flex: 1;">${message}</div>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 1.25rem; cursor: pointer; color: #64748b;">×</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: white;
        border-radius: 1rem;
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
        padding: 1rem 1.5rem;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        border-left: 4px solid ${colors[type]};
        max-width: 400px;
        min-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Performance Optimization
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Accessibility improvements
function initializeAccessibility() {
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [tabindex]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
                    e.preventDefault();
                    element.click();
                }
            }
        });
    });
    
    // Add focus indicators
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    })
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error tracking service
});

// Service worker registration for PWA features (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}


