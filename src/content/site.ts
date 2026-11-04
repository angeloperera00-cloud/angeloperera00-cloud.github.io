/* ==========================================================================
   Site settings — contact details, external links and feature flags.
   Empty strings mean "not set yet": buttons stay visible and show a short
   "not available yet" notice instead of a dead link.
   ========================================================================== */

export const site = {
  name: 'Angelo Perera',
  title: 'angeloperera - software engineer',
  description:
    'Software engineer in Naples, Italy. iOS, AR and spatial computing, AI and games: 10 projects with the stories behind them.',
  /** Set NEXT_PUBLIC_SITE_URL in your host (e.g. https://yourdomain.com) for absolute social/sitemap URLs. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://angeloperera.pages.dev',

  email: 'angeloperera00@gmail.com',
  // ⚠ The design showed "+39 351 035 8724" (hero) and "+39 351 036 8724" (contact). Keep the correct one.
  phone: '+39 351 035 8724',
  location: 'Naples, Italy',

  /** CV files in /public/cv. */
  cv: {
    en: '/cv/Angelo-Perera-CV-EN.pdf',
    it: '/cv/Angelo-Perera-CV-IT.pdf',
  },

  links: {
    github: 'https://github.com/angeloperera00-cloud',
    linkedin: 'https://www.linkedin.com/in/angelo-perera-283148413',
    youtube: '',
    medium: 'https://medium.com/@pererachathura309',
  },

  /** Formspree / Getform / Basin URL. Empty = Send opens the visitor's email app. */
  formEndpoint: '',

  /**
   * While you gather screenshots, case studies and articles, placeholder slots
   * render as clearly-marked drafts. Set to false before launch: empty slots and
   * unwritten case-study sections then disappear instead of showing as drafts.
   */
  showPlaceholders: false,

  /** "View certificate" links. */
  certificates: {
    'apple-academy': '',
    'udemy-se': '',
    cs50: '',
    'fcc-js': '',
    'udemy-ios': '',
    'webdev-bootcamp': '',
  } as Record<string, string>,
} as const;

export type LinkKey = keyof typeof site.links;

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
] as const;
