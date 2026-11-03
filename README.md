# Angelo Perera — Portfolio (Next.js)

Next.js 16 · React 19 · TypeScript. Static export: `npm run build` produces `/out`, which any host can serve.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # syncs Medium (if enabled), type-checks, exports to /out
```

Deploy: push to GitHub and import on Vercel (zero config), or drag `/out` onto Netlify. Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://yourdomain.com`) so the sitemap and social previews use absolute URLs.

---

## Where things live

```
src/content/          ← everything you edit
  site.ts             contact, links, form endpoint, showPlaceholders flag
  projects.ts         all projects (featured, gallery, case studies)
  articles.ts         article metadata (manual, the source of truth)
  medium.config.json  optional Medium RSS sync settings
  articles.medium.json  written by the sync script (don't edit by hand)
  profile.ts          hero, about, experience, skills, education, certifications, YouTube copy
  types.ts            the content model

src/app/              routes: /, /projects, /projects/[slug], /articles
src/components/       home sections, projects, articles, motion, ui
src/styles/           site.css (v1 design, ported 1:1), projects.css, articles.css
public/images/projects/<slug>/   cover + screenshots per project
scripts/sync-medium.mjs
```

## Before launch

1. **Phone** — the design showed `035 8724` (hero) and `036 8724` (contact). Fix it in `site.ts`.
2. **Links** — fill `site.links` (CV, GitHub, LinkedIn, YouTube, Medium) and `site.certificates`. Empty links show "This link isn't available yet." instead of breaking.
3. **Placeholders** — set `showPlaceholders: false` in `site.ts`. Reserved project slots, empty screenshot slots and unwritten case-study sections then disappear instead of rendering as marked drafts. Nothing fictional is ever shown as real work.

## Adding a project

Add an object to `src/content/projects.ts` (or replace one of the `project-07…11` slots):

```ts
{
  slug: 'money-diary',                  // URL: /projects/money-diary/
  title: 'Money Diary',
  summary: 'One or two sentences for cards.',
  featured: false,                      // up to 4 featured projects lead the section
  order: 7,
  categories: ['ios'],                  // 'ios' | 'spatial' | 'ai' | 'web' — only when true
  platforms: ['iPhone'],
  chips: [{ icon: 'b-swift-bird', label: 'Swift' }],
  tech: [{ icon: 'b-swift-bird', label: 'Swift' }, { img: '/icons/firebase.svg', label: 'Firebase' }],
  icon: { src: '/images/projects/money-diary/icon.png' },   // or { monogram: 'MD', background: '#123' }
  accent: '#19A974',                    // subtle per-project glow
  cover: { src: '/images/projects/money-diary/cover.webp', alt: '…' },
  year: '2026',
  screenshots: [
    { device: 'iphone', src: '/images/projects/money-diary/screen-1.webp', alt: '…', caption: 'Monthly overview' },
    // iPad/iPhone landscape, with the image's pixel size so the screen never crops:
    { device: 'ipad', orientation: 'landscape', width: 2752, height: 2064, src: '…', alt: '…' },
  ],
  showcase: 1,                          // which screenshot floats on the featured banner
  caseStudy: {
    overview: '…',
    problem: { paragraphs: ['…'] },
    role: { bullets: ['…', '…'] },
    process: { paragraphs: ['…'] },
    challenges: { paragraphs: ['…'], bullets: ['…'] },
    solutions: { bullets: ['…'] },
    results: { paragraphs: ['…'] },
  },
  links: { appStore: 'https://apps.apple.com/…', github: 'https://github.com/…' },
}
```

**Image sizes** (export WebP, keep native resolution):

| Use | Size |
| --- | --- |
| `cover.webp` | ~1800 × 650 (≈ 2.8 : 1) |
| iPhone | 1290 × 2796 |
| iPad | 2064 × 2752 |
| Apple Watch | 410 × 502 |
| Apple TV / Vision Pro | 3840 × 2160 (16 : 9) |
| Mac / web (`laptop`, `browser`) | 2880 × 1800 (16 : 10) |

Devices available: `iphone`, `ipad`, `watch`, `tv`, `vision`, `laptop`, `browser`. Links only render when set, so a project without an App Store or GitHub link never shows a fake one. Icon names come from `src/components/icons/sprite.ts`.

## Adding an article

Add to `src/content/articles.ts`:

```ts
{
  id: 'swiftui-scroll-transitions',
  title: '…',
  excerpt: '…',
  cover: 'https://miro.medium.com/…',   // optional: without it a branded cover is generated
  date: '2026-05-14',
  readingMinutes: 7,
  tags: ['iOS Development'],
  url: 'https://medium.com/@you/…',      // always opens the original article
  platform: 'medium',                    // 'medium' | 'dev' | 'hashnode' | 'substack' | 'other'
  featured: true,
}
```

The home page shows the featured article plus the two newest; `/articles` adds search, topic filters (from tags) and "Load more" after 9. Filter state is kept in the URL (`/articles/?topic=Design&q=swiftui`).

## Medium sync (optional)

Set `"enabled": true` and your handle in `src/content/medium.config.json`, then `npm run sync:medium` (also runs before every build).

- Uses Medium's public RSS feed — no API key, no scraping. The feed only carries your ~10 latest posts, so the script **merges** into `articles.medium.json` and older posts stay cached.
- 10-second timeout. Any failure keeps the last good cache and never breaks the build.
- Manual entries in `articles.ts` override synced ones with the same URL (better excerpt, cover, `featured`).
- For a daily refresh, rebuild on a schedule (Vercel Cron → Deploy Hook, or a GitHub Action).

## Motion and interaction

- Content components are server-rendered; behaviour attaches through data attributes in `MotionProvider` (`data-reveal`, `data-count`, `.magnetic`, `data-tilt`, `data-parallax-img`).
- Project covers share a `view-transition-name`, so a card morphs into its case-study hero (View Transitions API; plain navigation where unsupported).
- Everything respects `prefers-reduced-motion`; tilt, magnetic and parallax only run on precise pointers.
