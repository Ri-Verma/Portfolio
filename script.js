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

    // Content parallax - use relative offset from section
    const content = section.querySelector('.content, .card-content');
    if (content && !isMobile) {
      // Calculate how far the section is from the viewport center
      const sectionCenter = sectionTop + (sectionHeight / 2);
      const viewportCenter = scrolled + (windowHeight / 2);
      const distanceFromCenter = (viewportCenter - sectionCenter) / windowHeight;

      // Apply a subtle parallax effect relative to section position
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

  document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
  });

  document.querySelectorAll('.cert-item').forEach(cert => {
    observer.observe(cert);
  });

  document.querySelectorAll('.tech-badge').forEach(badge => {
    observer.observe(badge);
  });
}

function animateElement(element) {
  const classList = element.classList;

  if (classList.contains('project-card')) {
    anime({
      targets: element,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutExpo'
    });
  }

  if (classList.contains('cert-item')) {
    anime({
      targets: element,
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 800,
      easing: 'easeOutExpo'
    });
  }

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
      easing: 'easeOutExpo'
    }, '-=500')
    .add({
      targets: '.cursor-blink',
      opacity: [1, 0.3, 1],
      duration: 1000,
      easing: 'easeInOutQuad',
      loop: true
    }, 0);
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

// Initialize on page load
window.addEventListener('load', () => {
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