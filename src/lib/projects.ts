import { projects as allProjects } from '@/content/projects';
import { projectsIt, placeholderIt } from '@/content/projects.it';
import { site } from '@/content/site';
import type { Project, ProjectCategory, CaseStudy } from '@/content/types';
import type { Lang } from '@/i18n';
import { t } from '@/i18n/ui';

export const CATEGORY_ORDER: ProjectCategory[] = ['ios', 'spatial', 'ai', 'web'];
export const categoryLabel = (lang: Lang, c: ProjectCategory) => t(lang).categories[c];
export const categoryShort = (lang: Lang, c: ProjectCategory) => t(lang).categoriesShort[c];
/** Kept for compatibility (English labels). */
export const CATEGORY_LABELS = t('en').categories;

const byOrder = (a: Project, b: Project) => a.order - b.order;

/** Project with its text in the requested language. */
export function localize(p: Project, lang: Lang): Project {
  if (lang === 'en') return p;
  if (p.placeholder) {
    const n = p.slug.split('-').pop() ?? '';
    return { ...p, title: placeholderIt.title(n), summary: placeholderIt.summary };
  }
  const tr = projectsIt[p.slug];
  if (!tr) return p;
  return {
    ...p,
    title: tr.title ?? p.title,
    summary: tr.summary ?? p.summary,
    caseStudy: { ...p.caseStudy, ...(tr.caseStudy ?? {}) },
    screenshots: p.screenshots.map((s, i) => ({ ...s, caption: tr.captions?.[i] ?? s.caption })),
  };
}

export function getProjects(lang: Lang = 'en'): Project[] {
  return allProjects.filter((p) => site.showPlaceholders || !p.placeholder).sort(byOrder).map((p) => localize(p, lang));
}
export function getPublishedProjects(lang: Lang = 'en'): Project[] {
  return allProjects.filter((p) => !p.placeholder).sort(byOrder).map((p) => localize(p, lang));
}
export function getFeaturedProjects(lang: Lang = 'en'): Project[] {
  return getPublishedProjects(lang).filter((p) => p.featured).slice(0, 4);
}
export function getProject(slug: string, lang: Lang = 'en'): Project | undefined {
  return getPublishedProjects(lang).find((p) => p.slug === slug);
}
export function getAdjacentProjects(slug: string, lang: Lang = 'en'): { prev: Project; next: Project } | null {
  const list = getPublishedProjects(lang);
  const i = list.findIndex((p) => p.slug === slug);
  if (i < 0 || list.length < 2) return null;
  return { prev: list[(i - 1 + list.length) % list.length], next: list[(i + 1) % list.length] };
}
export function projectNumber(slug: string): string {
  const list = getProjects();
  const i = list.findIndex((p) => p.slug === slug);
  return String(i + 1).padStart(2, '0');
}

export const CASE_KEYS: (keyof Omit<CaseStudy, 'overview'>)[] = ['problem', 'role', 'process', 'challenges', 'solutions', 'results'];
