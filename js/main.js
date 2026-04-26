/* =============================================
   PAUL NYOIKE PORTFOLIO — JAVASCRIPT
   ============================================= */

/* ——— CUSTOM CURSOR ——— */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

if (cursor && follower) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    setTimeout(() => {
      follower.style.left = e.clientX + 'px';
      follower.style.top  = e.clientY + 'px';
    }, 80);
  });

  document.querySelectorAll('a, button, .service-card, .project-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
      follower.style.transform = 'translate(-50%, -50%) scale(0.5)';
      follower.style.opacity = '0.3';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.opacity = '1';
    });
  });
}

/* ——— NAV SCROLL EFFECT ——— */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ——— MOBILE MENU ——— */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ——— SCROLL REVEAL ——— */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => revealObs.observe(el));

/* ——— HERO LINE REVEALS ——— */
document.querySelectorAll('.reveal-line').forEach(line => {
  const inner = document.createElement('span');
  inner.classList.add('reveal-line-inner');
  inner.innerHTML = line.innerHTML;
  line.innerHTML = '';
  line.appendChild(inner);
});

const lineObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-line').forEach(el => lineObs.observe(el));

/* ——— CONTACT FORM ——— */
const form = document.getElementById('contactForm');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('.btn-primary');
  const original = btn.textContent;
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';

  await new Promise(r => setTimeout(r, 1500));

  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#4ade80';
  btn.style.opacity = '1';

  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    form.reset();
  }, 3000);
});

/* ——— SMOOTH ACTIVE NAV ——— */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--cream)'
          : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObs.observe(s));

/* ——— TILT ON SERVICE CARDS ——— */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ——— NUMBER COUNTER ——— */
const counters = document.querySelectorAll('.stat-num');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const numMatch = text.match(/\d+/);
      if (!numMatch) return;
      const target = parseInt(numMatch[0]);
      const suffix = text.replace(/[\d]/g, '');
      let current = 0;
      const step = target / 40;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = text;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current) + suffix;
        }
      }, 30);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 1 });

counters.forEach(c => counterObs.observe(c));

/* ——— PAGE LOAD ANIMATION ——— */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});


    } catch (error) {
      console.error('EmailJS error:', error);
      submitBtn.textContent = 'Failed to send – try again';
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}


    } catch (error) {
      console.error('EmailJS error:', error);
      submitBtn.textContent = 'Failed — try again';
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}

// ==================== REAL EMAILJS CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      await emailjs.sendForm(
        'service_nxvkyl',      // Service ID
        '0bj46b8',             // ← Your "Contact Us" Template ID
        contactForm
      );

      submitBtn.innerHTML = '✓ Message Sent Successfully!';
      submitBtn.style.backgroundColor = '#4ade80';

      contactForm.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
      }, 4000);

    } catch (error) {
      console.error(error);
      submitBtn.textContent = 'Failed — try again';
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}
