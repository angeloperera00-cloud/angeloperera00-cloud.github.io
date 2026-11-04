'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Icon from '@/components/icons/Icon';
import type { ProjectCategory } from '@/content/types';
import type { Lang } from '@/i18n';
import { t } from '@/i18n/ui';

export interface Discipline { id: ProjectCategory; title: string; text: string; count: number }
type Filter = 'all' | ProjectCategory;

/** Picks a filter for the Projects gallery (it listens for "projects:filter") and scrolls there. */
function choose(f: Filter) {
  dispatchEvent(new CustomEvent('projects:filter', { detail: f }));
  // Wait for the gallery to re-render, then glide to it (to the section top when resetting).
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const target = f === 'all' ? document.getElementById('projects') : document.querySelector<HTMLElement>('#projects .gallery');
    if (!target) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nav = document.querySelector<HTMLElement>('.nav')?.offsetHeight ?? 0;
    const gap = f === 'all' ? -1 : 28;
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - nav - gap, behavior: reduce ? 'auto' : 'smooth' });
  }));
}

export default function DisciplineCards({ items, lang }: { items: Discipline[]; lang: Lang }) {
  const s = t(lang).whatido;
  const [active, setActive] = useState<Filter>('all');

  useEffect(() => {
    const on = (e: Event) => setActive((e as CustomEvent<Filter>).detail);
    addEventListener('projects:filtered', on);
    return () => removeEventListener('projects:filtered', on);
  }, []);

  return (
    <div className="dcards" role="group" aria-label={s.groupLabel}>
      <div className="dcards__row">
        {items.map((d, i) => {
          const empty = d.count === 0;
          return (
            <button
              key={d.id}
              type="button"
              className="dcard"
              data-reveal="card"
              style={{ ['--d' as string]: `${i * 0.07}s` } as CSSProperties}
              aria-pressed={active === d.id}
              disabled={empty}
              onClick={() => choose(d.id)}
            >
              <span className="dcard__arrow" aria-hidden="true"><Icon name="i-arrow-up-right" /></span>
              <span className="dcard__title">{d.title}</span>
              <span className="dcard__text">{d.text}</span>
              <span className="dcard__count">{empty ? s.soon : `${d.count} ${d.count === 1 ? s.project : s.projects}`}</span>
            </button>
          );
        })}
      </div>
      <div className="dcards__foot" data-reveal>
        <button type="button" className="dcards__all" aria-pressed={active === 'all'} onClick={() => choose('all')}>
          {s.all} <Icon name="i-arrow-right" />
        </button>
      </div>
    </div>
  );
}
