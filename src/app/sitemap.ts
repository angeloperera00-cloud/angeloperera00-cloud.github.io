import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { getPublishedProjects } from '@/lib/projects';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  return [
    { url: `${base}/` },
    { url: `${base}/projects/` },
    { url: `${base}/articles/` },
    { url: `${base}/it/` },
    { url: `${base}/it/projects/` },
    { url: `${base}/it/articles/` },
    ...getPublishedProjects().flatMap((p) => [{ url: `${base}/projects/${p.slug}/` }, { url: `${base}/it/projects/${p.slug}/` }]),
  ];
}
