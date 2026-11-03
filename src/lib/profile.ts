import * as en from '@/content/profile';
import * as it from '@/content/profile.it';
import type { Lang } from '@/i18n';

/** Home page content in the requested language (structure from profile.ts, text overlaid for Italian). */
export function getProfile(lang: Lang) {
  if (lang === 'en') return en;
  return {
    ...en,
    hero: it.heroIt,
    about: {
      ...en.about,
      ...it.aboutIt,
      stats: en.about.stats.map((s, i) => ({ ...s, ...it.aboutIt.stats[i] })),
    },
    experience: en.experience.map((e, i) => ({ ...e, ...it.experienceIt[i] })),
    skills: en.skills.map((g, i) => ({ ...g, title: it.skillTitlesIt[i] ?? g.title })),
    skillKpis: en.skillKpis.map((k, i) => ({ ...k, label: it.skillKpiLabelsIt[i] ?? k.label })),
    education: { ...en.education, ...it.educationIt },
    certifications: en.certifications.map((c) => ({ ...c, ...it.certTextsIt[c.id] })),
    youtube: {
      ...en.youtube,
      lede: it.youtubeIt.lede,
      tags: it.youtubeIt.tags,
      since: it.youtubeIt.since,
      points: it.youtubeIt.points,
      stats: en.youtube.stats.map((s, i) => ({ ...s, label: it.youtubeIt.statLabels[i] ?? s.label })),
    },
  };
}
