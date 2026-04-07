/*
GreenEdge Markets
Clean JavaScript (Matched to Current HTML)
*/


// =============================
// NAVBAR SCROLL EFFECT
// =============================

const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {
      navbar.style.background = "#0d0d0d";
      navbar.style.transition = "0.3s";
    } else {
      navbar.style.background = "#121212";
    }

  });
}


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
const navLinks = document.querySelectorAll('nav a');

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

    }

  });

}

window.addEventListener('scroll', highlightNavOnScroll);


// =============================
// CONTACT FORM ALERT
// =============================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', () => {
    alert("Thank you! Your message has been sent.");
  });
}


// =============================
// DEMO STOCK PRICE UPDATE
// =============================

function updatePrices() {

  const priceElements = document.querySelectorAll('.price-value');

  priceElements.forEach(price => {

    let basePrice = parseFloat(price.textContent.replace("$",""));
    let change = (Math.random() - 0.5) * 2;
    let newPrice = (basePrice + change).toFixed(2);

    price.textContent = "$" + newPrice;

  });

}

// simulate market movement every 30s
setInterval(updatePrices, 30000);
