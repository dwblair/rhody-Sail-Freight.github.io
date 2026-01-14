// Rhody Sail Freight - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {

  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');

      // Animate hamburger to X
      const spans = mobileNavToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Form submission handling
  const signupForms = document.querySelectorAll('.signup-form');

  signupForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = form.querySelector('input[type="email"]').value;
      const role = form.querySelector('select')?.value || 'general';

      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'form-success';
      successMessage.innerHTML = `
        <h3>Thanks for joining!</h3>
        <p>We've added <strong>${email}</strong> to our waitlist. We'll be in touch soon with updates about Rhody Sail Freight.</p>
      `;

      // Add success styling
      successMessage.style.cssText = `
        background: #68d391;
        color: #1a365d;
        padding: 2rem;
        border-radius: 8px;
        text-align: center;
        animation: fadeIn 0.3s ease;
      `;

      // Replace form with success message
      form.parentNode.replaceChild(successMessage, form);

      // Log for demo purposes (in production, this would send to a backend)
      console.log('Form submitted:', { email, role });
    });
  });

  // Add fade-in animation for success message
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with animation classes
  document.querySelectorAll('.card, .testimonial, .step, .trust-badge').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Add visible state styles
  const animationStyle = document.createElement('style');
  animationStyle.textContent = `
    .card.visible, .testimonial.visible, .step.visible, .trust-badge.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(animationStyle);

  // Active navigation highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

});
