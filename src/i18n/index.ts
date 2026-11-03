/* ==========================================================================
   Languages. English lives at /, Italian at /it/. Every page exists in both.
   ========================================================================== */

export type Lang = 'en' | 'it';
export const LANGS: Lang[] = ['en', 'it'];
export const LANG_LABEL: Record<Lang, string> = { en: 'English', it: 'Italiano' };

/** Language from a pathname: anything under /it is Italian. */
export const langFromPath = (pathname: string): Lang => (/^\/it(\/|$)/.test(pathname) ? 'it' : 'en');

/** Strip the language prefix: /it/projects/x/ → /projects/x/ */
export const stripLang = (pathname: string) => pathname.replace(/^\/it(?=\/|$)/, '') || '/';

/** Build a path in a language: lp('it', '/projects/') → /it/projects/ */
export function lp(lang: Lang, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'en') return p;
  if (p === '/' ) return '/it/';
  if (p.startsWith('/#')) return `/it/${p.slice(1)}`;
  return `/it${p}`;
}

/** Same page in the other language. */
export const switchLangPath = (pathname: string, to: Lang) => lp(to, stripLang(pathname));
