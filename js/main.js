// Mark JS as ready immediately — this scopes all hide/reveal to JS-enabled browsers
document.documentElement.classList.add('js-ready');

// Custom cursor
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
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      follower.style.transform = 'translate(-50%,-50%) scale(0.5)';
      follower.style.opacity = '0.3';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.opacity = '1';
    });
  });
}

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav && nav.classList.toggle('scrolled', window.scrollY > 50));

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
mobileMenu?.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  })
);

// Scroll reveal
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Contact form
document.getElementById('contactForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-primary');
  const orig = btn.textContent;
  btn.textContent = 'Sending...'; btn.style.opacity = '0.7';
  await new Promise(r => setTimeout(r, 1500));
  btn.textContent = '✓ Message Sent!'; btn.style.background = '#4ade80'; btn.style.opacity = '1';
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; e.target.reset(); }, 3000);
});

// Card tilt
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

// Counter animation
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const text = el.textContent;
    const m = text.match(/\d+/);
    if (!m) return;
    const target = parseInt(m[0]);
    const suffix = text.replace(/\d/g, '');
    let curr = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      curr += step;
      if (curr >= target) { el.textContent = text; clearInterval(timer); }
      else { el.textContent = Math.floor(curr) + suffix; }
    }, 30);
    counterObs.unobserve(el);
  });
}, { threshold: 1 });
document.querySelectorAll('.stat-num').forEach(c => counterObs.observe(c));
