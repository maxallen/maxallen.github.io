// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (nav && nav.classList.contains('active') && 
        !nav.contains(event.target) && 
        !menuToggle.contains(event.target)) {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
});

// Smooth Scrolling
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

// Intersection Observer for Fade-in Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add fade-in class to elements
document.querySelectorAll('.project-card, .blog-card').forEach(element => {
  element.classList.add('fade-in-element');
  observer.observe(element);
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
  .fade-in-element {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .fade-in {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });
    
    if (isValid) {
      // Here you would typically send the form data to a server
      console.log('Form submitted successfully');
      form.reset();
    }
  });
});

// Add error styles
const errorStyle = document.createElement('style');
errorStyle.textContent = `
  .error {
    border-color: var(--error-color) !important;
  }
`;
document.head.appendChild(errorStyle);

// Theme Toggle (Optional)
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
`;

// Add theme toggle button to header
const header = document.querySelector('header .container');
if (header) {
  header.appendChild(themeToggle);
}

// Theme toggle functionality
themeToggle.addEventListener('click', function() {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}

// Add dark theme styles
const darkThemeStyle = document.createElement('style');
darkThemeStyle.textContent = `
  .dark-theme {
    --background-color: #1a1a1a;
    --background-alt: #2d2d2d;
    --text-color: #ffffff;
    --text-light: #a0a0a0;
    --border-color: #404040;
  }
  
  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: var(--text-color);
  }
`;
document.head.appendChild(darkThemeStyle); 