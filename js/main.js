/* ============================================================
   PORTFOLIO – AMADOU DEME
   Fichier : js/main.js
   Description : Logique principale – navigation, animations,
                 rendu dynamique depuis data.js
   ============================================================ */

/* ============================
   LOADER
============================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 500);
  }
  initAll();
});

/* ============================
   INIT GLOBALE
============================ */
function initAll() {
  renderSkills();
  renderExperiences();
  renderEducation();
  renderLanguages();
  renderProjects();
  initNav();
  initScrollReveal();
  initTyping();
  initParticles();
  initBackToTop();
  initContactForm();
  initLangBars();
  initProjectModal();
}

/* ============================
   RENDU – COMPÉTENCES
============================ */
function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  grid.innerHTML = PORTFOLIO_DATA.skills.map((s, i) => `
    <div class="skill-card reveal" style="transition-delay:${i * 0.06}s">
      <div class="skill-icon" style="background:${s.color};color:${s.iconColor};">
        <i class="${s.icon}"></i>
      </div>
      <div class="skill-card-title">${s.title}</div>
      <div class="skill-card-level"><i class="fas fa-signal" style="font-size:0.7rem;margin-right:4px;color:${s.iconColor};opacity:0.7;"></i>${s.level}</div>
      <div class="skill-tags">
        ${s.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');

  // Re-observer les nouveaux éléments
  observeReveal(grid.querySelectorAll('.reveal'));
}

/* ============================
   RENDU – EXPÉRIENCES
============================ */
function renderExperiences() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  timeline.innerHTML = PORTFOLIO_DATA.experiences.map((exp, i) => `
    <div class="timeline-item reveal" style="transition-delay:${i * 0.08}s">
      <div class="timeline-dot"><i class="${exp.icon}"></i></div>
      <div class="timeline-content">
        <div class="tl-header">
          <div>
            <div class="tl-company">${exp.company}</div>
            <div class="tl-role">${exp.role}</div>
          </div>
          <span class="tl-period"><i class="fas fa-calendar-alt"></i> ${exp.period}</span>
        </div>
        <p class="tl-desc">${exp.desc}</p>
        <div class="tl-tech">
          ${exp.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  observeReveal(timeline.querySelectorAll('.reveal'));
}

/* ============================
   RENDU – FORMATIONS
============================ */
function renderEducation() {
  const grid = document.getElementById('edu-grid');
  if (!grid) return;

  grid.innerHTML = PORTFOLIO_DATA.education.map((ed, i) => `
    <div class="edu-card reveal" style="transition-delay:${i * 0.07}s">
      <div class="edu-icon"><i class="${ed.icon}"></i></div>
      <div class="edu-degree">${ed.degree}</div>
      <div class="edu-school">${ed.school}</div>
      <div class="edu-year"><i class="fas fa-calendar"></i> ${ed.year}</div>
      <div class="edu-status status-${ed.status}">
        <i class="fas fa-${ed.status === 'en-cours' ? 'circle' : ed.status === 'certif' ? 'award' : 'check-circle'}"></i>
        ${ed.statusLabel}
      </div>
    </div>
  `).join('');

  observeReveal(grid.querySelectorAll('.reveal'));
}

/* ============================
   RENDU – LANGUES
============================ */
function renderLanguages() {
  const wrap = document.getElementById('lang-cards');
  if (!wrap) return;

  wrap.innerHTML = PORTFOLIO_DATA.languages.map((l, i) => `
    <div class="lang-card reveal" style="transition-delay:${i * 0.1}s">
      <div class="lang-flag">${l.flag}</div>
      <div class="lang-name">${l.name}</div>
      <div class="lang-level">${l.level}</div>
      <div class="lang-bar">
        <div class="lang-fill" data-width="${l.percent}%" style="width:0%"></div>
      </div>
    </div>
  `).join('');

  observeReveal(wrap.querySelectorAll('.reveal'));
}

/* ============================
   RENDU – PROJETS
============================ */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = PORTFOLIO_DATA.projects.map((p, i) => `
    <div class="project-card reveal" style="transition-delay:${i * 0.08}s">
      <div class="project-thumb" onclick="openProjectModal(${i})" title="Agrandir la capture du projet">
        <span class="project-badge-cat">${p.category}</span>
        <img src="${encodeURI(p.image)}" alt="${p.title}" loading="lazy" />
        <span class="project-zoom-btn" title="Voir en grand">
          <i class="fas fa-search-plus"></i>
        </span>
      </div>
      <div class="project-body">
        <div class="project-tags" style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:12px;">
          ${p.tags.map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-footer">
          <button type="button" class="project-btn-preview" onclick="openProjectModal(${i})">
            <i class="fas fa-eye"></i> Aperçu capture
          </button>
          <div style="display:flex;gap:12px;">
            <a href="${p.github}" target="_blank" rel="noopener" class="project-link" title="Code source">
              <i class="fab fa-github"></i> Code
            </a>
            <a href="${p.demo}" target="_blank" rel="noopener" class="project-link" title="Démo en ligne">
              <i class="fas fa-external-link-alt"></i> Live
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  observeReveal(grid.querySelectorAll('.reveal'));
}

/* ============================
   NAVIGATION
============================ */
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  // Toggle menu mobile
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  // Fermer au clic extérieur
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });

  // Fermer au clic sur lien
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // Lien actif au scroll
  const sections  = document.querySelectorAll('section[id]');
  const allLinks  = document.querySelectorAll('#nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 130) current = s.id;
    });
    allLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
}

/* ============================
   SCROLL REVEAL
============================ */
function initScrollReveal() {
  observeReveal(document.querySelectorAll('.reveal, .reveal-l, .reveal-r'));
}

function observeReveal(elements) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => obs.observe(el));
}

/* ============================
   EFFET MACHINE À ÉCRIRE
============================ */
function initTyping() {
  const roles = [
    "Développeur Full Stack",
    "Lead Développeur",
    "Data Scientist",
    "Mobile Developer",
    "Problem Solver"
  ];
  const el = document.getElementById('typed-text');
  if (!el) return;

  let rIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const current = roles[rIdx];
    el.textContent = current.substring(0, cIdx);

    if (!deleting) {
      cIdx++;
      if (cIdx > current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      cIdx--;
      if (cIdx < 0) {
        deleting = false;
        rIdx = (rIdx + 1) % roles.length;
        setTimeout(type, 400);
        return;
      }
    }
    setTimeout(type, deleting ? 45 : 95);
  }
  type();
}

/* ============================
   PARTICULES DE FOND
============================ */
function initParticles() {
  const wrap = document.querySelector('.particles');
  if (!wrap) return;

  const colors = ['#60A5FA', '#38BDF8', '#818CF8', '#93C5FD'];
  const count  = 20;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 20 + 12}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: 0;
    `;
    wrap.appendChild(p);
  }
}

/* ============================
   BACK TO TOP
============================ */
function initBackToTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================
   FORMULAIRE DE CONTACT
============================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn      = form.querySelector('.btn-submit');
    const feedback = document.getElementById('form-feedback');

    btn.disabled   = true;
    btn.innerHTML  = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

    // Simulation envoi (à remplacer par un vrai appel API / EmailJS)
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
      if (feedback) {
        feedback.textContent = '✅ Votre message a bien été envoyé ! Je vous réponds sous 24h.';
        feedback.classList.add('success');
      }
      form.reset();

      setTimeout(() => {
        btn.disabled  = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
        if (feedback) feedback.classList.remove('success');
      }, 5000);
    }, 1600);
  });
}

/* ============================
   BARRES DE LANGUES (animation)
============================ */
function initLangBars() {
  const fills = document.querySelectorAll('.lang-fill');
  if (!fills.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.dataset.width;
        entry.target.style.width = target;
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(f => obs.observe(f));
}

/* ============================
   MODAL APERÇU PROJET
============================ */
function openProjectModal(index) {
  const p = PORTFOLIO_DATA.projects[index];
  if (!p) return;

  const modal = document.getElementById('project-modal');
  const img   = document.getElementById('modal-img');
  const title = document.getElementById('modal-title');
  const desc  = document.getElementById('modal-desc');
  const tags  = document.getElementById('modal-tags');
  const links = document.getElementById('modal-links');

  if (!modal) return;

  img.src = encodeURI(p.image);
  img.alt = p.title;
  title.textContent = p.title;
  desc.textContent = p.desc;
  tags.innerHTML = p.tags.map(t => `<span class="tech-pill">${t}</span>`).join('') +
    `<span class="tech-pill" style="background:rgba(2,132,199,0.08);color:var(--accent);border:1px solid rgba(2,132,199,0.2);"><i class="fas fa-tag"></i> ${p.category}</span>`;

  links.innerHTML = `
    <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-outline" style="padding:10px 18px;font-size:0.86rem;">
      <i class="fab fa-github"></i> Dépôt GitHub
    </a>
    <a href="${p.demo}" target="_blank" rel="noopener" class="btn btn-primary" style="padding:10px 20px;font-size:0.86rem;">
      <i class="fas fa-external-link-alt"></i> Démo Live
    </a>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  if (!modal) return;

  closeBtn?.addEventListener('click', closeProjectModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

