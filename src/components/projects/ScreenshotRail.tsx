'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/icons/Icon';
import Device from './Device';
import type { AppIconSpec, Screenshot } from '@/content/types';
import type { Lang } from '@/i18n';
import { t } from '@/i18n/ui';

interface Props {
  screenshots: Screenshot[];
  accent: string;
  icon: AppIconSpec;
  title: string;
  lang: Lang;
}

/** Horizontal, snap-scrolling gallery of device mockups with a full-screen viewer. */
export default function ScreenshotRail({ screenshots, accent, icon, title, lang }: Props) {
  const s = t(lang).cs;
  const track = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false, overflow: false });
  const [index, setIndex] = useState<number | null>(null);
  const touch = useRef<number | null>(null);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8, overflow: el.scrollWidth > el.clientWidth + 8 });
  }, []);

  useEffect(() => {
    measure();
    const el = track.current;
    el?.addEventListener('scroll', measure, { passive: true });
    addEventListener('resize', measure);
    return () => { el?.removeEventListener('scroll', measure); removeEventListener('resize', measure); };
  }, [measure]);

  const scrollBy = (dir: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const open = (i: number) => { setIndex(i); dialog.current?.showModal(); };
  const close = () => dialog.current?.close();
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + screenshots.length) % screenshots.length)), [screenshots.length]);

  useEffect(() => {
    const dlg = dialog.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    const onClose = () => setIndex(null);
    dlg.addEventListener('keydown', onKey);
    dlg.addEventListener('close', onClose);
    return () => { dlg.removeEventListener('keydown', onKey); dlg.removeEventListener('close', onClose); };
  }, [step]);

  if (!screenshots.length) return null;
  const current = index !== null ? screenshots[index] : null;

  return (
    <div className="srail">
      <ul className="srail__track" ref={track} aria-label={`${title} ${s.screenshots}`}>
        {screenshots.map((shot, i) => (
          <li key={i} className={`srail__item srail__item--${shot.device}${shot.orientation === 'landscape' || (shot.device === 'poster' && (shot.width ?? 0) > (shot.height ?? 0)) ? '-landscape' : ''}`}>
            <button type="button" className="srail__open" onClick={() => open(i)} aria-label={`${s.enlarge} ${i + 1} ${s.of} ${screenshots.length}`}>
              <Device island={shot.island} kind={shot.device} orientation={shot.orientation} width={shot.width} height={shot.height} src={shot.src} alt={shot.alt} accent={accent} icon={icon} title={shot.src ? undefined : `Screenshot ${i + 1}`} lang={lang} />
            </button>
            {shot.caption && <p className="srail__caption">{shot.caption}</p>}
          </li>
        ))}
      </ul>
      {edges.overflow && (
        <div className="srail__controls">
          <button type="button" className="round-btn" onClick={() => scrollBy(-1)} disabled={edges.start} aria-label={s.prev}><Icon name="i-chevron-left" /></button>
          <button type="button" className="round-btn" onClick={() => scrollBy(1)} disabled={edges.end} aria-label={s.next}><Icon name="i-chevron-right" /></button>
        </div>
      )}

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={`${title} ${s.viewer}`}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        {current && (
          <div className="lightbox__stage" key={index}>
            <Device island={current.island} kind={current.device} orientation={current.orientation} width={current.width} height={current.height} src={current.src} alt={current.alt} accent={accent} icon={icon} title={current.src ? undefined : `Screenshot ${(index ?? 0) + 1}`} lang={lang} className="lightbox__device" priority />
            <p className="lightbox__meta">
              <span>{(index ?? 0) + 1} / {screenshots.length}</span>
              {current.caption && <span>{current.caption}</span>}
            </p>
          </div>
        )}
        <button type="button" className="round-btn lightbox__close" onClick={close} aria-label={s.close}><Icon name="i-x" /></button>
        {screenshots.length > 1 && (
          <>
            <button type="button" className="round-btn lightbox__prev" onClick={() => step(-1)} aria-label={s.prevOne}><Icon name="i-chevron-left" /></button>
            <button type="button" className="round-btn lightbox__next" onClick={() => step(1)} aria-label={s.nextOne}><Icon name="i-chevron-right" /></button>
          </>
        )}
      </dialog>
    </div>
  );
}
