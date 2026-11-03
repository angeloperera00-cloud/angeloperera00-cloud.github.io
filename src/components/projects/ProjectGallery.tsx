'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import Icon from '@/components/icons/Icon';
import ProjectCard from './ProjectCard';
import { CATEGORY_ORDER, categoryLabel } from '@/lib/projects';
import type { Lang } from '@/i18n';
import { lp } from '@/i18n';
import { t } from '@/i18n/ui';

import type { Project, ProjectCategory } from '@/content/types';

type Filter = 'all' | ProjectCategory;

interface Props {
  projects: Project[];
  numbers: Record<string, string>;
  /** Show at most this many cards, with a link to the full page. */
  limit?: number;
  viewAllHref?: string;
  totalCount?: number;
  withSearch?: boolean;
  /** Keep the active filter in the URL (?category=…&q=…). */
  syncUrl?: boolean;
  heading?: string;
  lang: Lang;
}

export default function ProjectGallery({ projects, numbers, limit, viewAllHref, totalCount, withSearch, syncUrl, heading, lang }: Props) {
  const s = t(lang).projects;
  const [filter, setFilter] = useState<Filter>('all');
  const [q, setQ] = useState('');

  useEffect(() => {
    if (!syncUrl) return;
    const sp = new URLSearchParams(location.search);
    const c = sp.get('category') as Filter | null;
    if (c && (c === 'all' || (CATEGORY_ORDER as string[]).includes(c))) setFilter(c);
    setQ(sp.get('q') ?? '');
  }, [syncUrl]);

  useEffect(() => {
    if (!syncUrl) return;
    const sp = new URLSearchParams();
    if (filter !== 'all') sp.set('category', filter);
    if (q.trim()) sp.set('q', q.trim());
    const qs = sp.toString();
    history.replaceState(history.state, '', qs ? `?${qs}` : location.pathname);
  }, [filter, q, syncUrl]);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: projects.filter((p) => !p.placeholder).length, ios: 0, spatial: 0, ai: 0, web: 0 };
    projects.forEach((p) => p.categories.forEach((cat) => { c[cat] += 1; }));
    return c;
  }, [projects]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return projects.filter((p) => {
      if (filter !== 'all' && !p.categories.includes(filter)) return false;
      if (needle) {
        if (p.placeholder) return false;
        const hay = [p.title, p.summary, ...p.platforms, ...p.tech.map((t) => t.label), ...p.categories.map((c) => categoryLabel(lang, c))].join(' ').toLowerCase();
        return hay.includes(needle);
      }
      return true;
    });
  }, [projects, filter, q]);

  const shown = limit ? results.slice(0, limit) : results;
  const animKey = `${filter}|${q}`;

  useEffect(() => { dispatchEvent(new Event('motion:refresh')); }, [animKey]);

  return (
    <div className="gallery">
      <div className="gallery__bar" data-reveal>
        <h3 className="gallery__title">
          {heading ?? s.all} <span>{totalCount ?? counts.all}</span>
        </h3>
        <div className="filters" role="group" aria-label={s.filterLabel}>
          {(['all', ...CATEGORY_ORDER] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              className="filter"
              aria-pressed={filter === f}
              disabled={f !== 'all' && counts[f] === 0}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? s.all : categoryLabel(lang, f)}
              <span className="filter__count">{counts[f]}</span>
            </button>
          ))}
        </div>
        {withSearch && (
          <label className="search">
            <Icon name="i-search" />
            <span className="sr-only">{s.search}</span>
            <input type="search" placeholder={s.search} value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
        )}
      </div>

      {shown.length > 0 ? (
        <div className="pgrid gallery__grid" key={animKey}>
          {shown.map((p, i) => (
            <ProjectCard key={p.slug} lang={lang} project={p} number={numbers[p.slug]} style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      ) : (
        <div className="empty" role="status">
          <Icon name="i-layout-grid" />
          <p>{s.none} {q ? <>“{q}”</> : s.noneCat}.</p>
          <button type="button" className="btn btn--outline btn--sm" onClick={() => { setFilter('all'); setQ(''); }}>{s.showAll}</button>
        </div>
      )}

      {limit && viewAllHref && (
        <div className="gallery__more">
          <Link className="btn btn--outline magnetic" href={viewAllHref}>
            {s.viewAll} <Icon name="i-arrow-right" />
          </Link>
        </div>
      )}
    </div>
  );
}
