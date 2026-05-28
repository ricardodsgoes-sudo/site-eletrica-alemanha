/* DRI Elektrotechnik — small interactions */
(function () {
  'use strict';

  /* Year in footer */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Cookie / consent banner ---------- */
  const consentKey = 'driCookieConsent';
  const consentVersion = 1;
  const consentDefaults = {
    essential: true,
    statistics: false,
    marketing: false,
    externalMedia: false,
  };

  const readConsent = () => {
    try {
      const stored = localStorage.getItem(consentKey);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      if (!parsed || parsed.version !== consentVersion || !parsed.categories) return null;
      return {
        ...consentDefaults,
        ...parsed.categories,
        essential: true,
      };
    } catch (error) {
      return null;
    }
  };

  const publishConsent = (categories) => {
    window.driConsent = {
      ...consentDefaults,
      ...categories,
      essential: true,
    };
    window.dispatchEvent(new CustomEvent('dri:consentchange', { detail: window.driConsent }));
  };

  const saveConsent = (categories) => {
    const next = {
      ...consentDefaults,
      ...categories,
      essential: true,
    };
    localStorage.setItem(consentKey, JSON.stringify({
      version: consentVersion,
      savedAt: new Date().toISOString(),
      categories: next,
    }));
    publishConsent(next);
  };

  const existingConsent = readConsent();
  if (existingConsent) publishConsent(existingConsent);
  else publishConsent(consentDefaults);

  const initCookieBanner = (forceOpen = false) => {
    if (document.getElementById('cookieConsent')) return;
    if (existingConsent && !forceOpen) return;

    const banner = document.createElement('section');
    banner.className = 'cookie-consent';
    banner.id = 'cookieConsent';
    banner.setAttribute('aria-label', 'Cookie-Einstellungen');
    banner.innerHTML = `
      <div class="cookie-consent__panel" role="dialog" aria-modal="false" aria-labelledby="cookieConsentTitle">
        <div class="cookie-consent__intro">
          <h2 id="cookieConsentTitle">Cookies & Datenschutz</h2>
          <p>
            Wir verwenden notwendige Technologien für den Betrieb der Website. Optionale Dienste wie Analytics,
            Meta Pixel oder Google Maps werden erst nach Zustimmung aktiviert.
            <a href="datenschutz.html">Datenschutzerklärung</a>
          </p>
        </div>

        <div class="cookie-consent__actions">
          <button class="cookie-btn cookie-btn--ghost" type="button" data-cookie-action="reject">Ablehnen</button>
          <button class="cookie-btn cookie-btn--primary" type="button" data-cookie-action="accept">Akzeptieren</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
    const acceptBtn = banner.querySelector('[data-cookie-action="accept"]');
    const rejectBtn = banner.querySelector('[data-cookie-action="reject"]');

    const closeBanner = () => {
      banner.classList.add('is-hiding');
      window.setTimeout(() => banner.remove(), 220);
    };

    acceptBtn?.addEventListener('click', () => {
      saveConsent({ statistics: true, marketing: true, externalMedia: true });
      closeBanner();
    });

    rejectBtn?.addEventListener('click', () => {
      saveConsent({ statistics: false, marketing: false, externalMedia: false });
      closeBanner();
    });
  };

  initCookieBanner();

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-cookie-open]');
    if (!trigger) return;
    event.preventDefault();
    initCookieBanner(true);
  });

  /* ---------- Smooth scroll ---------- */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lenis = null;

  /* ---------- Hero video (play once, then keep static image) ---------- */
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo && !prefersReduced) {
    const src = heroVideo.dataset.src;
    if (src) {
      heroVideo.src = src;
      heroVideo.load();

      const revealVideo = () => {
        heroVideo.classList.add('is-ready');
      };

      const showStaticHero = () => {
        const wasVisible = heroVideo.classList.contains('is-ready');

        heroVideo.classList.remove('is-ready');
        heroVideo.pause();

        const unloadVideo = () => {
          heroVideo.removeAttribute('src');
          heroVideo.load();
        };

        if (!wasVisible) {
          unloadVideo();
          return;
        }

        let fallbackTimer = null;
        const cleanupAfterFade = (event) => {
          if (event && event.propertyName !== 'opacity') return;
          if (fallbackTimer) window.clearTimeout(fallbackTimer);
          heroVideo.removeEventListener('transitionend', cleanupAfterFade);
          unloadVideo();
        };

        heroVideo.addEventListener('transitionend', cleanupAfterFade);
        fallbackTimer = window.setTimeout(cleanupAfterFade, 1100);
      };

      heroVideo.addEventListener('playing', revealVideo, { once: true });
      heroVideo.addEventListener('ended', showStaticHero, { once: true });

      const playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(showStaticHero);
      }
    }
  }

  if (typeof Lenis !== 'undefined' && !prefersReduced) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      lerp: 0.1,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      const headerOffset = 80;
      if (lenis) {
        lenis.scrollTo(target, { offset: -headerOffset, duration: 1.2 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({
          top,
          behavior: prefersReduced ? 'auto' : 'smooth',
        });
      }
    });
  });

  /* Sticky header subtle border on scroll */
  const header = document.getElementById('siteHeader');
  const onScroll = (y) => {
    if (!header) return;
    const scrollY = typeof y === 'number' ? y : window.scrollY;
    if (scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };

  if (lenis) {
    lenis.on('scroll', ({ scroll }) => onScroll(scroll));
  } else {
    window.addEventListener('scroll', () => onScroll(), { passive: true });
  }
  onScroll();

  /* Mobile nav toggle */
  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        mobileNav.hidden = true;
      } else {
        mobileNav.hidden = false;
      }
    });
    mobileNav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      });
    });
  }

  const initGsapMotion = (targets) => {
    if (typeof gsap === 'undefined' || prefersReduced) return false;

    const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
    if (hasScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      if (lenis) lenis.on('scroll', ScrollTrigger.update);
    }

    document.documentElement.classList.add('has-gsap-motion');

    const q = gsap.utils.selector(document);
    const scrollTargets = Array.from(targets).filter((el) => (
      !el.closest('.service-hero') &&
      !el.closest('.energy-hero') &&
      !el.closest('.smart-hero') &&
      !el.classList.contains('timeline-item') &&
      !el.classList.contains('energy-step') &&
      !el.classList.contains('energy-module') &&
      !el.classList.contains('smart-module') &&
      !el.classList.contains('smart-step')
    ));
    const heroItems = q('.service-hero-copy .service-kicker, .service-hero-copy h1, .service-hero-copy p, .service-hero-actions, .technical-checklist, .energy-hero-copy .energy-eyebrow, .energy-hero-copy h1, .energy-hero-copy p, .energy-hero-actions, .smart-hero-copy .smart-eyebrow, .smart-hero-copy h1, .smart-hero-copy p, .smart-hero-actions');

    if (heroItems.length) {
      gsap.from(
        heroItems,
        {
          y: 24,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      );
    }

    if (document.querySelector('.service-visual-card, .energy-hero-stage, .smart-control-stage')) {
      gsap.fromTo(
        '.service-visual-card, .energy-hero-stage, .smart-control-stage',
        { x: 42, scale: 0.96 },
        {
          x: 0,
          scale: 1,
          duration: 1,
          delay: 0.16,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      );
    }

    if (hasScrollTrigger && scrollTargets.length) {
      ScrollTrigger.batch(scrollTargets, {
        start: 'top 86%',
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            y: 30,
            duration: 0.82,
            stagger: 0.075,
            ease: 'power3.out',
            clearProps: 'transform',
          });
        },
      });
    } else if (scrollTargets.length) {
      gsap.from(scrollTargets, {
        y: 24,
        duration: 0.7,
        stagger: 0.05,
        ease: 'power3.out',
        clearProps: 'transform',
      });
    }

    if (hasScrollTrigger) {
      q('.detail-card img, .commercial-media img, .energy-module img, .energy-hero-media img, .smart-room-photo img, .smart-scene-board img, .smart-module img, .smart-argument-panel img').forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.08 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.45,
            },
          }
        );
      });

      q('.energy-line, .energy-cable, .energy-system-line i, .topology-line').forEach((line, index) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.9,
            delay: index * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: line.closest('.energy-dashboard, .energy-system-card, .energy-panel') || line,
              start: 'top 78%',
              once: true,
            },
          }
        );
      });

      q('.timeline-item, .energy-step').forEach((item, index) => {
        gsap.fromTo(
          item,
          { x: index % 2 === 0 ? -24 : 24 },
          {
            x: 0,
            duration: 0.72,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 84%',
              once: true,
            },
          }
        );
      });

      q('.energy-module').forEach((module, index) => {
        gsap.fromTo(
          module,
          { x: index % 2 === 0 ? -48 : 48, scale: 0.985 },
          {
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: module,
              start: 'top 82%',
              once: true,
            },
          }
        );
      });

      q('.smart-module').forEach((module, index) => {
        gsap.fromTo(
          module,
          { y: 34, scale: 0.985 },
          {
            y: 0,
            scale: 1,
            duration: 0.82,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: module,
              start: 'top 84%',
              once: true,
            },
          }
        );
      });

      q('.smart-step').forEach((step, index) => {
        gsap.fromTo(
          step,
          { x: index % 2 === 0 ? -28 : 28 },
          {
            x: 0,
            duration: 0.72,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 86%',
              once: true,
            },
          }
        );
      });
    }

    q('.visual-node, .plan-node, .energy-node, .smart-signal, .topology-node').forEach((node, index) => {
      gsap.to(node, {
        scale: 1.22,
        opacity: 0.78,
        duration: 1.6 + index * 0.15,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    q('.smart-dials span').forEach((dial, index) => {
      gsap.to(dial, {
        rotate: 360,
        duration: 7 + index,
        ease: 'none',
        repeat: -1,
      });
    });

    q('.overview-card, .detail-card, .commercial-panel, .service-visual-card, .energy-flow-card, .energy-module, .energy-argument-card, .energy-step, .energy-hero-stage, .smart-benefit-card, .smart-module, .smart-argument-panel, .smart-step, .smart-control-stage, .smart-scene-board').forEach((card) => {
      const media = card.querySelector('img');
      const icon = card.querySelector('.overview-icon, .detail-icon, .commercial-icon, .energy-argument-mark');

      card.addEventListener('pointerenter', () => {
        if (media) {
          gsap.to(media, { scale: 1.055, duration: 0.55, ease: 'power3.out' });
        }
        if (icon) {
          gsap.to(icon, { y: -3, scale: 1.04, duration: 0.34, ease: 'power2.out' });
        }
      });

      card.addEventListener('pointerleave', () => {
        if (media) {
          gsap.to(media, { scale: 1, duration: 0.62, ease: 'power3.out', clearProps: 'transform' });
        }
        if (icon) {
          gsap.to(icon, { y: 0, scale: 1, duration: 0.34, ease: 'power2.out', clearProps: 'transform' });
        }
      });
    });

    return true;
  };

  /* Reveal on scroll for sections */
  const revealTargets = document.querySelectorAll(
    '.hero-content, .feature-card, .section-header, .section-header-left, .service-card, .planning-card, .process-step, .cta-bar-inner, .service-page-hero-copy, .service-page-hero-media, .scope-card, .scope-header, .cost-banner, .lead-intro, .lead-form'
  );

  if (initGsapMotion(revealTargets)) return;

  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${Math.min(idx * 40, 200)}ms`;
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }
})();
