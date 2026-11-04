import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Topo from '@/components/motion/Topo';
import { Display, SecLabel } from '@/components/ui/Display';
import FeaturedProjects from './FeaturedProjects';
import ProjectGallery from './ProjectGallery';
import { builtWith } from '@/content/profile';
import { getFeaturedProjects, getProjects, projectNumber } from '@/lib/projects';
import { lp, type Lang } from '@/i18n';
import { t } from '@/i18n/ui';

export default function ProjectsSection({ lang }: { lang: Lang }) {
  const s = t(lang).projects;
  const all = getProjects(lang);
  const featured = getFeaturedProjects(lang);
  const featuredSlugs = new Set(featured.map((p) => p.slug));
  const rest = all.filter((p) => !featuredSlugs.has(p.slug));
  const numbers = Object.fromEntries(all.map((p) => [p.slug, projectNumber(p.slug)]));

  return (
    <section className="projects tone-dark" id="projects" data-tone="dark">
      <Topo variant="right" />
      <div className="container">
        <header className="sec-head split-head">
          <div>
            <SecLabel label={s.label} />
            <Display lines={[s.titleA, { text: s.titleB, accent: true }]} />
          </div>
          <span className="split-head__rule" aria-hidden="true" />
          <p className="sec-lede" data-reveal style={{ ['--d' as string]: '.15s' }}>{s.lede}</p>
          <Link className="btn btn--outline magnetic" href={lp(lang, '/projects/')} data-reveal style={{ ['--d' as string]: '.22s' }}>
            {s.viewAll} <Icon name="i-arrow-right" />
          </Link>
        </header>

        <FeaturedProjects projects={featured} numbers={numbers} lang={lang} />

        {rest.length > 0 && (
          <ProjectGallery
            projects={rest}
            numbers={numbers}
            limit={6}
            viewAllHref={rest.length > 6 ? lp(lang, '/projects/') : undefined}
            heading={s.more}
            allProjects={all}
            lang={lang}
          />
        )}

        <div className="builtwith" data-reveal>
          <p className="builtwith__label"><span>{s.builtWith}</span></p>
          <ul className="builtwith__list">
            {builtWith.map((b) => <li key={b.label}><Icon name={b.icon} line={b.line} />{b.label}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
