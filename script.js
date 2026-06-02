const roles = ['Data Scientist.', 'AI/ML Engineer.', 'Web Developer.'];
const typingText = document.getElementById('typing-text');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typingSpeed = isDeleting ? 40 : 100;
    
    if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeRole, typingSpeed);
}

document.addEventListener('DOMContentLoaded', typeRole);

function highlightNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    let currentSection = null;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

document.addEventListener('DOMContentLoaded', highlightNavLink);

function addNavBlurEffect() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', addNavBlurEffect);

document.addEventListener('DOMContentLoaded', () => {
    // Close popup when clicking close button or outside
    function initPopups() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.close-btn') || e.target.classList.contains('popup')) {
                closePopup();
            }
        });

        // Close popup with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closePopup();
            }
        });

        // Add click event to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const popupId = card.getAttribute('data-popup');
                if (popupId) {
                    openPopup(popupId);
                }
            });
        });

        // Initialize popups as hidden
        document.querySelectorAll('.popup').forEach(popup => {
            popup.style.display = 'none';
        });
    }

    function openPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            // Close any open popup first
            closePopup();
            
            // Show new popup
            document.body.style.overflow = 'hidden';
            popup.style.display = 'flex';
            
            // Trigger reflow for smooth animation
            void popup.offsetWidth;
            popup.classList.add('showing');
        }
    }

    function closePopup() {
        const popup = document.querySelector('.popup.showing');
        if (popup) {
            popup.classList.remove('showing');
            document.body.style.overflow = 'auto';
            
            // Wait for transition to complete before hiding
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        }
    }

    // Initialize carousel and popups when DOM is loaded
    startCarousel();
    initPopups();
});

const burger = document.querySelector('.burger');
const navLinks = document.querySelector('nav ul');
const navItems = document.querySelectorAll('nav ul li a');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close burger menu when any nav item is clicked
navItems.forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});



const track = document.querySelector('.projects-track');
const cards = document.querySelectorAll('.project-card');
const dotsContainer = document.querySelector('.carousel-dots');

// Carousel configuration
const visibleCards = 1; // Show 1 card at a time
const totalCards = cards.length;
const totalDots = 4; // Fixed number of dots
const cardsPerDot = Math.ceil(totalCards / totalDots); // Calculate cards per dot
let currentIndex = 0;
let isTransitioning = false;
let carouselInterval;

// Set initial position
track.style.transform = 'translateX(0%)';

// Create exactly 4 dots
for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    const targetIndex = Math.floor((i / totalDots) * totalCards);
    dot.addEventListener('click', () => goToCard(targetIndex));
    dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll('.carousel-dots span');

function updateDots(index) {
    const dots = document.querySelectorAll('.carousel-dots span');
    const cardGroup = Math.floor((index / totalCards) * totalDots);
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === cardGroup);
    });
}

function goToCard(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Ensure index is within bounds
    const maxIndex = Math.max(0, totalCards - visibleCards);
    currentIndex = Math.min(index, maxIndex);
    
    // Calculate movement based on card width (100% per card)
    const moveX = (25 / visibleCards) * currentIndex;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${moveX}%)`;
    updateDots(currentIndex);
    
    setTimeout(() => {
        isTransitioning = false;
    }, 100);
}

function nextSlide() {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    // Calculate next index
    const nextIndex = (currentIndex + 1) % totalCards;
    currentIndex = nextIndex;
    
    // Calculate movement based on card width (100% per card)
    const moveX = (25 / visibleCards) * currentIndex;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${moveX}%)`;
    
    // Update dots
    updateDots(currentIndex);
    
    // Reset transition lock after animation
    setTimeout(() => {
        isTransitioning = false;
    }, 100);
}

// Function to start the carousel
function startCarousel() {
    if (!carouselInterval) {
        carouselInterval = setInterval(nextSlide, 3000);
    }
}

// Function to stop the carousel
function stopCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

// Start the carousel initially
startCarousel();

// Pause on hover
track.addEventListener('mouseenter', stopCarousel);

// Resume when mouse leaves
track.addEventListener('mouseleave', startCarousel);

// Update the openPopup function
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        // Pause the carousel when popup is in block state
        if (getComputedStyle(popup).display === 'block') {
            stopCarousel();
        }
        
        // Show new popup
        document.body.style.overflow = 'hidden';
        popup.style.display = 'flex';
        
        // Trigger reflow for smooth animation
        void popup.offsetWidth;
        popup.classList.add('showing');
    }
}

// Update the closePopup function
function closePopup() {
    const popup = document.querySelector('.popup.showing');
    if (popup) {
        popup.classList.remove('showing');
        document.body.style.overflow = 'auto';
        
        // Wait for transition to complete before hiding
        setTimeout(() => {
            popup.style.display = 'none';
            // Resume carousel when popup is closed
            if (getComputedStyle(popup).display !== 'block') {
                startCarousel();
            }
        }, 300);
    }
}