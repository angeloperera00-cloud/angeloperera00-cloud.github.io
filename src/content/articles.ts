import type { Article } from './types';

/* ==========================================================================
   Articles — manually managed metadata (the source of truth).
   --------------------------------------------------------------------------
   Add one object per article. Newest first is not required; the site sorts
   by `date`. Mark one (or more) with `featured: true` to lead the section.

   Example:
   {
     id: 'swiftui-scroll-transitions',
     title: 'Your article title',
     excerpt: 'One or two sentences that make someone want to read it.',
     cover: 'https://miro.medium.com/…' or '/images/articles/my-cover.webp',
     coverAlt: 'What the cover shows',
     date: '2026-05-14',
     readingMinutes: 7,
     tags: ['iOS Development', 'SwiftUI'],
     url: 'https://medium.com/@you/your-article-slug',
     platform: 'medium',
     featured: true,
   }

   Optional Medium sync: set your handle in content/medium.config.json and
   `npm run sync:medium` (also runs before every build) writes
   articles.medium.json. Entries here override synced ones with the same URL.
   ========================================================================== */

export const articles: Article[] = [
  {
    id: 'on-device-ai-never-lies-about-your-money',
    title: 'Building an On-Device AI That Never Lies About Your Money',
    // Date, reading time, excerpt and cover are filled from Medium by `npm run sync:medium`.
    // Anything you write here overrides the synced value.
    excerpt: 'How I used Apple’s Foundation Models framework to build a private finance assistant in SwiftUI.',
    tags: ['On-Device AI', 'SwiftUI', 'Foundation Models'],
    url: 'https://medium.com/@pererachathura309/building-an-on-device-ai-that-never-lies-about-your-money-a8dd40b7b52e',
    platform: 'medium',
    featured: true,
  },
];

/** Topic order used by the filters. Any other tags on your articles are appended. */
export const articleTopics = ['Software Engineering', 'iOS Development', 'Design', 'Emerging Tech'];
