import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let reduce = false;
const EASE = 'power3.out';

/** Split a heading into word spans wrapped in a clipping mask for a line-reveal. */
function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? '';
  el.textContent = '';
  el.classList.add('is-split');
  const spans: HTMLElement[] = [];
  text.split(/(\s+)/).forEach((token) => {
    if (token.trim() === '') {
      el.appendChild(document.createTextNode(token));
      return;
    }
    const mask = document.createElement('span');
    mask.className = 'word-mask';
    const inner = document.createElement('span');
    inner.className = 'word-inner';
    inner.textContent = token;
    mask.appendChild(inner);
    el.appendChild(mask);
    spans.push(inner);
  });
  return spans;
}

function initReveals() {
  // Single-element reveals. Hero elements get an entrance timeline instead.
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    const delay = parseFloat(el.dataset.delay ?? '0');
    const isHero = el.closest('.hero') !== null;
    if (isHero) {
      // Hero reveals fire on page load as a staggered entrance.
      gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.1,
        delay: 0.15 + delay,
        ease: 'power4.out',
      });
    } else {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        clipPath: 'inset(0 0 0% 0)',
        duration: 1,
        delay,
        ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      });
    }
  });

  // Staggered children.
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
    const kids = gsap.utils.toArray<HTMLElement>(':scope > *', group);
    gsap.to(kids, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: EASE,
      stagger: 0.09,
      scrollTrigger: { trigger: group, start: 'top 84%', once: true },
    });
  });

  // Heading word reveals. Hero headings fire on load, others on scroll.
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const words = splitWords(el);
    gsap.set(words, { yPercent: 115 });
    const isHero = el.closest('.hero') !== null;
    const splitDelay = parseFloat(el.dataset.splitDelay ?? '0');
    const config: gsap.TweenVars = {
      yPercent: 0,
      duration: 1.05,
      ease: 'power4.out',
      stagger: 0.06,
    };
    if (isHero) {
      config.delay = 0.35 + splitDelay;
    } else if (splitDelay > 0) {
      config.delay = splitDelay;
      config.scrollTrigger = { trigger: el, start: 'top 88%', once: true };
    } else {
      config.scrollTrigger = { trigger: el, start: 'top 88%', once: true };
    }
    gsap.to(words, config);
  });
}

function initParallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '0.15');
    gsap.fromTo(
      el,
      { yPercent: -speed * 100 },
      {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

function initCounters() {
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.suffix ?? '';
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = Math.round(obj.v).toString() + suffix;
      },
    });
  });
}

function initMagnetic() {
  if (window.matchMedia('(hover: none)').matches) return;
  gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic || '0.35');
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      gsap.to(el, { x, y, duration: 0.5, ease: 'power3.out' });
    };
    const reset = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
  });
}

/** Custom cursor: a dot + a ring that lags and grows over interactive targets. */
function initCursor() {
  const root = document.querySelector<HTMLElement>('[data-cursor]');
  if (!root || window.matchMedia('(hover: none)').matches) return;
  const dot = root.querySelector<HTMLElement>('.cursor-dot');
  const ring = root.querySelector<HTMLElement>('.cursor-ring');
  if (!dot || !ring) return;
  root.style.opacity = '1';
  const dx = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });
  window.addEventListener('pointermove', (e) => {
    dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
  });
  document.querySelectorAll('a, button, [data-cursor-grow]').forEach((t) => {
    t.addEventListener('pointerenter', () => root.classList.add('is-grow'));
    t.addEventListener('pointerleave', () => root.classList.remove('is-grow'));
  });
}

/** Click-drag horizontal scrolling for filmstrip galleries. */
function initDragScroll() {
  document.querySelectorAll<HTMLElement>('[data-drag]').forEach((el) => {
    let down = false;
    let startX = 0;
    let startLeft = 0;
    let moved = 0;
    el.addEventListener('pointerdown', (e) => {
      down = true;
      moved = 0;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.classList.add('is-drag');
    });
    el.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      el.scrollLeft = startLeft - dx;
    });
    const end = () => {
      down = false;
      el.classList.remove('is-drag');
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointerleave', end);
    // Prevent a drag from triggering link clicks inside the strip.
    el.addEventListener('click', (e) => {
      if (moved > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  });
}

function initScrollProgress() {
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  if (!bar) return;
  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
  });
}

/** Mobile drawer: toggle open/close and lock body scroll. */
function initDrawer() {
  const btn = document.querySelector<HTMLElement>('[data-menu-btn]');
  const drawer = document.querySelector<HTMLElement>('[data-drawer]');
  if (!btn || !drawer) return;
  const toggle = () => {
    const open = drawer.getAttribute('aria-hidden') === 'false';
    drawer.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(!open));
    document.body.classList.toggle('no-scroll', !open);
  };
  btn.addEventListener('click', toggle);
  // Close on escape.
  drawer.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') toggle();
  });
  // Close on backdrop click.
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) toggle();
  });
  // Trap focus inside drawer when open.
  const focusable = drawer.querySelectorAll<HTMLElement>('a, button, [tabindex]');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  drawer.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  });
}

export function initMotion() {
  // Check motion preference at init time, not at module import.
  reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Interaction (not animation) works regardless of motion preference.
  initDragScroll();
  initDrawer();

  // Reduced motion / no-JS already render visible via CSS. Bail out of all motion.
  if (reduce) {
    document.querySelectorAll<HTMLElement>('[data-cursor]').forEach((c) => c.remove());
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // In-page anchor links route through Lenis for the smooth glide.
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -40 });
    });
  });

  initReveals();
  initParallax();
  initCounters();
  initMagnetic();
  initCursor();
  initScrollProgress();

  ScrollTrigger.refresh();
  // Recompute trigger positions once fonts + images finish loading.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
