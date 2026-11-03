import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Icon from '@/components/icons/Icon';
import Glyph from '@/components/ui/Glyph';
import TransitionLink from '@/components/motion/TransitionLink';
import AppIcon from '@/components/projects/AppIcon';
import ScreenshotRail from '@/components/projects/ScreenshotRail';
import { site } from '@/content/site';
import type { Project, RichBlock } from '@/content/types';
import { CASE_KEYS, categoryLabel, getAdjacentProjects, getProject, getPublishedProjects, projectNumber } from '@/lib/projects';
import { pad2 } from '@/lib/format';
import { lp, type Lang } from '@/i18n';
import { t } from '@/i18n/ui';
import Shell from './Shell';

export function projectMetadata(slug: string, lang: Lang): Metadata {
  const p = getProject(slug, lang);
  if (!p) return {};
  const title = `${p.title} — ${t(lang).meta.caseStudy}`;
  return {
    title,
    description: p.summary,
    alternates: { languages: { en: `/projects/${slug}/`, it: `/it/projects/${slug}/` } },
    openGraph: { title, description: p.summary, images: p.cover ? [p.cover.src] : undefined },
  };
}

function Block({ block }: { block: RichBlock }) {
  return (
    <>
      {block.paragraphs?.map((x) => <p key={x.slice(0, 32)}>{x}</p>)}
      {block.bullets && <ul className="cs-bullets">{block.bullets.map((b) => <li key={b.slice(0, 32)}>{b}</li>)}</ul>}
    </>
  );
}

const LINKS = [
  { key: 'appStore', icon: 'b-appstore' },
  { key: 'testFlight', icon: 'b-apple' },
  { key: 'github', icon: 'b-github' },
  { key: 'website', icon: 'i-globe' },
  { key: 'video', icon: 'b-youtube' },
] as const;

export default function ProjectView({ project: p, lang }: { project: Project; lang: Lang }) {
  const s = t(lang).cs;
  const adjacent = getAdjacentProjects(p.slug, lang);
  const total = getPublishedProjects().length;
  const num = projectNumber(p.slug);
  const sections = CASE_KEYS.map((key) => ({ key, title: s.sections[key][0], hint: s.sections[key][1], block: p.caseStudy[key] })).filter((x) => x.block || site.showPlaceholders);
  const links = LINKS.filter((l) => p.links[l.key]);
  const shots = p.screenshots.filter((x) => x.src || site.showPlaceholders);
  const cats = p.categories.map((c) => categoryLabel(lang, c));
  const showOverview = Boolean(p.caseStudy.overview) || site.showPlaceholders;
  let n = 0;
  const next = () => pad2(++n);
  const ph = t(lang).projects.placeholder;

  return (
    <Shell lang={lang} path={`/projects/${p.slug}/`}>
    <article className="cs" style={{ '--accent': p.accent } as CSSProperties}>
      <section className="cs-hero tone-dark" id="top" data-tone="dark">
        <div className="cs-glow" aria-hidden="true" />
        <div className="container">
          <nav className="cs-crumbs" aria-label="Breadcrumb">
            <TransitionLink href={lp(lang, '/projects/')}><Icon name="i-arrow-left" /> {s.allProjects}</TransitionLink>
            <span>{s.project} {num} / {pad2(total)}</span>
          </nav>

          <div className="cs-hero__grid">
            <div className="cs-hero__intro">
              {cats.length > 0 && <p className="cs-kicker">{cats.join(' · ')}</p>}
              <div className="cs-titlerow">
                <AppIcon spec={p.icon} size="lg" />
                <h1 className="cs-title">{p.title}</h1>
              </div>
              <p className="cs-lede">{p.summary}</p>
              {links.length > 0 && (
                <div className="cs-links">
                  {links.map((l, i) => (
                    <a key={l.key} className={`btn ${i === 0 ? 'btn--red' : 'btn--outline'} btn--sm magnetic`} href={p.links[l.key]} target="_blank" rel="noopener noreferrer">
                      <Icon name={l.icon} /> {s.links[l.key]} <Icon name="i-arrow-up-right" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <dl className="cs-facts">
              {p.platforms.length > 0 && <div><dt>{s.platforms}</dt><dd>{p.platforms.join(', ')}</dd></div>}
              {cats.length > 0 && <div><dt>{s.category}</dt><dd>{cats.join(', ')}</dd></div>}
              {p.year && <div><dt>{s.year}</dt><dd>{p.year}</dd></div>}
              {p.tech.length > 0 && <div><dt>{s.builtWith}</dt><dd>{p.tech.map((x) => x.label).join(', ')}</dd></div>}
            </dl>
          </div>

          <figure className="cs-cover" style={{ viewTransitionName: `cover-${p.slug}` }}>
            {p.cover ? (
              <img src={p.cover.src} alt={p.cover.alt} width={896} height={322} loading="eager" />
            ) : (
              <div className="pcard__nocover"><AppIcon spec={p.icon} size="lg" /></div>
            )}
          </figure>
        </div>
      </section>

      {showOverview && (
        <section className="cs-section tone-dark" data-tone="dark">
          <div className="container cs-split">
            <p className="cs-label" data-reveal><span>{next()}</span>{s.overview}</p>
            <div className="cs-overview" data-reveal style={{ ['--d' as string]: '.08s' }}>
              {p.caseStudy.overview ? (
                <p>{p.caseStudy.overview}</p>
              ) : (
                <p className="draft-hint"><span className="draft-pill">{ph}</span>{s.overviewHint}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {shots.length > 0 && (
        <section className="cs-section cs-screens tone-dark" data-tone="dark">
          <div className="container">
            <div className="cs-split cs-split--head">
              <p className="cs-label" data-reveal><span>{next()}</span>{s.interface}</p>
              <p className="cs-sub" data-reveal style={{ ['--d' as string]: '.08s' }}>{shots.some((x) => x.src) ? s.tapHint : s.slotsHint}</p>
            </div>
            <div data-reveal="card"><ScreenshotRail screenshots={shots} accent={p.accent} icon={p.icon} title={p.title} lang={lang} /></div>
          </div>
        </section>
      )}

      {sections.length > 0 && (
        <section className="cs-section tone-dark" data-tone="dark">
          <div className="container">
            <div className="cs-split cs-split--head">
              <p className="cs-label" data-reveal><span>{next()}</span>{s.caseStudy}</p>
            </div>
            <div className="cs-story">
              {sections.map((x, i) => (
                <section key={x.key} className={`cs-block${x.block ? '' : ' cs-block--draft'}`} data-reveal="card" style={{ ['--d' as string]: `${(i % 2) * 0.08}s` }}>
                  <p className="cs-block__no">{pad2(i + 1)}</p>
                  <h2 className="cs-block__title">{x.title}</h2>
                  {x.block ? (
                    <div className="cs-block__body"><Block block={x.block} /></div>
                  ) : (
                    <div className="cs-block__body">
                      <p className="draft-hint"><span className="draft-pill">{ph}</span>{x.hint}</p>
                      <p className="draft-path">caseStudy.{x.key}</p>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        </section>
      )}

      {p.tech.length > 0 && (
        <section className="cs-section tone-dark" data-tone="dark">
          <div className="container cs-split">
            <p className="cs-label" data-reveal><span>{next()}</span>{s.technology}</p>
            <ul className="cs-tech" data-reveal style={{ ['--d' as string]: '.08s' }}>
              {p.tech.map((x) => (
                <li key={x.label}><span className="cs-tech__ic"><Glyph glyph={x} /></span>{x.label}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {adjacent && (
        <section className="cs-section cs-next-wrap tone-dark" data-tone="dark">
          <div className="container">
            <TransitionLink className="cs-next" href={lp(lang, `/projects/${adjacent.next.slug}/`)} data-tilt="2" style={{ '--accent': adjacent.next.accent } as CSSProperties}>
              <div className="cs-next__media" style={{ viewTransitionName: `cover-${adjacent.next.slug}` }}>
                {adjacent.next.cover && <img src={adjacent.next.cover.src} alt="" loading="lazy" data-tilt-img />}
              </div>
              <div className="cs-next__body">
                <span className="cs-next__label">{s.nextProject}</span>
                <span className="cs-next__title">{adjacent.next.title}</span>
                <span className="cs-next__summary">{adjacent.next.summary}</span>
              </div>
              <Icon name="i-arrow-right" className="cs-next__arrow" />
            </TransitionLink>
            <div className="cs-next__row">
              <TransitionLink className="link-arrow link-arrow--back" href={lp(lang, `/projects/${adjacent.prev.slug}/`)}>
                <Icon name="i-arrow-left" /> {adjacent.prev.title}
              </TransitionLink>
              <TransitionLink className="link-arrow" href={lp(lang, '/projects/')}>
                {s.allProjects} <Icon name="i-layout-grid" />
              </TransitionLink>
            </div>
          </div>
        </section>
      )}
    </article>
    </Shell>
  );
}
