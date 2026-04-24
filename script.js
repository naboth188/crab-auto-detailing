// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      const offset = 80;
      const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// ===== LIGHTBOX =====
function openLightbox(el) {
  const img = el.querySelector('img');
  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

// ===== REVIEW SYSTEM =====
let selectedRating = 5;

function setRating(val) {
  selectedRating = val;
  document.querySelectorAll('.star-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i < val);
  });
}
setRating(5);

function submitReview(e) {
  e.preventDefault();
  const name = document.getElementById('reviewName').value;
  const vehicle = document.getElementById('reviewVehicle').value;
  const text = document.getElementById('reviewText').value;
  const date = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const review = { name, vehicle, rating: selectedRating, text, date };

  // Save to localStorage
  const reviews = JSON.parse(localStorage.getItem('crab_reviews') || '[]');
  reviews.push(review);
  localStorage.setItem('crab_reviews', JSON.stringify(reviews));

  addReviewToDOM(review);
  updateReviewCount();

  document.getElementById('reviewForm').reset();
  setRating(5);
  const success = document.getElementById('reviewSuccess');
  success.style.display = 'block';
  setTimeout(() => success.style.display = 'none', 4000);
}

function addReviewToDOM(review) {
  const grid = document.getElementById('reviewsGrid');
  const colors = [
    '#1565C0,#42A5F5', '#2E7D32,#66BB6A', '#4A148C,#7B1FA2',
    '#E65100,#FF9800', '#AD1457,#E91E63', '#00695C,#26A69A'
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

  const card = document.createElement('div');
  card.className = 'review-card visible';
  card.innerHTML = `
    <div class="review-top">
      <div class="review-avatar" style="background: linear-gradient(135deg, ${color});">${review.name[0]}</div>
      <div class="review-info">
        <div class="name">${review.name}</div>
        <div class="date">${review.date}${review.vehicle ? ' · ' + review.vehicle : ''}</div>
      </div>
    </div>
    <div class="review-stars">${stars}</div>
    <div class="review-text">${review.text}</div>
  `;
  grid.appendChild(card);
}

function updateReviewCount() {
  const base = 28;
  const extra = JSON.parse(localStorage.getItem('crab_reviews') || '[]').length;
  document.getElementById('reviewCount').textContent = `${base + extra} reviews`;
}

// Load saved reviews on page load
function loadSavedReviews() {
  const reviews = JSON.parse(localStorage.getItem('crab_reviews') || '[]');
  reviews.forEach(r => addReviewToDOM(r));
  updateReviewCount();
}
loadSavedReviews();

// ===== BOOKING FORM =====
function submitBooking(e) {
  e.preventDefault();
  const success = document.getElementById('bookingSuccess');
  success.style.display = 'block';
  document.getElementById('bookingForm').reset();
  setTimeout(() => success.style.display = 'none', 6000);
}

// Set min date to today
const dateInput = document.getElementById('bookDate');
if (dateInput) {
  dateInput.min = new Date().toISOString().split('T')[0];
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
