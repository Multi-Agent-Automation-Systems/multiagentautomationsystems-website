// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const signInBtn = document.querySelector('.sign-in-btn');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('mobile-menu-open');
  });

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('mobile-menu-open');
    });
  });

  // Close mobile menu when clicking on sign in button in menu
  const mobileSignInBtn = navMenu.querySelector('.sign-in-btn');
  if (mobileSignInBtn) {
    mobileSignInBtn.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('mobile-menu-open');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('mobile-menu-open');
    }
  });
}

// Modal functionality
const contactModal = document.getElementById('contactModal');
const authModal = document.getElementById('authModal');
const applicationModal = document.getElementById('applicationModal');
const contactBtn = document.querySelector('.contact-btn');
const modalCloses = document.querySelectorAll('.modal-close');

// Contact modal
if (contactBtn && contactModal) {
  contactBtn.addEventListener('click', () => {
    contactModal.classList.add('active');
    trapFocus(contactModal);
  });
}

// Auth modal
if (signInBtn && authModal) {
  signInBtn.addEventListener('click', () => {
    authModal.classList.add('active');
    trapFocus(authModal);
  });
}

// Mobile sign in button
const mobileSignInBtn = document.querySelector('.sign-in-btn-mobile');
if (mobileSignInBtn && authModal) {
  mobileSignInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Close mobile menu first
    if (hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('mobile-menu-open');
    }
    // Then open auth modal
    authModal.classList.add('active');
    trapFocus(authModal);
  });
}

// Auth card flip functionality
const authCard = document.querySelector('.auth-card');
const authToggles = document.querySelectorAll('.auth-toggle');

authToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const target = toggle.getAttribute('data-target');
    if (target === 'signup') {
      authCard.classList.add('flipped');
    } else {
      authCard.classList.remove('flipped');
    }
  });
});

// Form validation
const signupForm = document.getElementById('signupForm');
const signinForm = document.getElementById('signinForm');

function validateField(field) {
  const errorMessage = field.nextElementSibling;
  if (field.validity.valid) {
    if (errorMessage && errorMessage.classList.contains('error-message')) {
      errorMessage.style.opacity = '0';
    }
  } else {
    if (errorMessage && errorMessage.classList.contains('error-message')) {
      errorMessage.style.opacity = '1';
    }
  }
}

// Add real-time validation
document.querySelectorAll('.auth-form input').forEach(input => {
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => {
    if (input.value.length > 0) {
      validateField(input);
    }
  });
});

// Form submissions
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Account created successfully! Welcome to MAAS.');
    closeModal(authModal);
    signupForm.reset();
  });
}

if (signinForm) {
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Signed in successfully! Welcome back.');
    closeModal(authModal);
    signinForm.reset();
  });
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById('successToast');
  const toastMessage = toast.querySelector('.toast-message');
  toastMessage.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Application modal
const applyBtns = document.querySelectorAll('.apply-btn');
const applicantRoleInput = document.getElementById('applicantRole');

applyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const role = btn.getAttribute('data-role');
    if (applicantRoleInput) {
      applicantRoleInput.value = role;
    }
    applicationModal.classList.add('active');
    trapFocus(applicationModal);
  });
});

// Case gallery modals
const inspectCaseBtns = document.querySelectorAll('.inspect-cases-btn');

inspectCaseBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const department = btn.getAttribute('data-department');
    const modal = document.getElementById(`${department}CaseModal`);
    if (modal) {
      modal.classList.add('active');
      trapFocus(modal);
      loadCaseGallery(department);
    }
  });
});

// Case gallery loading system
async function loadCaseGallery(department) {
  const galleryGrid = document.querySelector(`#${department}CaseModal .case-gallery-grid`);
  if (!galleryGrid) return;
  
  try {
    let data;
    
    // Check if Supabase is available
    if (window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
      // Load from Supabase bucket
      const response = await fetch(`${window.SUPABASE_URL}/storage/v1/object/public/cases/${department}/manifest.json`);
      if (response.ok) {
        data = await response.json();
      } else {
        throw new Error('Supabase manifest not found');
      }
    } else {
      // Load from local files
      const response = await fetch(`/data/${department}-cases.json`);
      if (response.ok) {
        data = await response.json();
      } else {
        throw new Error('Local manifest not found');
      }
    }
    
    if (data && data.items && data.items.length > 0) {
      renderCaseGallery(galleryGrid, data.items);
    } else {
      showEmptyGallery(galleryGrid);
    }
  } catch (error) {
    console.log('Case gallery loading:', error.message);
    showEmptyGallery(galleryGrid);
  }
}

function renderCaseGallery(container, items) {
  container.innerHTML = '';
  
  items.forEach(item => {
    const caseElement = document.createElement('div');
    caseElement.className = 'case-item';
    
    if (item.type === 'image') {
      caseElement.innerHTML = `
        <img src="${item.thumbnail || item.url}" alt="${item.title}" loading="lazy" />
        <div class="case-overlay">
          <h4>${item.title}</h4>
          <p>${item.description || ''}</p>
        </div>
      `;
      caseElement.addEventListener('click', () => openLightbox(item));
    } else if (item.type === 'video') {
      caseElement.innerHTML = `
        <div class="video-thumbnail">
          <img src="${item.poster}" alt="${item.title}" loading="lazy" />
          <div class="play-button">▶</div>
        </div>
        <div class="case-overlay">
          <h4>${item.title}</h4>
          <p>${item.description || ''}</p>
        </div>
      `;
      caseElement.addEventListener('click', () => openVideoModal(item));
    }
    
    container.appendChild(caseElement);
  });
}

function showEmptyGallery(container) {
  container.innerHTML = '<div class="case-placeholder">Cases will appear here soon.</div>';
}

function openLightbox(item) {
  // Create lightbox modal for images
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox-modal';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close">&times;</button>
      <img src="${item.url}" alt="${item.title}" />
      <div class="lightbox-info">
        <h3>${item.title}</h3>
        <p>${item.description || ''}</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(lightbox);
  setTimeout(() => lightbox.classList.add('active'), 10);
  
  const closeBtn = lightbox.querySelector('.lightbox-close');
  closeBtn.addEventListener('click', () => closeLightbox(lightbox));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox(lightbox);
  });
}

function openVideoModal(item) {
  // Create video modal
  const videoModal = document.createElement('div');
  videoModal.className = 'video-modal';
  videoModal.innerHTML = `
    <div class="video-content">
      <button class="video-close">&times;</button>
      <video controls autoplay>
        <source src="${item.url}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="video-info">
        <h3>${item.title}</h3>
        <p>${item.description || ''}</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(videoModal);
  setTimeout(() => videoModal.classList.add('active'), 10);
  
  const closeBtn = videoModal.querySelector('.video-close');
  closeBtn.addEventListener('click', () => closeVideoModal(videoModal));
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal(videoModal);
  });
}

function closeLightbox(lightbox) {
  lightbox.classList.remove('active');
  setTimeout(() => document.body.removeChild(lightbox), 300);
}

function closeVideoModal(videoModal) {
  const video = videoModal.querySelector('video');
  if (video) video.pause();
  videoModal.classList.remove('active');
  setTimeout(() => document.body.removeChild(videoModal), 300);
}

// Close modals
modalCloses.forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    closeModal(closeBtn.closest('.modal-overlay'));
  });
});

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal-overlay.active');
    if (activeModal) {
      closeModal(activeModal);
    }
    
    // Close case gallery modals
    const openCaseModal = document.querySelector('.case-gallery-modal.open');
    if (openCaseModal) {
      openCaseModal.classList.remove('open');
    }
    
    // Close expanded case images
    const openCaseImage = document.querySelector('.case.card[data-kind="image"].open');
    if (openCaseImage) {
      openCaseImage.classList.remove('open');
    }
    
    // Close lightbox/video modals
    const lightbox = document.querySelector('.lightbox-modal.active');
    if (lightbox) closeLightbox(lightbox);
    
    const videoModal = document.querySelector('.video-modal.active');
    if (videoModal) closeVideoModal(videoModal);
  }
});

function closeModal(modal) {
  modal.classList.remove('active');
  releaseFocus();
  
  // Reset auth card flip state when closing auth modal
  if (modal === authModal) {
    authCard.classList.remove('flipped');
  }
}

// Close case gallery modals on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('case-gallery-modal')) {
    e.target.classList.remove('open');
  }
  
  // Close expanded case images when clicking outside
  if (e.target.classList.contains('case') && e.target.classList.contains('open')) {
    return; // Don't close if clicking on the image itself
  }
  
  const openCaseImage = document.querySelector('.case.card[data-kind="image"].open');
  if (openCaseImage && !openCaseImage.contains(e.target)) {
    openCaseImage.classList.remove('open');
  }
});

// Close case gallery modals with close button
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-close')) {
    const modal = e.target.closest('.case-gallery-modal');
    if (modal) {
      modal.classList.remove('open');
    }
  }
});

// Focus trapping for accessibility
let focusableElements = [];
let firstFocusableElement = null;
let lastFocusableElement = null;

function trapFocus(modal) {
  focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  firstFocusableElement = focusableElements[0];
  lastFocusableElement = focusableElements[focusableElements.length - 1];
  
  if (firstFocusableElement) {
    firstFocusableElement.focus();
  }
  
  modal.addEventListener('keydown', handleFocusTrap);
}

function handleFocusTrap(e) {
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  }
}

function releaseFocus() {
  document.removeEventListener('keydown', handleFocusTrap);
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all other FAQ items
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      }
    });
    
    // Toggle current item
    item.classList.toggle('active');
    question.setAttribute('aria-expanded', !isActive);
  });
});

// Tech tile navigation
const techTiles = document.querySelectorAll('.tech-tile');

techTiles.forEach(tile => {
  tile.addEventListener('click', () => {
    const target = tile.getAttribute('data-target');
    const targetElement = document.getElementById(target);
    
    if (targetElement) {
      const headerOffset = 100;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('.newsletter-input').value;
    
    if (email) {
      showToast('Thank you for subscribing! We\'ll keep you updated on our latest automation solutions.');
      e.target.querySelector('.newsletter-input').value = '';
    }
  });
}

// Application form handling
const applicationForm = document.getElementById('applicationForm');
const cancelApplicationBtn = document.getElementById('cancelApplication');

if (applicationForm) {
  applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(applicationForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const role = formData.get('role');
    const message = formData.get('message');
    
    // Create mailto link
    const subject = encodeURIComponent(`Application - ${role}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nRole: ${role}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:maas@multiagentautomationsystems.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Close modal
    closeModal(applicationModal);
    
    // Reset form
    applicationForm.reset();
  });
}

if (cancelApplicationBtn) {
  cancelApplicationBtn.addEventListener('click', () => {
    closeModal(applicationModal);
    applicationForm.reset();
  });
}

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  
  if (window.scrollY > 100) {
    header.style.background = 'rgba(26, 26, 26, 0.98)';
  } else {
    header.style.background = 'rgba(26, 26, 26, 0.95)';
  }
});

// Circuit Canvas Animation (Hero Background)
function initCircuitAnimation() {
  const canvas = document.getElementById('circuitCanvas');
  if (!canvas || prefersReducedMotion) return;
  
  const ctx = canvas.getContext('2d');
  let animationId;
  
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  const nodes = [];
  const connections = [];
  
  // Create nodes
  for (let i = 0; i < 8; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      pulse: Math.random() * Math.PI * 2
    });
  }
  
  // Create connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const distance = Math.sqrt(
        Math.pow(nodes[i].x - nodes[j].x, 2) + 
        Math.pow(nodes[i].y - nodes[j].y, 2)
      );
      
      if (distance < 200) {
        connections.push({
          from: i,
          to: j,
          flow: Math.random()
        });
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const time = Date.now() * 0.001;
    
    // Draw connections
    connections.forEach(conn => {
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];
      
      ctx.strokeStyle = `rgba(212, 175, 55, ${0.3 + Math.sin(time + conn.flow) * 0.2})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.stroke();
      
      // Flow effect
      const flowPos = (Math.sin(time * 0.5 + conn.flow) + 1) / 2;
      const flowX = fromNode.x + (toNode.x - fromNode.x) * flowPos;
      const flowY = fromNode.y + (toNode.y - fromNode.y) * flowPos;
      
      ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
      ctx.beginPath();
      ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw nodes
    nodes.forEach(node => {
      const pulseSize = 3 + Math.sin(time + node.pulse) * 2;
      ctx.fillStyle = 'rgba(212, 175, 55, 0.6)';
      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
      ctx.fill();
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  animate();
  
  // Cleanup
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
}

// Parallax effect for watermark
function initParallax() {
  if (prefersReducedMotion) return;
  
  const watermark = document.querySelector('.watermark-logo');
  if (!watermark) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    watermark.style.transform = `translate(-50%, calc(-50% + ${parallax}px))`;
  });
}

// GSAP Animations (if available)
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || prefersReducedMotion) return;
  
  // Websites animation
  gsap.timeline({ repeat: -1, repeatDelay: 2 })
    .fromTo('.content-block', 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }
    )
    .to('.content-block', 
      { opacity: 0, duration: 0.3, delay: 1 }
    );
  
  // Bots animation
  gsap.timeline({ repeat: -1, repeatDelay: 1 })
    .to('.node', { 
      scale: 1.2, 
      duration: 0.3, 
      stagger: 0.2, 
      yoyo: true, 
      repeat: 1 
    })
    .to('.chat-bubble', { 
      opacity: 1, 
      scale: 1.1, 
      duration: 0.5, 
      yoyo: true, 
      repeat: 1 
    }, '-=0.5');
  
  // Marketing animation
  gsap.timeline({ repeat: -1, repeatDelay: 2 })
    .fromTo('.chart-bar', 
      { scaleY: 0 }, 
      { scaleY: 1, duration: 0.8, stagger: 0.1, ease: 'bounce.out' }
    )
    .to('.radial-highlight', { 
      opacity: 0.5, 
      duration: 1, 
      yoyo: true, 
      repeat: 1 
    }, '-=0.5');
  
  // Workflows animation
  gsap.timeline({ repeat: -1 })
    .set('.workflow-packet', { opacity: 1 })
    .fromTo('.packet-1', 
      { x: 0 }, 
      { x: 60, duration: 2, ease: 'none' }
    )
    .fromTo('.packet-2', 
      { x: 0, y: 10 }, 
      { x: 60, y: 10, duration: 2, ease: 'none' }, '-=1.5'
    )
    .fromTo('.packet-3', 
      { x: 0 }, 
      { x: 60, duration: 2, ease: 'none' }, '-=1'
    );
  
  // Remote animation
  gsap.timeline({ repeat: -1, repeatDelay: 1 })
    .fromTo('.signal-ring', 
      { scale: 0, opacity: 0.8 }, 
      { scale: 1, opacity: 0, duration: 2, stagger: 0.3 }
    );

  // Department background animations
  gsap.timeline({ repeat: -1, repeatDelay: 3 })
    .fromTo('.chart-line', 
      { scaleY: 0 }, 
      { scaleY: 1, duration: 1, stagger: 0.2, ease: 'power2.out' }
    )
    .to('.growth-highlight', { 
      opacity: 0.3, 
      duration: 1, 
      yoyo: true, 
      repeat: 1 
    }, '-=0.5');

  gsap.timeline({ repeat: -1 })
    .fromTo('.flow-packet', 
      { x: 0, opacity: 1 }, 
      { x: '100vw', duration: 3, stagger: 1, ease: 'none' }
    );

  gsap.timeline({ repeat: -1, repeatDelay: 2 })
    .fromTo('.signal-wave', 
      { scale: 0, opacity: 0.6 }, 
      { scale: 1, opacity: 0, duration: 2, stagger: 0.4 }
    );

  gsap.timeline({ repeat: -1, repeatDelay: 1 })
    .fromTo('.network-pulse', 
      { opacity: 1, scale: 0.5 }, 
      { opacity: 0, scale: 1, duration: 2, stagger: 0.5 }
    );
}

// Case gallery modal controls
document.addEventListener('click', (e) => {
  // Close case gallery modals on overlay click
  if (e.target.classList.contains('case-gallery-modal')) {
    e.target.classList.remove('open');
  }
  
  // Close case gallery modals with close button
  if (e.target.classList.contains('modal-close') && e.target.closest('.case-gallery-modal')) {
    const modal = e.target.closest('.case-gallery-modal');
    modal.classList.remove('open');
  }
});

// Close case gallery modals with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openCaseModal = document.querySelector('.case-gallery-modal.open');
    if (openCaseModal) {
      openCaseModal.classList.remove('open');
    }
  }
});

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize circuit animation
  const cleanupCircuit = initCircuitAnimation();
  
  // Initialize parallax
  initParallax();
  
  // Initialize GSAP animations
  setTimeout(initGSAPAnimations, 100);
  
  // Initialize case gallery buttons
  if (window.bindCasesButtons) {
    window.bindCasesButtons();
  }
  
  // Intersection Observer for fade-in animations
  if (!prefersReducedMotion) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(section);
    });

    // Observe department cards
    const cards = document.querySelectorAll('.department-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
      observer.observe(card);
    });
  }
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (cleanupCircuit) {
      cleanupCircuit();
    }
  });
});