/* =============================================
   UTOL Schools – main.js
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll effect ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ---- Mobile hamburger ---- */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---- Active nav link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Open clicked (toggle)
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- Gallery & News filter ---- */
  const filterBtns = document.querySelectorAll('.gallery-filter .tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-page-item');
  const newsCards = document.querySelectorAll('.news-card[data-category]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? 'flex' : 'none';
      });
      newsCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---- Contact form ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        showToast('Message sent! We\'ll get back to you within 24 hours.', 'success');
        contactForm.reset();
        btn.textContent = original;
        btn.disabled = false;
      }, 1500);
    });
  }

  /* ---- Admissions form ---- */
  const admissionsForm = document.getElementById('admissionsForm');
  if (admissionsForm) {
    admissionsForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = admissionsForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Submitting...';
      btn.disabled = true;
      setTimeout(() => {
        showToast('Application submitted! Check your email for a confirmation.', 'success');
        admissionsForm.reset();
        btn.textContent = original;
        btn.disabled = false;
      }, 2000);
    });
  }

  /* ---- Scroll reveal animation ---- */
  const revealEls = document.querySelectorAll(
    '.feature-card, .news-card, .subject-card, .value-card, .team-card, .step-card, .testimonial-card'
  );
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  /* ---- Counter animation ---- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target || el.textContent);
    const suffix = el.textContent.replace(/[0-9]/g, '');
    let count = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + suffix;
      if (count >= target) clearInterval(timer);
    }, 30);
  }

  const counterEls = document.querySelectorAll('.counter-val');
  if (counterEls.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObserver.observe(el));
  }

  /* ---- Toast notification ---- */
  window.showToast = function(message, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '✅' : 'ℹ️'}</span> ${message}`;
    toast.style.cssText = `
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      background: ${type === 'success' ? '#2E7D32' : '#03045e'};
      color: #fff; padding: 14px 20px; border-radius: 12px;
      font-family: Nunito, sans-serif; font-weight: 700; font-size: 0.9rem;
      box-shadow: 0 8px 30px rgba(0,0,0,0.2);
      display: flex; align-items: center; gap: 8px;
      animation: slideInToast 0.4s ease;
      max-width: 360px;
    `;
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        @keyframes slideInToast {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
      </style>
    `);
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  };

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Mini calendar (portal) ---- */
  const calGrid = document.querySelector('.cal-grid');
  if (calGrid) buildCalendar();

  function buildCalendar() {
    const monthLabel = document.querySelector('.cal-month');
    const now = new Date();
    let year = now.getFullYear(), month = now.getMonth();

    function render() {
      if (monthLabel) monthLabel.textContent = now.toLocaleString('default', { month: 'long', year: 'numeric' });
      const days = document.querySelectorAll('.cal-day:not(.cal-day-name)');
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const today = new Date();

      let dayNum = 1 - firstDay;
      days.forEach(cell => {
        cell.className = 'cal-day';
        if (dayNum < 1 || dayNum > daysInMonth) {
          cell.textContent = dayNum < 1 ? new Date(year, month, dayNum).getDate() : dayNum - daysInMonth;
          cell.classList.add('other-month');
        } else {
          cell.textContent = dayNum;
          if (dayNum === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            cell.classList.add('today');
          }
        }
        dayNum++;
      });
    }

    document.querySelector('.cal-prev')?.addEventListener('click', () => {
      month--; if (month < 0) { month = 11; year--; } render();
    });
    document.querySelector('.cal-next')?.addEventListener('click', () => {
      month++; if (month > 11) { month = 0; year++; } render();
    });

    render();
  }

});
