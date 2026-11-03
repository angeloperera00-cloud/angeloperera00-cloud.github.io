import { articles as manual, articleTopics } from '@/content/articles';
import synced from '@/content/articles.medium.json';
import { site } from '@/content/site';
import type { Article } from '@/content/types';

/** Layout placeholders, shown only while there are no real articles and `showPlaceholders` is on. */
const PLACEHOLDERS: Article[] = [
  { id: 'placeholder-1', title: 'Featured article title, up to two lines long', excerpt: 'Placeholder. Your article excerpt appears here: one or two sentences that make someone want to read the whole piece.', tags: ['iOS Development'], url: '', platform: 'medium', featured: true, placeholder: true },
  { id: 'placeholder-2', title: 'Article title goes here', excerpt: 'Placeholder excerpt. Replace with the opening idea of the article.', tags: ['Software Engineering'], url: '', platform: 'medium', placeholder: true },
  { id: 'placeholder-3', title: 'Article title goes here', excerpt: 'Placeholder excerpt. Replace with the opening idea of the article.', tags: ['Design'], url: '', platform: 'medium', placeholder: true },
  { id: 'placeholder-4', title: 'Article title goes here', excerpt: 'Placeholder excerpt. Replace with the opening idea of the article.', tags: ['Emerging Tech'], url: '', platform: 'medium', placeholder: true },
  { id: 'placeholder-5', title: 'Article title goes here', excerpt: 'Placeholder excerpt. Replace with the opening idea of the article.', tags: ['iOS Development'], url: '', platform: 'medium', placeholder: true },
  { id: 'placeholder-6', title: 'Article title goes here', excerpt: 'Placeholder excerpt. Replace with the opening idea of the article.', tags: ['Software Engineering'], url: '', platform: 'medium', placeholder: true },
];

interface SyncedFile { fetchedAt: string | null; source: string | null; items: Article[] }

const time = (a: Article) => (a.date ? Date.parse(a.date) : 0);

/** Strip empty values so they never overwrite synced data. */
const filled = (a: Article) =>
  Object.fromEntries(Object.entries(a).filter(([, v]) => v !== '' && v !== undefined && !(Array.isArray(v) && !v.length))) as Partial<Article>;

/**
 * Manual entries are merged over synced ones with the same URL, field by field:
 * whatever you set by hand wins, anything you left empty comes from Medium.
 * Sorted newest first.
 */
export function getArticles(): Article[] {
  const feed = (synced as SyncedFile).items ?? [];
  const byUrl = new Map(feed.map((a) => [normalizeUrl(a.url), a]));
  const merged = manual.map((m) => {
    const s = byUrl.get(normalizeUrl(m.url));
    return s ? ({ ...s, ...filled(m), id: m.id } as Article) : m;
  });
  const manualUrls = new Set(manual.map((a) => normalizeUrl(a.url)));
  const fromFeed = feed.filter((a) => !manualUrls.has(normalizeUrl(a.url)));
  const real = [...merged, ...fromFeed].sort((a, b) => time(b) - time(a));
  if (real.length) return real;
  return site.showPlaceholders ? PLACEHOLDERS : [];
}

/** The lead story: newest featured article, otherwise the newest article. */
export function getFeaturedArticle(list = getArticles()): Article | undefined {
  return list.find((a) => a.featured) ?? list[0];
}

/** Featured first, then the latest two. */
export function getArticlePreview(count = 3): Article[] {
  const list = getArticles();
  const lead = getFeaturedArticle(list);
  if (!lead) return [];
  return [lead, ...list.filter((a) => a.id !== lead.id)].slice(0, count);
}

export function getTopics(list = getArticles()): string[] {
  const present = new Set(list.flatMap((a) => a.tags));
  const ordered = articleTopics.filter((t) => present.has(t));
  const rest = [...present].filter((t) => !articleTopics.includes(t)).sort();
  return [...ordered, ...rest];
}

export function hasRealArticles(): boolean {
  return getArticles().some((a) => !a.placeholder);
}

function normalizeUrl(u: string): string {
  return u.split('?')[0].replace(/\/$/, '').toLowerCase();
}

export const PLATFORM_LABEL: Record<Article['platform'], string> = {
  medium: 'Medium',
  dev: 'DEV',
  hashnode: 'Hashnode',
  substack: 'Substack',
  other: 'Article',
};
