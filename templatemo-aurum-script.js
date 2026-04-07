// =============================
// NAVBAR SCROLL EFFECT
// =============================
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// =============================
// MOBILE MENU
// =============================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

function openMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.add('open');
  mobileMenuOverlay.classList.add('open');
  mobileMenuBtn.classList.add('active');
  document.body.classList.add('menu-open');
}

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
  mobileMenuOverlay.classList.remove('open');
  mobileMenuBtn.classList.remove('active');
  document.body.classList.remove('menu-open');
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking links
mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close menu with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMobileMenu();
  }
});

// =============================
// SMOOTH SCROLL
// =============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// =============================
// ACTIVE NAV HIGHLIGHT
// =============================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNavOnScroll() {
  const scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });

      mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavOnScroll);

// =============================
// TABS (if used)
// =============================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.products-tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    tabContents.forEach(content => {
      content.classList.remove('active');
    });

    const activeContent = document.getElementById('tab-' + tabId);
    if (activeContent) {
      activeContent.classList.add('active');
    }
  });
});

// =============================
// TESTIMONIAL SLIDER
// =============================
const testimonialsTrack = document.getElementById('testimonialsTrack');
const testimonialDots = document.querySelectorAll('#testimonialDots .dot');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');

let currentTestimonial = 0;
const totalTestimonials = testimonialDots.length;

function goToTestimonial(index) {
  if (!testimonialsTrack) return;

  if (index < 0) index = totalTestimonials - 1;
  if (index >= totalTestimonials) index = 0;

  currentTestimonial = index;
  testimonialsTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;

  testimonialDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentTestimonial);
  });
}

testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => goToTestimonial(index));
});

if (testimonialPrev) testimonialPrev.addEventListener('click', () => {
  goToTestimonial(currentTestimonial - 1);
});

if (testimonialNext) testimonialNext.addEventListener('click', () => {
  goToTestimonial(currentTestimonial + 1);
});

// =============================
// CONTACT FORM
// =============================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    alert("Thank you! Your message has been sent.");
  });
}

// =============================
// LIVE STOCK PRICE UPDATES
// =============================

// Your Finnhub API key
const API_KEY = 'd7am591r01qmvlmggqp0d7am591r01qmvlmggqpg';

// Stocks to track
const stocks = [
  { symbol: 'AAPL', elementId: 'apple-price' },
  { symbol: 'MSFT', elementId: 'microsoft-price' },
  { symbol: 'NVDA', elementId: 'nvidia-price' },
  { symbol: 'TSLA', elementId: 'tesla-price' }
];

// Function to fetch and update stock prices
async function updateStockPrices() {
  for (let stock of stocks) {
    try {
      const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${API_KEY}`);
      const data = await res.json();

      const priceElement = document.getElementById(stock.elementId);
      if (priceElement && data.c) {
        const oldPrice = parseFloat(priceElement.textContent.replace('$',''));
        const newPrice = data.c.toFixed(2);
        priceElement.textContent = `$${newPrice}`;

        // Color green if price up, red if down
        priceElement.style.color = newPrice >= oldPrice ? "#00ff9d" : "#ff4c4c";
      }
    } catch (err) {
      console.error(`Error fetching ${stock.symbol}:`, err);
    }
  }
}

// Update prices every 10 seconds
setInterval(updateStockPrices, 10000);
updateStockPrices(); // run immediately on load

// simulate market movement every 30s
setInterval(updatePrices, 30000);
