#!/usr/bin/env node
/* ==========================================================================
   Medium sync (optional)
   --------------------------------------------------------------------------
   Reads your public Medium RSS feed — the supported, unauthenticated export
   Medium provides (https://medium.com/feed/@handle, latest ~10 posts) — and
   writes src/content/articles.medium.json. Manual entries in articles.ts
   always win over synced ones with the same URL, so you can add a better
   excerpt, cover or `featured: true` by hand.

   Safety:
   - Disabled unless src/content/medium.config.json has "enabled": true.
   - 10 s timeout; on any network/parse failure the previous file is kept
     (last good cache) and the build continues.
   - Items are merged with the cache, so older posts that drop out of the
     feed's 10-item window are kept.

   Run: npm run sync:medium   (also runs automatically before `npm run build`)
   ========================================================================== */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG = path.join(root, 'src/content/medium.config.json');
const OUT = path.join(root, 'src/content/articles.medium.json');

const log = (msg) => console.log(`[medium] ${msg}`);

async function readJson(file, fallback) {
  try { return JSON.parse(await readFile(file, 'utf8')); } catch { return fallback; }
}

const decode = (s = '') =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&nbsp;/g, ' ');

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? decode(m[1]).trim() : '';
};
const tags = (xml, name) => [...xml.matchAll(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'gi'))].map((m) => decode(m[1]).trim());

const stripHtml = (html) => html.replace(/<figure[\s\S]*?<\/figure>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const titleCase = (t) => t.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

function toArticle(item) {
  const link = tag(item, 'link').split('?')[0];
  const html = tag(item, 'content:encoded') || tag(item, 'description');
  const text = stripHtml(html);
  const words = text ? text.split(' ').length : 0;
  const firstP = (html.match(/<p[^>]*>([\s\S]*?)<\/p>/i) || [])[1];
  let excerpt = stripHtml(firstP || text).slice(0, 220);
  if (excerpt.length === 220) excerpt = excerpt.replace(/\s+\S*$/, '') + '…';
  const cover = (html.match(/<img[^>]+src="([^"]+)"/i) || [])[1];
  const pub = new Date(tag(item, 'pubDate'));
  const slug = link.split('/').pop() || link;
  return {
    id: `medium-${slug}`,
    title: tag(item, 'title'),
    excerpt,
    ...(cover ? { cover, coverAlt: '' } : {}),
    ...(Number.isNaN(pub.getTime()) ? {} : { date: pub.toISOString().slice(0, 10) }),
    ...(words ? { readingMinutes: Math.max(1, Math.round(words / 230)) } : {}),
    tags: tags(item, 'category').slice(0, 4).map(titleCase),
    url: link,
    platform: 'medium',
  };
}

async function main() {
  const config = await readJson(CONFIG, {});
  const handle = String(config.username || '').replace(/^@/, '').trim();
  if (!config.enabled || !handle) {
    log('skipped (set "enabled": true and "username" in src/content/medium.config.json to turn on)');
    return;
  }

  const cache = await readJson(OUT, { fetchedAt: null, source: null, items: [] });
  const url = `https://medium.com/feed/@${handle}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10_000);

  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': 'portfolio-sync/1.0', Accept: 'application/rss+xml, application/xml' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((m) => toArticle(m[1])).filter((a) => a.title && a.url);
    if (!items.length) throw new Error('feed returned no articles');

    const byUrl = new Map((cache.items || []).map((a) => [a.url, a]));
    items.forEach((a) => byUrl.set(a.url, { ...byUrl.get(a.url), ...a }));
    const merged = [...byUrl.values()]
      .sort((a, b) => (Date.parse(b.date || 0) || 0) - (Date.parse(a.date || 0) || 0))
      .slice(0, Number(config.maxItems) || 30);

    await writeFile(OUT, JSON.stringify({ fetchedAt: new Date().toISOString(), source: url, items: merged }, null, 2) + '\n');
    log(`synced ${items.length} from feed, ${merged.length} cached in total`);
  } catch (err) {
    log(`kept previous cache (${(cache.items || []).length} articles): ${err.message}`);
  } finally {
    clearTimeout(timer);
  }
}

main();
