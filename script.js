(() => {
  'use strict';
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('site-menu');
  const progress = document.querySelector('.reading-progress');

  // Honor a previously chosen mode, or the operating system's preference.
  let savedTheme;
  try { savedTheme = localStorage.getItem('lalkishen-theme'); } catch (_) { /* Browser storage may be disabled */ }
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
  const setTheme = (next) => {
    currentTheme = next;
    root.dataset.theme = next;
    themeIcon.textContent = next === 'dark' ? '☀' : '☾';
    themeToggle.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', next === 'dark' ? '#111c1b' : '#f7f8f5');
  };
  setTheme(currentTheme);
  themeToggle.addEventListener('click', () => {
    const next = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try { localStorage.setItem('lalkishen-theme', next); } catch (_) { /* Harmless */ }
  });

  function setMenuOpen(open) {
    menu.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }
  menuToggle.addEventListener('click', () => setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-shell') && menu.classList.contains('open')) setMenuOpen(false);
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenuOpen(false); });

  const revealed = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -45px 0px', threshold: .07 });
    revealed.forEach(item => revealObserver.observe(item));
  } else {
    revealed.forEach(item => item.classList.add('visible'));
  }

  const sectionLinks = [...menu.querySelectorAll('a[href^="#"]')];
  const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const full = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${full > 0 ? (window.scrollY / full) * 100 : 0}%`;
      let active = null;
      sections.forEach(section => {
        if (section.getBoundingClientRect().top <= 170) active = section.id;
      });
      sectionLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${active}`;
        link.classList.toggle('is-active', isActive);
        if (isActive) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
      });
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  document.getElementById('year').textContent = new Date().getFullYear();

  // Real links go to public repositories; detail buttons explain the product rationale.
  const projects = {
    timewise: {
      kicker: 'AI PRODUCT · PERSONAL PROJECT / MVP',
      title: 'TimeWise — Free Time, Better Spent',
      lead: 'An AI-powered free-time discovery app for people who know how much time and money they have, but not what to do with it.',
      problem: 'Choosing an activity often means jumping between maps, review sites, budgets, and travel estimates. A list of venues is not the same as a plan a person can actually follow.',
      built: [
        'Defined the target users, problem statement, MVP scope, core journeys and recommendation criteria.',
        'Built natural-language intent extraction to capture available time, location, budget, preferences, and desired planning mode.',
        'Designed multi-step recommendation and itinerary generation with feasibility checks and location-service integrations.',
        'Created a LangSmith evaluation approach for mode correctness, relevance, safety, and itinerary quality.'
      ],
      learning: 'Initial baseline checks achieved 100% on mode, relevance, and constraint criteria across four test cases. The small sample also exposed itinerary quality gaps, informing further iteration. This is an MVP, not a production launch.',
      stack: 'Python · Streamlit · LangChain · LangGraph · Gemini · MCP · LangSmith',
      github: 'https://github.com/Lalkishen-m/Timewise'
    },
    research: {
      kicker: 'AGENTIC AI · PERSONAL PROJECT',
      title: 'AI Research Assistant',
      lead: 'A research workflow that explores multiple sources, checks what it has found, and turns fragmented evidence into readable reports.',
      problem: 'Single-pass AI answers can miss relevant information or lean too heavily on the first retrieved source. Research benefits from explicit retrieval, validation, and opportunities to correct course.',
      built: [
        'Classified incoming queries and routed research across web sources, PDFs, or both.',
        'Added multi-query retrieval and multi-hop follow-up searches to widen evidence coverage.',
        'Designed evidence sufficiency checks and an output-validation retry loop.',
        'Implemented a composite memory approach to reuse context across research tasks.'
      ],
      learning: 'The design emphasizes traceability, source breadth, and recoverable workflows rather than simply generating longer answers.',
      stack: 'Python · LangChain · Gemini · RAG · Multi-query Retrieval',
      github: 'https://github.com/Lalkishen-m/ai_research_assistant'
    },
    loan: {
      kicker: 'AI WORKFLOWS · SIMULATED FINTECH PROJECT',
      title: 'Loan Orchestrator',
      lead: 'A stateful lending-workflow simulation that combines parallel checks, decision rules, and human review for exceptional cases.',
      problem: 'Financial workflows involve independent checks, dependencies, exceptions and approvals. A fragile linear flow makes failures difficult to recover from and decisions harder to audit.',
      built: [
        'Modelled application validation followed by parallel KYC, income and fraud checks.',
        'Added conditional routing through risk assessment and policy decisions.',
        'Used SQLite checkpointing for resumable workflow state.',
        'Introduced human-in-the-loop approval for exceptions and maintained a traceable decision path.'
      ],
      learning: 'This is a simulated prototype; potential reductions in manual review and turnaround time are design objectives, not measured production results.',
      stack: 'Python · LangGraph · SQLite · Human-in-the-Loop · Checkpointing',
      github: 'https://github.com/Lalkishen-m/loan-orchestrator'
    }
  };

  const dialog = document.getElementById('case-dialog');
  const dialogClose = document.getElementById('dialog-close');
  const dialogDone = document.getElementById('dialog-done');
  let returnFocus = null;
  function closeDialog() {
    dialog.close();
    document.body.classList.remove('dialog-open');
    if (returnFocus) returnFocus.focus();
  }
  document.querySelectorAll('[data-project]').forEach(button => {
    button.addEventListener('click', () => {
      const project = projects[button.dataset.project];
      if (!project) return;
      returnFocus = button;
      document.getElementById('dialog-kicker').textContent = project.kicker;
      document.getElementById('dialog-title').textContent = project.title;
      document.getElementById('dialog-lead').textContent = project.lead;
      const content = document.getElementById('dialog-content');
      content.replaceChildren();
      const addHeading = (heading) => { const h = document.createElement('h3'); h.textContent = heading; content.append(h); };
      const addParagraph = (copy) => { const p = document.createElement('p'); p.textContent = copy; content.append(p); };
      addHeading('The problem'); addParagraph(project.problem);
      addHeading('What I designed & built');
      const list = document.createElement('ul');
      project.built.forEach(item => { const li = document.createElement('li'); li.textContent = item; list.append(li); });
      content.append(list);
      addHeading('Outcome & learning'); addParagraph(project.learning);
      addHeading('Tools & technology'); addParagraph(project.stack);
      document.getElementById('dialog-github').href = project.github;
      dialog.showModal();
      document.body.classList.add('dialog-open');
      dialogClose.focus();
    });
  });
  dialogClose.addEventListener('click', closeDialog);
  dialogDone.addEventListener('click', closeDialog);
  dialog.addEventListener('click', (event) => { if (event.target === dialog) closeDialog(); });
  dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); });

  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Hi Lalkishen,\n\n${message}\n\nFrom: ${name}\nReply to: ${email}`);
    document.getElementById('form-note').textContent = 'Your email app should open with a draft. If it doesn’t, email mlalkishen@gmail.com directly.';
    window.location.href = `mailto:mlalkishen@gmail.com?subject=${subject}&body=${body}`;
  });
})();
