/* =============================================================
   avatar_and_utils.js
   Portfolio – 3D Icosahedron Avatar + Utility Scripts
   ============================================================= */

/* ----------------------------------------------------------------
   SCROLL-REVEAL CSS injection (before DOM ready)
   ---------------------------------------------------------------- */
(function injectRevealCSS() {
  var style = document.createElement('style');
  style.textContent = [
    '#avatar-stage{position:relative;display:flex;align-items:center;justify-content:center;perspective:800px;}',
    '.icos-scene{position:relative;width:100%;height:100%;transform-style:preserve-3d;}',
    '.icos-edge{position:absolute;left:50%;top:50%;height:1.5px;background:rgba(255,90,31,0.45);transform-origin:left center;pointer-events:none;will-change:transform;}',
    '.icos-vertex{position:absolute;width:5px;height:5px;border-radius:50%;background:#FF5A1F;box-shadow:0 0 8px 2px rgba(255,90,31,0.5);transform-origin:center center;pointer-events:none;will-change:transform;margin-left:-2.5px;margin-top:-2.5px;}',
    '[data-reveal]{opacity:0;transform:translateY(24px);transition:opacity 0.5s ease,transform 0.5s ease;}',
    '[data-reveal].revealed{opacity:1;transform:none;}'
  ].join('');
  document.head.appendChild(style);
}());

/* ================================================================
   1. 3D WIREFRAME ICOSAHEDRON AVATAR
   ================================================================ */
function initIcosahedron() {
  var stage = document.getElementById('avatar-orbit-canvas') || document.getElementById('avatar-stage');
  if (!stage) return;

  /* -- Geometry -------------------------------------------------- */
  var phi = (1 + Math.sqrt(5)) / 2;

  var RAW_VERTS = [
    [ 0,  1,  phi], [ 0, -1,  phi], [ 0,  1, -phi], [ 0, -1, -phi],
    [ 1,  phi,  0], [-1,  phi,  0], [ 1, -phi,  0], [-1, -phi,  0],
    [ phi,  0,  1], [-phi,  0,  1], [ phi,  0, -1], [-phi,  0, -1]
  ];

  var EDGES = [
    [0,1],[0,4],[0,5],[0,8],[0,9],
    [1,6],[1,7],[1,8],[1,9],
    [2,3],[2,4],[2,5],[2,10],[2,11],
    [3,6],[3,7],[3,10],[3,11],
    [4,5],[4,8],[4,10],
    [5,9],[5,11],
    [6,7],[6,8],[6,10],
    [7,9],[7,11],
    [8,10],[9,11]
  ];

  /* -- Build scene ----------------------------------------------- */
  var scene = document.createElement('div');
  scene.className = 'icos-scene';
  stage.appendChild(scene);

  /* -- Scale vertices to stage size ------------------------------ */
  var RADIUS = Math.max(95, Math.min(stage.offsetWidth || 220, stage.offsetHeight || 220) * 0.42);

  var verts = RAW_VERTS.map(function(v) {
    return { x: v[0] * RADIUS, y: v[1] * RADIUS, z: v[2] * RADIUS };
  });

  /* -- Create vertex dots ---------------------------------------- */
  verts.forEach(function(v) {
    var dot = document.createElement('div');
    dot.className = 'icos-vertex';
    dot.style.transform = 'translate3d(' + v.x + 'px,' + v.y + 'px,' + v.z + 'px)';
    scene.appendChild(dot);
  });

  /* -- Create edge bars ------------------------------------------ */
  var edgeDivs = EDGES.map(function(pair) {
    var A = verts[pair[0]];
    var B = verts[pair[1]];
    var dx = B.x - A.x, dy = B.y - A.y, dz = B.z - A.z;
    var len = Math.sqrt(dx*dx + dy*dy + dz*dz);
    var mx = (A.x + B.x) / 2;
    var my = (A.y + B.y) / 2;
    var mz = (A.z + B.z) / 2;
    var ry = -Math.atan2(dz, dx) * 180 / Math.PI;
    var rz =  Math.atan2(dy, Math.sqrt(dx*dx + dz*dz)) * 180 / Math.PI;

    var bar = document.createElement('div');
    bar.className = 'icos-edge';
    bar.style.width = len + 'px';
    bar.style.transform = [
      'translate3d(' + mx + 'px,' + my + 'px,' + mz + 'px)',
      'rotateY(' + ry + 'deg)',
      'rotateZ(' + rz + 'deg)'
    ].join(' ');
    scene.appendChild(bar);
    return bar;
  });

  /* -- Animation loop -------------------------------------------- */
  var rotY = 0, rotX = 15;
  var speedY = 12, speedX = 5;
  var hovered = false;
  var lastT = null;

  stage.addEventListener('mouseenter', function() { hovered = true; });
  stage.addEventListener('mouseleave', function() { hovered = false; });

  function animateIcos(ts) {
    if (lastT === null) lastT = ts;
    var dt = Math.min((ts - lastT) / 1000, 0.1);
    lastT = ts;

    var targetSpeedY = hovered ? 36 : 12;
    var targetSpeedX = hovered ? 15 : 5;
    speedY += (targetSpeedY - speedY) * dt * 4;
    speedX += (targetSpeedX - speedX) * dt * 4;

    rotY += speedY * dt;
    rotX += speedX * dt * 0.3;

    scene.style.transform = 'rotateY(' + rotY + 'deg) rotateX(' + rotX + 'deg)';
    requestAnimationFrame(animateIcos);
  }
  requestAnimationFrame(animateIcos);
}

/* ================================================================
   2. THEME TOGGLE
   ================================================================ */
function initTheme() {
  var btn = document.getElementById('themeBtn');
  var root = document.documentElement;
  var stored = localStorage.getItem('theme');
  // Default to Light Mode (signature editorial feel) unless explicitly toggled
  if (stored === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.setAttribute('data-theme', 'light');
  }
  if (!btn) return;
  btn.addEventListener('click', function() {
    var isDark = root.getAttribute('data-theme') === 'dark';
    var next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

/* ================================================================
   3. SCROLL REVEAL
   ================================================================ */
function initScrollReveal() {
  /* Mark sections that should reveal */
  var selectors = ['#skills', '#certifications', '#connect', '.recruiter-tray', 'footer'];
  selectors.forEach(function(sel) {
    var el = document.querySelector(sel);
    if (el) el.setAttribute('data-reveal', '');
  });

  /* Also reveal any element that already carries the attribute in HTML */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    /* Fallback: show everything immediately */
    revealEls.forEach(function(el) { el.classList.add('revealed'); });
    return;
  }

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(function(el) { obs.observe(el); });
}

/* ================================================================
   4. ACTIVE NAV HIGHLIGHT ON SCROLL
   ================================================================ */
function initActiveNav() {
  var sectionIds = ['experience', 'projects', 'skills', 'connect'];
  var navLinks = {};
  sectionIds.forEach(function(id) {
    var link = document.querySelector('.nav-links a[href="#' + id + '"]');
    if (link) navLinks[id] = link;
  });

  if (!('IntersectionObserver' in window)) return;

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      var id = entry.target.id;
      if (!navLinks[id]) return;
      if (entry.isIntersecting) {
        /* Remove active from all, add to current */
        Object.values(navLinks).forEach(function(l) { l.classList.remove('active'); });
        navLinks[id].classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sectionIds.forEach(function(id) {
    var section = document.getElementById(id);
    if (section) obs.observe(section);
  });
}

/* ================================================================
   5. GITHUB API
   ================================================================ */
function loadGitHub() {
  var statsEl = document.getElementById('github-stats');
  if (!statsEl) return;
  fetch('https://api.github.com/users/Praful224/repos?per_page=100&sort=updated')
    .then(function(r) { return r.json(); })
    .then(function(repos) {
      if (!Array.isArray(repos)) throw new Error('API error');
      var count = repos.length;
      var langs = {};
      repos.forEach(function(r) {
        if (r.language) langs[r.language] = (langs[r.language] || 0) + 1;
      });
      var topLangs = Object.entries(langs)
        .sort(function(a, b) { return b[1] - a[1]; })
        .slice(0, 3)
        .map(function(e) { return e[0]; })
        .join(' · ');
      statsEl.innerHTML =
        '<span class="chip">' + count + ' repos</span> ' +
        '<span class="chip">' + topLangs + '</span>';
    })
    .catch(function() {
      statsEl.innerHTML = '<span class="chip">Go</span><span class="chip">Python</span>';
    });
}

/* ================================================================
   6. CLIPBOARD / TOAST
   ================================================================ */
function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2800);
}

function initClipboard() {
  var btn = document.getElementById('copyEmailBtn');
  if (!btn) return;
  btn.addEventListener('click', function() {
    navigator.clipboard.writeText('prafulchalakh224@gmail.com')
      .then(function() { showToast('Email copied ✓'); })
      .catch(function() { showToast('prafulchalakh224@gmail.com'); });
  });
}

/* ================================================================
   7. PROJECT FILTER BUTTONS
   ================================================================ */
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      window.activeProjectFilter = f;
      if (typeof window.onFilterChange === 'function') {
        window.onFilterChange(f);
      }
    });
  });
}

/* ================================================================
   8. MOBILE NAVIGATION DRAWER
   ================================================================ */
function initMobileNav() {
  var toggleBtn = document.getElementById('mobileToggleBtn');
  var drawer = document.getElementById('mobileNavDrawer');
  if (!toggleBtn || !drawer) return;

  function openMenu() {
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('mobile-nav-locked');
  }

  function closeMenu() {
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('mobile-nav-locked');
  }

  toggleBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    var isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when tapping any link inside the drawer
  drawer.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      closeMenu();
    });
  });

  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (drawer.classList.contains('is-open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* ================================================================
   9. SMOOTH SCROLL (native-scroll polyfill for anchor links)
   ================================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ================================================================
   BOOT
   ================================================================ */
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initIcosahedron();
  initScrollReveal();
  initActiveNav();
  initMobileNav();
  initSmoothScroll();
  initClipboard();
  initFilters();
  loadGitHub();
});
