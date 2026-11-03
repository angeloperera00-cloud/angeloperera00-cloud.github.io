import Topo from '@/components/motion/Topo';
import { Display, SecLabel } from '@/components/ui/Display';
import ProjectGallery from '@/components/projects/ProjectGallery';
import { getProjects, getPublishedProjects, projectNumber } from '@/lib/projects';
import type { Lang } from '@/i18n';
import Shell from './Shell';
import { t } from '@/i18n/ui';

export default function ProjectsView({ lang }: { lang: Lang }) {
  const s = t(lang).projects;
  const all = getProjects(lang);
  const numbers = Object.fromEntries(all.map((p) => [p.slug, projectNumber(p.slug)]));
  return (
    <Shell lang={lang} path={'/projects/'}>
    <section className="projects page-head tone-dark" id="top" data-tone="dark">
      <Topo variant="right" />
      <div className="container">
        <header className="sec-head split-head">
          <div>
            <SecLabel num="03" label={s.pageLabel} />
            <Display as="h1" lines={[s.pageTitleA, { text: s.pageTitleB, accent: true }]} />
          </div>
          <span className="split-head__rule" aria-hidden="true" />
          <p className="sec-lede" data-reveal style={{ ['--d' as string]: '.15s' }}>{s.pageLede}</p>
        </header>
        <ProjectGallery projects={all} numbers={numbers} totalCount={getPublishedProjects().length} withSearch syncUrl heading={s.pageLabel} lang={lang} />
      </div>
    </section>
    </Shell>
  );
}
