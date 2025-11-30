const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const counters = document.querySelectorAll('.counter');
const filterButtons = document.querySelectorAll('.filter-btn');
const masonryItems = document.querySelectorAll('.masonry-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const videoModal = document.querySelector('.video-modal');
const videoElement = videoModal.querySelector('video');
const videoCards = document.querySelectorAll('.video-card');
const contactForm = document.querySelector('.contact-form');
const statusMessage = document.querySelector('.form-status');
const fadeTargets = document.querySelectorAll('.fade-up');

document.getElementById('year').textContent = new Date().getFullYear();

// Mobile navigation
navToggle.addEventListener('click', () => {
  body.classList.toggle('nav-open');
});

navLinks.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    body.classList.remove('nav-open');
  }
});

// Smooth parallax hero
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const offset = window.pageYOffset;
  hero.style.backgroundPositionY = `${offset * 0.4}px`;
});

// Intersection Observer for fade-ups
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeTargets.forEach((target) => observer.observe(target));

// Counter animation
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const updateCount = () => {
          const target = +counter.dataset.target;
          const count = +counter.innerText;
          const increment = Math.ceil(target / 100);

          if (count < target) {
            counter.innerText = count + increment;
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
        counterObserver.unobserve(counter);
      }
    });
  },
  { threshold: 0.4 }
);

counters.forEach((counter) => counterObserver.observe(counter));

// Portfolio filtering
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    masonryItems.forEach((item) => {
      const category = item.dataset.category;
      if (filter === 'all' || category === filter) {
        item.style.display = 'block';
        setTimeout(() => (item.style.opacity = '1'), 10);
      } else {
        item.style.opacity = '0';
        setTimeout(() => (item.style.display = 'none'), 200);
      }
    });
  });
});

// Lightbox logic
masonryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImage.src = img.src;
    lightbox.classList.add('active');
  });
});

const closeLightbox = () => {
  lightbox.classList.remove('active');
  lightboxImage.src = '';
};

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target.classList.contains('lightbox-close')) {
    closeLightbox();
  }
});

// Video modal logic
videoCards.forEach((card) => {
  card.addEventListener('click', () => {
    const src = card.dataset.video;
    videoElement.src = src; // replace with actual hosted mp4
    videoModal.classList.add('active');
    videoElement.play().catch(() => {});
  });
});

const closeVideo = () => {
  videoModal.classList.remove('active');
  videoElement.pause();
  videoElement.currentTime = 0;
  videoElement.src = '';
};

videoModal.addEventListener('click', (event) => {
  if (event.target === videoModal || event.target.classList.contains('video-close')) {
    closeVideo();
  }
});

// Contact form validation
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  statusMessage.textContent = '';

  const formData = new FormData(contactForm);
  const errors = [];

  formData.forEach((value, key) => {
    if (!value.trim()) {
      errors.push(`${key} is required`);
    }
  });

  const email = formData.get('email');
  const phone = formData.get('phone');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9+\-\s()]{7,}$/;

  if (email && !emailPattern.test(email)) {
    errors.push('Enter a valid email');
  }

  if (phone && !phonePattern.test(phone)) {
    errors.push('Enter a valid phone');
  }

  if (errors.length) {
    statusMessage.textContent = errors[0];
    statusMessage.style.color = '#ff6b6b';
    return;
  }

  // Placeholder success (replace with actual submit logic)
  statusMessage.textContent = 'Thank you. Expect a reply within 24 hours.';
  statusMessage.style.color = 'var(--accent)';
  contactForm.reset();
});

