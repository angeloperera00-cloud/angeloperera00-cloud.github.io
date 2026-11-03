'use client';

import { useEffect } from 'react';

/**
 * Plays the hero intro (gated by the `intro` class set before paint in the
 * root layout) and drives pointer/scroll depth on the hero layers.
 */
export default function HeroMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector<HTMLElement>('.hero');
    if (!hero) return;

    /* Intro */
    const play = () => {
      if (!root.classList.contains('intro')) return;
      root.classList.add('intro-run');
      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('intro')));
      setTimeout(() => root.classList.remove('intro-run'), 3600);
    };
    const portraitImg = hero.querySelector<HTMLImageElement>('.hero__portrait img');
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    const img = portraitImg?.decode ? portraitImg.decode().catch(() => undefined) : Promise.resolve();
    Promise.race([Promise.all([fonts, img]), new Promise((r) => setTimeout(r, 1100))]).then(play);

    /* Depth */
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const layers = {
      portrait: hero.querySelector<HTMLElement>('.hero__portrait'),
      name: hero.querySelector<HTMLElement>('.hero__name'),
      badge: hero.querySelector<HTMLElement>('.hero__badge'),
    };
    const p = { x: 0, y: 0, tx: 0, ty: 0 };
    let visible = true;
    let raf = 0;
    const frame = () => {
      raf = 0;
      if (!visible) return;
      p.x += (p.tx - p.x) * 0.075;
      p.y += (p.ty - p.y) * 0.075;
      const sy = Math.min(scrollY, innerHeight * 1.2);
      if (layers.portrait) layers.portrait.style.transform = `translate3d(${(p.x * -9).toFixed(2)}px, ${(p.y * -5 + sy * 0.06).toFixed(2)}px, 0)`;
      if (layers.name) layers.name.style.transform = `translate3d(${(p.x * 16).toFixed(2)}px, ${(p.y * 9 - sy * 0.14).toFixed(2)}px, 0)`;
      if (layers.badge) layers.badge.style.transform = `translate3d(${(p.x * -6).toFixed(2)}px, ${(p.y * -6 - sy * 0.05).toFixed(2)}px, 0)`;
      if (Math.abs(p.tx - p.x) > 0.002 || Math.abs(p.ty - p.y) > 0.002) kick();
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      p.tx = Math.max(-1, Math.min(1, (e.clientX / innerWidth - 0.5) * 2));
      p.ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      kick();
    };
    const onLeave = () => { p.tx = 0; p.ty = 0; kick(); };
    if (fine) {
      hero.addEventListener('pointermove', onMove);
      hero.addEventListener('pointerleave', onLeave);
    }
    addEventListener('scroll', kick, { passive: true });
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      hero.classList.toggle('is-offscreen', !en.isIntersecting);
      if (visible) kick();
    });
    io.observe(hero);
    kick();
    return () => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      removeEventListener('scroll', kick);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
