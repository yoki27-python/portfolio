/**
 * Main Application Engine for Yokeshwaran R's Personal Portfolio
 */

(function () {
  'use strict';

  // --- 1. LIVE CHENNAI TIME CLOCK ---
  function initChennaiClock() {
    const clockEl = document.getElementById('chennai-clock');
    if (!clockEl) return;

    function updateTime() {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeStr = new Intl.DateTimeFormat('en-US', options).format(new Date());
      clockEl.textContent = `${timeStr} IST`;
    }

    updateTime();
    setInterval(updateTime, 1000);
  }

  // --- 2. HEADER SCROLL EFFECT & SCROLL SPY ---
  function initNavigation() {
    const header = document.getElementById('site-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Scroll blur & shadow
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Scroll Spy
      let currentSection = '';
      const scrollPos = window.scrollY + 180;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    });

    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        const isOpen = mobileMenu.classList.contains('open');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          mobileMenuBtn.classList.remove('open');
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }
  }

  // --- 3. PROJECT FILTERING ---
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        if (window.soundEngine) window.soundEngine.playClick();

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          if (card._filterTimeout) {
            clearTimeout(card._filterTimeout);
            card._filterTimeout = null;
          }
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter || card.classList.contains(filter)) {
            card.style.display = 'flex';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.95)';
            card._filterTimeout = setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // --- 4. PROJECT DETAILS MODAL ---
  const PROJECT_DATA = {
    nexusflow: {
      title: 'NexusFlow — Intelligent Workflow Engine',
      subtitle: 'Real-time collaborative kanban & automated task intelligence engine',
      category: 'Full-Stack / Cloud Architecture',
      duration: '4 Months • Completed System',
      description:
        'NexusFlow is a high-throughput collaborative management ecosystem engineered for modern software development squads. It provides real-time state synchronization over WebSockets, smart priority scoring based on sprint velocity, and end-to-end task telemetry.',
      highlights: [
        'Sub-15ms WebSocket event delivery across connected browser clients',
        'Optimistic UI mutations with automatic reconciliation and conflict resolution',
        'Integrated PostgreSQL schema with index-tuned JSONB query paths',
        'Custom drag-and-drop mechanics with tactile micro-interactions'
      ],
      technologies: ['React 18', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'WebSockets', 'Tailwind CSS', 'Docker'],
      liveDemo: '#',
      github: 'https://github.com/yokeshwaran/nexusflow',
      architecture: 'Distributed Client-Server with WebSocket Mesh & Redis Pub/Sub layer.'
    },
    aurastream: {
      title: 'AuraStream — Telemetry & Analytics Dashboard',
      subtitle: 'Real-time telemetry monitor with 60fps charting and system health feeds',
      category: 'Frontend & Systems',
      duration: '3 Months • Production Ready',
      description:
        'AuraStream delivers mission-critical operational metrics for microservice architectures. Engineered with a virtualized canvas rendering pipeline, it processes up to 10,000 telemetry points per second without UI thread hitching or memory leaks.',
      highlights: [
        'Custom hardware-accelerated canvas chart renderer with 60fps frame budgeting',
        'Multi-series anomaly detection highlighting latency deviations',
        'Configurable threshold alerts with browser sound notification triggers',
        'Modular dashboard grid with persistent layout caching in localStorage'
      ],
      technologies: ['TypeScript', 'Canvas API', 'Chart.js', 'Node.js', 'Redis', 'Express', 'Tailwind CSS'],
      liveDemo: '#',
      github: 'https://github.com/yokeshwaran/aurastream',
      architecture: 'Asynchronous event stream ingestion with web workers for zero UI blocking.'
    },
    algoverse: {
      title: 'Algoverse — Interactive Algorithm Visualizer',
      subtitle: 'High-fidelity educational simulation for algorithms & data structures',
      category: 'Core CS / Systems',
      duration: '2 Months • Academic Project',
      description:
        'Built to deepen core computer science intuition at Hindustan College. Algoverse lets learners step through sorting algorithms (QuickSort, MergeSort, RadixSort), graph pathfinders (Dijkstra, A*, BFS, DFS), and binary tree balancing in real-time with variable step speed.',
      highlights: [
        'Frame-by-frame execution control (Play, Pause, Step Forward, Step Back)',
        'Visual complexity comparisons (Big-O time and space counters updated dynamically)',
        'Custom maze and obstacle generator for graph traversal pathfinding',
        'Fully responsive canvas engine built with vanilla ES6+ for instant zero-dependency execution'
      ],
      technologies: ['Vanilla ES6+', 'HTML5 Canvas', 'Data Structures Engine', 'Web Audio API', 'CSS Grid'],
      liveDemo: '#',
      github: 'https://github.com/yokeshwaran/algoverse',
      architecture: 'State machine generator pipeline yielding step snapshots for reversible execution.'
    },
    smartcampus: {
      title: 'SmartCampus — Collegiate Academic Portal',
      subtitle: 'Integrated resource management and attendance intelligence for university cohorts',
      category: 'Full-Stack / University Project',
      duration: '3 Months • Active Deployment',
      description:
        'Designed specifically for collegiate peer collaboration, SmartCampus simplifies syllabus tracking, note repository sharing, internal assessment analytics, and laboratory manual repositories for Computer Science batches.',
      highlights: [
        'Role-based access control (Student, Class Representative, Lab Assistant)',
        'Predictive attendance simulator warning students before falling below 75% thresholds',
        'Decentralized peer-to-peer resource sharing with verified checksums',
        'Blazing fast search indexing across semester course modules'
      ],
      technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Tailwind CSS', 'JWT Auth'],
      liveDemo: '#',
      github: 'https://github.com/yokeshwaran/smartcampus',
      architecture: 'RESTful API with JWT token rotation, MongoDB replica sets, and Cloudinary storage.'
    }
  };

  function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('project-modal-close');
    const modalTitle = document.getElementById('modal-project-title');
    const modalSubtitle = document.getElementById('modal-project-subtitle');
    const modalCategory = document.getElementById('modal-project-category');
    const modalDescription = document.getElementById('modal-project-description');
    const modalHighlights = document.getElementById('modal-project-highlights');
    const modalTechStack = document.getElementById('modal-project-tech');
    const modalLiveBtn = document.getElementById('modal-project-live');
    const modalGithubBtn = document.getElementById('modal-project-github');
    const detailTriggers = document.querySelectorAll('[data-project-id]');

    if (!modal) return;

    function openModal(projectId) {
      const data = PROJECT_DATA[projectId];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      modalCategory.textContent = data.category;
      modalDescription.textContent = data.description;

      // Highlights
      modalHighlights.innerHTML = '';
      data.highlights.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>✓</span> <div>${item}</div>`;
        modalHighlights.appendChild(li);
      });

      // Tech Stack
      modalTechStack.innerHTML = '';
      data.technologies.forEach((tech) => {
        const badge = document.createElement('span');
        badge.className = 'tech-pill';
        badge.textContent = tech;
        modalTechStack.appendChild(badge);
      });

      // Links
      if (modalLiveBtn) modalLiveBtn.href = data.liveDemo;
      if (modalGithubBtn) modalGithubBtn.href = data.github;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (window.soundEngine) window.soundEngine.playChime();
    }

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (window.soundEngine) window.soundEngine.playClick();
    }

    detailTriggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-project-id');
        openModal(id);
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // --- 5. CLIPBOARD COPY UTILITY ---
  function initCopyButtons() {
    const copyBtns = document.querySelectorAll('[data-copy]');
    const toast = document.getElementById('toast-notification');

    function showToast(message) {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add('show');
      if (window.soundEngine) window.soundEngine.playKey();

      setTimeout(() => {
        toast.classList.remove('show');
      }, 2800);
    }

    copyBtns.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const textToCopy = btn.getAttribute('data-copy');
        try {
          await navigator.clipboard.writeText(textToCopy);
          showToast(`Copied "${textToCopy}" to clipboard!`);
        } catch (err) {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }
      });
    });

    window.showToast = showToast;
  }

  // --- 6. WORKING CONTACT FORM ---
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
      const message = messageInput.value.trim();

      if (!name || !email || !message) {
        if (window.showToast) window.showToast('⚠️ Please fill out all required fields.');
        return;
      }

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (window.showToast) window.showToast('⚠️ Please enter a valid email address.');
        return;
      }

      // Button loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spinner" viewBox="0 0 50 50" style="width:18px;height:18px;animation:spin 1s linear infinite;display:inline-block;vertical-align:middle;margin-right:8px;">
            <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="31.4 31.4"></circle>
          </svg>
          Transmitting...
        `;
      }

      // Simulate sending and trigger mailto fallback option
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>✓ Message Sent!</span>`;
        }

        if (window.soundEngine) window.soundEngine.playChime();
        if (window.showToast) {
          window.showToast(`Thank you, ${name}! Your message has been prepared.`);
        }

        // Open user's email client directly as a courtesy
        const mailtoLink = `mailto:yokeshwaran.dev@gmail.com?subject=${encodeURIComponent(
          `[Portfolio Contact] ${subject} - from ${name}`
        )}&body=${encodeURIComponent(`Hi Yokeshwaran,\n\n${message}\n\nFrom: ${name} (${email})`)}`;

        setTimeout(() => {
          try {
            const mailLink = document.createElement('a');
            mailLink.href = mailtoLink;
            mailLink.style.display = 'none';
            document.body.appendChild(mailLink);
            mailLink.click();
            setTimeout(() => {
              if (document.body.contains(mailLink)) {
                document.body.removeChild(mailLink);
              }
            }, 100);
          } catch (e) {
            window.location.href = mailtoLink;
          }
        }, 800);

        // Reset after 3.5 seconds
        setTimeout(() => {
          form.reset();
          if (submitBtn) submitBtn.innerHTML = originalBtnText;
        }, 3500);
      }, 1000);
    });
  }

  // --- 7. AUDIO TOGGLE BUTTON ---
  function initAudioToggle() {
    const toggleBtn = document.getElementById('sound-toggle-btn');
    if (!toggleBtn) return;

    function updateIcon(enabled) {
      if (enabled) {
        toggleBtn.classList.add('audio-active');
        toggleBtn.setAttribute('title', 'Sound FX: ON (Click to mute)');
        toggleBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        `;
      } else {
        toggleBtn.classList.remove('audio-active');
        toggleBtn.setAttribute('title', 'Sound FX: MUTED (Click to activate)');
        toggleBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        `;
      }
    }

    if (window.soundEngine) {
      updateIcon(window.soundEngine.enabled);
    }

    toggleBtn.addEventListener('click', () => {
      if (window.soundEngine) {
        const isNowOn = window.soundEngine.toggle();
        updateIcon(isNowOn);
        if (window.showToast) {
          window.showToast(isNowOn ? '🔊 Audio FX activated' : '🔇 Audio FX muted');
        }
      }
    });
  }

  // --- 8. ACCENT THEME TOGGLE (CYAN / VIOLET / EMERALD) ---
  function initThemeChanger() {
    const themeBtn = document.getElementById('theme-glow-toggle');
    if (!themeBtn) return;

    const themes = ['theme-cyan', 'theme-violet', 'theme-emerald'];
    let currentThemeIdx = 0;

    let savedTheme = 'theme-cyan';
    try {
      savedTheme = localStorage.getItem('user_portfolio_theme') || 'theme-cyan';
    } catch (e) {}
    const initialIdx = themes.indexOf(savedTheme);
    if (initialIdx !== -1) currentThemeIdx = initialIdx;

    document.documentElement.className = themes[currentThemeIdx];

    themeBtn.addEventListener('click', () => {
      currentThemeIdx = (currentThemeIdx + 1) % themes.length;
      const nextTheme = themes[currentThemeIdx];
      document.documentElement.className = nextTheme;
      try {
        localStorage.setItem('user_portfolio_theme', nextTheme);
      } catch (e) {}

      if (window.soundEngine) window.soundEngine.playKey();
      if (window.showToast) {
        const labels = {
          'theme-cyan': 'Cyan Neon Glow',
          'theme-violet': 'Cyber Violet Glow',
          'theme-emerald': 'Matrix Emerald Glow'
        };
        window.showToast(`✨ Glow style: ${labels[nextTheme]}`);
      }
    });
  }

  // --- 9. RESUME QUICK PREVIEW MODAL ---
  function initResumeModal() {
    const resumeTriggers = document.querySelectorAll('[data-open-resume]');
    const resumeModal = document.getElementById('resume-modal');
    const resumeCloseBtn = document.getElementById('resume-modal-close');

    if (!resumeModal) return;

    function openResume() {
      resumeModal.classList.add('active');
      resumeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (window.soundEngine) window.soundEngine.playChime();
    }

    function closeResume() {
      resumeModal.classList.remove('active');
      resumeModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (window.soundEngine) window.soundEngine.playClick();
    }

    resumeTriggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openResume();
      });
    });

    if (resumeCloseBtn) {
      resumeCloseBtn.addEventListener('click', closeResume);
    }

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResume();
      }
    });
  }

  // --- 10. KONAMI CODE EASTER EGG ---
  function initKonami() {
    const pattern = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a'
    ];
    let current = 0;

    window.addEventListener('keydown', (e) => {
      if (e.key === pattern[current]) {
        current++;
        if (current === pattern.length) {
          current = 0;
          if (window.soundEngine) window.soundEngine.playChime();
          if (window.showToast) window.showToast('🚀 GOD SPEED! Developer Easter Egg Unlocked!');
          if (window.openTerminal) window.openTerminal();
        }
      } else {
        current = 0;
      }
    });
  }

  // INITIALIZE APPLICATION
  function initApp() {
    initChennaiClock();
    initNavigation();
    initProjectFilters();
    initProjectModal();
    initCopyButtons();
    initContactForm();
    initAudioToggle();
    initThemeChanger();
    initResumeModal();
    initKonami();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();

