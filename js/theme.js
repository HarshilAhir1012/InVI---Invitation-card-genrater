// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = document.getElementById('theme-icon');

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme') || 
                 (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply saved theme
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle functionality
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add animation class
    document.body.classList.add('theme-transition');
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);
  });
}

function updateThemeIcon(theme) {
  if (!themeIcon) return;
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeIcon.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

// Customization Panel
const customizationToggle = document.querySelector('.customization-toggle');
const customizationPanel = document.querySelector('.customization-panel');

if (customizationToggle && customizationPanel) {
  customizationToggle.addEventListener('click', () => {
    customizationPanel.classList.toggle('open');
  });
}

// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('animate-fade-in');
    }
  });
}

// Initialize animations and effects
window.addEventListener('load', () => {
  // Add animation classes to elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach((el, index) => {
    el.classList.add('animate-fade-in');
    el.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Add floating effect to elements with data-float attribute
  document.querySelectorAll('[data-float]').forEach(el => {
    el.classList.add('animate-float');
    el.style.animationDuration = (Math.random() * 3 + 3) + 's';
  });
  
  // Add glow effect to elements with data-glow attribute
  document.querySelectorAll('[data-glow]').forEach(el => {
    el.classList.add('animate-glow');
    el.style.animationDuration = (Math.random() * 2 + 2) + 's';
  });
  
  // Create floating particles for elements with data-particles attribute
  document.querySelectorAll('[data-particles]').forEach(container => {
    createParticles(container);
  });
  
  // Initial scroll animation check
  animateOnScroll();
});

// Create floating particles effect
function createParticles(container) {
  const particleCount = 15;
  const particles = [];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2px and 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position within container
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random animation duration between 3s and 8s
    const duration = Math.random() * 5 + 3;
    
    // Random delay up to 5s
    const delay = Math.random() * 5;
    
    // Apply styles
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
    particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
    
    container.appendChild(particle);
    particles.push(particle);
  }
  
  return particles;
}

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Customization functions
function updateFontFamily(font) {
  document.documentElement.style.setProperty('--font-primary', font);
  localStorage.setItem('fontFamily', font);
}

function updateAccentColor(color) {
  document.documentElement.style.setProperty('--accent-color', color);
  localStorage.setItem('accentColor', color);
}

function updateAnimationSpeed(speed) {
  document.documentElement.style.setProperty('--animation-speed', `${speed}ms`);
  localStorage.setItem('animationSpeed', speed);
}

// Apply saved customizations
function applySavedCustomizations() {
  const savedFont = localStorage.getItem('fontFamily');
  const savedAccentColor = localStorage.getItem('accentColor');
  const savedAnimationSpeed = localStorage.getItem('animationSpeed');
  
  if (savedFont) updateFontFamily(savedFont);
  if (savedAccentColor) updateAccentColor(savedAccentColor);
  if (savedAnimationSpeed) updateAnimationSpeed(savedAnimationSpeed);
}

// Initialize customizations
document.addEventListener('DOMContentLoaded', () => {
  applySavedCustomizations();
  
  // Add animation to all interactive elements
  const interactiveElements = 'button, a, input[type="button"], input[type="submit"], .card, .btn';
  document.querySelectorAll(interactiveElements).forEach(el => {
    el.addEventListener('mousedown', () => {
      el.classList.add('clicked');
      setTimeout(() => el.classList.remove('clicked'), 200);
    });
  });
});

// Export functions for use in other files
window.themeUtils = {
  updateFontFamily,
  updateAccentColor,
  updateAnimationSpeed
};
