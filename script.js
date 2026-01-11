// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scroll for navbar links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// typing animation
const typingElement = document.getElementById('typing-text');
const phrases = [
  'Full-Stack Developer',
  'Software Engineer',
  'Web Developer',
  'Problem Solver'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseAfterTyping = 2000;
const pauseAfterDeleting = 500;

function typeText() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    // Deleting characters
    typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeText, pauseAfterDeleting);
      return;
    }
    setTimeout(typeText, deletingSpeed);
  } else {
    // Typing characters
    typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeText, pauseAfterTyping);
      return;
    }
    setTimeout(typeText, typingSpeed);
  }
}

// looping
function setupMarqueeLoop() {
  const marqueeContainers = document.querySelectorAll('.marquee-track');

  marqueeContainers.forEach(track => {
    const items = track.children;
    const itemCount = items.length;

    // Clone all items and append to track for seamless loop
    for (let i = 0; i < itemCount; i++) {
      const clone = items[i].cloneNode(true);
      track.appendChild(clone);
    }
  });
}

// Check if device is mobile
function isMobileDevice() {
  return window.matchMedia('(max-width: 768px)').matches;
}

let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const isMobile = isMobileDevice();

  document.querySelectorAll('[data-parallax]').forEach(section => {
    let parallaxValue = parseFloat(section.dataset.parallax);

    if (isMobile) {
      parallaxValue *= 0.5;
    }

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrollProgress = (scrolled + windowHeight - sectionTop) / (sectionHeight + windowHeight);

    const offset = scrolled * parallaxValue;
    const scale = 1 + (scrollProgress * 0.03);
    const rotateX = scrollProgress * 1;

    const bg = section.querySelector('.parallax-bg');

    if (bg) {
      if (isMobile) {
        bg.style.transform = `translateY(${offset}px)`;
      } else {
        bg.style.transform = `translateY(${offset}px) scale(${scale}) perspective(1000px) rotateX(${rotateX}deg)`;
      }
    }

    // Content parallax 
    const content = section.querySelector('.content, .card-content');
    if (content && !isMobile) {
      const sectionCenter = sectionTop + (sectionHeight / 2);
      const viewportCenter = scrolled + (windowHeight / 2);
      const distanceFromCenter = (viewportCenter - sectionCenter) / windowHeight;
      const contentOffset = distanceFromCenter * 30 * parallaxValue;
      content.style.transform = `translateY(${contentOffset}px)`;
    }
  });

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });

function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateElement(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.tech-badge').forEach(badge => {
    observer.observe(badge);
  });
}

function animateElement(element) {
  const classList = element.classList;

  if (classList.contains('tech-badge')) {
    anime({
      targets: element,
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 600,
      easing: 'easeOutExpo'
    });
  }
}

// Hero section animations
function animateHero() {
  anime.timeline()
    .add({
      targets: '.hero-title',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1000,
      easing: 'easeOutExpo'
    })
    .add({
      targets: '.hero-subtitle',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      easing: 'easeOutExpo',
      complete: () => {
        // Start typing animation after hero animates in
        setTimeout(typeText, 500);
      }
    }, '-=500');
}

// Section titles animation
function animateSectionTitles() {
  document.querySelectorAll('.section-title').forEach((title, index) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: title,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 900,
            easing: 'easeOutExpo'
          });
          observer.unobserve(title);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(title);
  });
}

// ============ CERTIFICATE MODAL ============
function setupCertModal() {
  const modal = document.getElementById('cert-modal');
  const modalImage = document.getElementById('modal-cert-image');
  const modalTitle = document.getElementById('modal-cert-title');
  const modalIssuer = document.getElementById('modal-cert-issuer');
  const modalClose = document.querySelector('.modal-close');

  // Open modal when cert card is clicked
  document.addEventListener('click', (e) => {
    const certCard = e.target.closest('.cert-card');
    if (certCard) {
      const image = certCard.querySelector('.cert-image img');
      const title = certCard.querySelector('h3');
      const issuer = certCard.querySelector('p');

      modalImage.src = image.src;
      modalImage.alt = image.alt;
      modalTitle.textContent = title.textContent;
      modalIssuer.textContent = 'Issued by: ' + issuer.textContent;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close modal when clicking X button
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close modal when clicking outside content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Initialize on page load
window.addEventListener('load', () => {
  setupMarqueeLoop();
  setupCertModal();
  animateHero();
  animateSectionTitles();
  observeElements();
  updateParallax();
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.style.borderBottomColor = 'rgba(0, 217, 255, 0.3)';
  } else {
    navbar.style.borderBottomColor = 'var(--border)';
  }
});

document.addEventListener('touchstart', function () { }, { passive: true });
document.addEventListener('touchmove', function () { }, { passive: true });