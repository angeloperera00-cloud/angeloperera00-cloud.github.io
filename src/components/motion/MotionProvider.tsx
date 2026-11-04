'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* ==========================================================================
   Site-wide motion, attached by data attributes so content components can
   stay server-rendered:
     [data-reveal]        reveal on scroll ("lines" | "card" | "photo" | "sign")
     [data-count]         count up when revealed
     .magnetic            pointer-attracted buttons
     .pcard, [data-tilt]  3D tilt + cursor light
     .ccard, [data-glow]  cursor light only
     .timeline            red rail fills with scroll progress
     [data-parallax-img]  image drifts inside its frame
     .topo                background canvases drift slower than content
   Everything checks prefers-reduced-motion and fine pointers.
   ========================================================================== */

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

function animateCount(el: HTMLElement) {
  const end = parseFloat(el.dataset.count ?? '');
  if (!Number.isFinite(end)) return;
  const dur = 1500 + Math.min(end, 100) * 4;
  const t0 = performance.now();
  el.textContent = '0';
  const step = (now: number) => {
    const t = clamp((now - t0) / dur, 0, 1);
    el.textContent = String(Math.round(end * easeOutExpo(t)));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement, type: K, fn: (e: HTMLElementEventMap[K]) => void) => {
      el.addEventListener(type, fn as EventListener);
      cleanups.push(() => el.removeEventListener(type, fn as EventListener));
    };

    /* ---- Reveals (only for content below the fold at load) ---- */
    if (!reduced && 'IntersectionObserver' in window) {
      const vh = innerHeight;
      const timers: ReturnType<typeof setTimeout>[] = [];
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const el = en.target as HTMLElement;
            io.unobserve(el);
            el.classList.add('in');
            const counters = Array.from(el.querySelectorAll<HTMLElement>('[data-count]'));
            if (el.matches('[data-count]')) counters.push(el);
            counters.forEach(animateCount);
            const delay = parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0;
            timers.push(setTimeout(() => el.classList.remove('rv', 'in'), 2000 + delay * 1000));
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
      );
      document.querySelectorAll<HTMLElement>('main [data-reveal]').forEach((el) => {
        if (el.dataset.revealed) return;
        el.dataset.revealed = '1';
        if (el.getBoundingClientRect().top < vh * 0.92) return;
        el.classList.add('rv');
        io.observe(el);
      });
      cleanups.push(() => { io.disconnect(); timers.forEach(clearTimeout); });
    }

    /* ---- Pointer effects (re-run on "motion:refresh" for client-rendered lists) ---- */
    const bindPointer = () => {
      if (!fine || reduced) return;
      const fresh = (el: HTMLElement) => {
        if (el.dataset.motionBound) return false;
        el.dataset.motionBound = '1';
        cleanups.push(() => { delete el.dataset.motionBound; });
        return true;
      };
      document.querySelectorAll<HTMLElement>('.magnetic').forEach((b) => {
        if (!fresh(b)) return;
        on(b, 'pointermove', (e) => {
          const r = b.getBoundingClientRect();
          b.style.setProperty('--tx', clamp((e.clientX - (r.left + r.width / 2)) * 0.12, -7, 7).toFixed(1) + 'px');
          b.style.setProperty('--ty', clamp((e.clientY - (r.top + r.height / 2)) * 0.25, -5, 5).toFixed(1) + 'px');
        });
        on(b, 'pointerleave', () => { b.style.setProperty('--tx', '0px'); b.style.setProperty('--ty', '0px'); });
      });

      document.querySelectorAll<HTMLElement>('.pcard, [data-tilt]').forEach((card) => {
        if (!fresh(card)) return;
        const img = card.querySelector<HTMLElement>('[data-tilt-img], .pcard__media img');
        const max = parseFloat(card.dataset.tilt || '') || 5;
        let rect: DOMRect | null = null;
        on(card, 'pointerenter', () => { rect = card.getBoundingClientRect(); card.classList.add('is-tilting'); });
        on(card, 'pointermove', (e) => {
          if (!rect) rect = card.getBoundingClientRect();
          const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
          const y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
          card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
          card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
          card.style.setProperty('--ry', ((x - 0.5) * max).toFixed(2) + 'deg');
          card.style.setProperty('--rx', ((0.5 - y) * max * 0.8).toFixed(2) + 'deg');
          img?.style.setProperty('--px', ((0.5 - x) * 10).toFixed(1) + 'px');
          img?.style.setProperty('--py', ((0.5 - y) * 6).toFixed(1) + 'px');
        });
        on(card, 'pointerleave', () => {
          rect = null;
          card.classList.remove('is-tilting');
          card.style.setProperty('--rx', '0deg');
          card.style.setProperty('--ry', '0deg');
          img?.style.setProperty('--px', '0px');
          img?.style.setProperty('--py', '0px');
        });
      });

      document.querySelectorAll<HTMLElement>('.ccard, [data-glow]').forEach((card) => {
        if (!fresh(card)) return;
        on(card, 'pointermove', (e) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', e.clientX - r.left + 'px');
          card.style.setProperty('--my', e.clientY - r.top + 'px');
        });
      });
    };
    bindPointer();
    const onRefresh = () => bindPointer();
    addEventListener('motion:refresh', onRefresh);
    cleanups.push(() => removeEventListener('motion:refresh', onRefresh));

    /* ---- Scroll-linked effects ---- */
    const timeline = document.querySelector<HTMLElement>('.timeline');
    const railFill = document.querySelector<HTMLElement>('.timeline__fill');
    const parallaxImgs = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax-img]'));
    const topos = Array.from(document.querySelectorAll<HTMLElement>('.topo'));
    let raf = 0;
    const frame = () => {
      raf = 0;
      const vh = innerHeight;
      if (timeline && railFill) {
        const r = timeline.getBoundingClientRect();
        const p = reduced ? 1 : clamp((vh * 0.62 - r.top) / (r.height * 0.82), 0, 1);
        railFill.style.setProperty('--p', p.toFixed(4));
        railFill.parentElement?.style.setProperty('--p', p.toFixed(4));
      }
      if (reduced) return;
      parallaxImgs.forEach((img) => {
        const r = (img.parentElement ?? img).getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) {
          const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
          img.style.setProperty('--py', (-(1 - p) * 10).toFixed(2) + '%');
        }
      });
      topos.forEach((c) => {
        const r = (c.parentElement ?? c).getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) {
          const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
          c.style.transform = `translate3d(0, ${((p - 0.5) * 60).toFixed(1)}px, 0)`;
        }
      });
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', kick);
    kick();
    cleanups.push(() => {
      removeEventListener('scroll', kick);
      removeEventListener('resize', kick);
      cancelAnimationFrame(raf);
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
