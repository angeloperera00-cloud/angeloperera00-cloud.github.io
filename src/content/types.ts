import type { IconName } from '@/components/icons/sprite';

/* ==========================================================================
   Content model. Everything the site renders comes from typed data in
   /src/content. Add a project or article by adding an object — no layout work.
   ========================================================================== */

/** Small visual mark used for chips, tiles and tech lists. */
export type Glyph =
  | { icon: IconName; label: string; line?: boolean }
  | { text: string; label: string }
  | { img: string; label: string };

/* ------------------------------------------------------------------ Projects */

export type ProjectCategory = 'ios' | 'spatial' | 'ai' | 'web';

/** 'poster' = an App Store marketing image that already includes its own device frame. */
export type DeviceKind = 'iphone' | 'ipad' | 'watch' | 'tv' | 'vision' | 'laptop' | 'browser' | 'poster';

export interface Screenshot {
  /** Path under /public, e.g. '/images/projects/mtlab/screen-1.webp'. Omit for a placeholder slot. */
  src?: string;
  alt: string;
  device: DeviceKind;
  /** iPhone / iPad only. Defaults to portrait. */
  orientation?: 'portrait' | 'landscape';
  /** Pixel size of the image; the screen takes its exact aspect ratio (no cropping). */
  width?: number;
  height?: number;
  /** Set false when the screenshot already shows the Dynamic Island. */
  island?: boolean;
  caption?: string;
}

/** A case-study block: paragraphs, bullets, or both. */
export interface RichBlock {
  paragraphs?: string[];
  bullets?: string[];
}

export interface CaseStudy {
  /** Longer overview shown under the hero. Falls back to `summary`. */
  overview?: string;
  problem?: RichBlock;
  role?: RichBlock;
  process?: RichBlock;
  challenges?: RichBlock;
  solutions?: RichBlock;
  results?: RichBlock;
}

export interface ProjectLinks {
  appStore?: string;
  github?: string;
  website?: string;
  testFlight?: string;
  /** Demo video, e.g. a YouTube link. */
  video?: string;
}

/** App icon: a built-in vector variant, or an image you provide. */
export type AppIconSpec =
  | { variant: 'mtlab' | 'tennisland' | 'propel' | 'eyecheck' | 'stikar' | 'wanderly' }
  | { src: string; alt?: string }
  | { monogram: string; background: string; color?: string };

export interface Project {
  slug: string;
  title: string;
  /** One or two sentences used on cards. */
  summary: string;
  /** Marks a reserved slot with no real content yet. Never shown when `site.showPlaceholders` is false. */
  placeholder?: boolean;
  featured?: boolean;
  /** Lower numbers come first. */
  order: number;
  /** Only assign when you've supplied real information for the project. */
  categories: ProjectCategory[];
  /** Platform labels shown in the case study, e.g. 'iPhone', 'Apple Watch'. */
  platforms: string[];
  /** Chips on the card (icons) — keep to the most important 2–6. */
  chips: Glyph[];
  /** Full technology list for the case study. */
  tech: Glyph[];
  icon: AppIconSpec;
  /** Per-project identity color, used for subtle glows only. */
  accent: string;
  cover?: { src: string; alt: string };
  year?: string;
  screenshots: Screenshot[];
  /** Index of the screenshot floated on the featured banner (defaults to the first with an image). */
  showcase?: number;
  caseStudy: CaseStudy;
  links: ProjectLinks;
}

/* ------------------------------------------------------------------ Articles */

export type ArticlePlatform = 'medium' | 'dev' | 'hashnode' | 'substack' | 'other';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  /** Absolute URL or path under /public. Omit to use the generated editorial cover. */
  cover?: string;
  coverAlt?: string;
  /** ISO date, e.g. '2026-05-14'. */
  date?: string;
  readingMinutes?: number;
  tags: string[];
  url: string;
  platform: ArticlePlatform;
  featured?: boolean;
  /** Marks a layout placeholder. Never shown when `site.showPlaceholders` is false. */
  placeholder?: boolean;
}
