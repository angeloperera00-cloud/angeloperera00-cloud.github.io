'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import Icon from '@/components/icons/Icon';
import FeaturedArticle from './FeaturedArticle';
import ArticleCard from './ArticleCard';
import type { Article } from '@/content/types';
import type { Lang } from '@/i18n';
import { t } from '@/i18n/ui';


const PAGE = 9;

interface Props {
  articles: Article[];
  topics: string[];
  featuredId?: string;
  lang: Lang;
}

/** /articles: search, topic filters, featured lead and "Load more". State lives in the URL. */
export default function ArticlesExplorer({ articles, topics, featuredId, lang }: Props) {
  const s = t(lang).writing;
  const [q, setQ] = useState('');
  const [topic, setTopic] = useState<string>('all');
  const [visible, setVisible] = useState(PAGE);

  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    setQ(sp.get('q') ?? '');
    const t = sp.get('topic');
    if (t && topics.includes(t)) setTopic(t);
  }, [topics]);

  useEffect(() => {
    const sp = new URLSearchParams();
    if (q.trim()) sp.set('q', q.trim());
    if (topic !== 'all') sp.set('topic', topic);
    const qs = sp.toString();
    history.replaceState(history.state, '', qs ? `?${qs}` : location.pathname);
    setVisible(PAGE);
  }, [q, topic]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    articles.forEach((a) => a.tags.forEach((t) => { c[t] = (c[t] ?? 0) + 1; }));
    return c;
  }, [articles]);

  const filtering = q.trim() !== '' || topic !== 'all';
  const lead = !filtering ? articles.find((a) => a.id === featuredId) : undefined;

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return articles.filter((a) => {
      if (lead && a.id === lead.id) return false;
      if (topic !== 'all' && !a.tags.includes(topic)) return false;
      if (needle) return [a.title, a.excerpt, ...a.tags].join(' ').toLowerCase().includes(needle);
      return true;
    });
  }, [articles, q, topic, lead]);

  const shown = results.slice(0, visible);
  const total = articles.length;

  return (
    <div className="explorer">
      <div className="explorer__bar">
        <label className="search search--lg">
          <Icon name="i-search" />
          <span className="sr-only">{s.search}</span>
          <input type="search" placeholder={s.search} value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <div className="filters" role="group" aria-label={s.filterLabel}>
          <button type="button" className="filter" aria-pressed={topic === 'all'} onClick={() => setTopic('all')}>
            {s.allTopics} <span className="filter__count">{total}</span>
          </button>
          {topics.map((t) => (
            <button key={t} type="button" className="filter" aria-pressed={topic === t} onClick={() => setTopic(t)}>
              {t} <span className="filter__count">{counts[t] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

      {lead && <div className="explorer__lead"><FeaturedArticle article={lead} lang={lang} /></div>}

      {filtering && (
        <p className="explorer__summary" role="status">
          {results.length} {results.length === 1 ? s.article : s.articles}
          {topic !== 'all' && <> {s.in} <strong>{topic}</strong></>}
          {q.trim() && <> {s.matching} <strong>“{q.trim()}”</strong></>}
        </p>
      )}

      {shown.length > 0 ? (
        <div className="agrid" key={`${topic}|${q}`}>
          {shown.map((a, i) => (
            <ArticleCard key={a.id} lang={lang} article={a} style={{ '--i': i % PAGE } as CSSProperties} />
          ))}
        </div>
      ) : (
        <div className="empty" role="status">
          <Icon name="i-newspaper" />
          <p>{s.none} {q.trim() ? <>“{q.trim()}”</> : s.noneTopic}.</p>
          <button type="button" className="btn btn--outline btn--sm" onClick={() => { setQ(''); setTopic('all'); }}>{s.clear}</button>
        </div>
      )}

      {results.length > visible && (
        <div className="gallery__more">
          <button type="button" className="btn btn--outline" onClick={() => setVisible((v) => v + PAGE)}>
            {s.loadMore} <span className="filter__count">{results.length - visible}</span>
          </button>
        </div>
      )}
    </div>
  );
}
