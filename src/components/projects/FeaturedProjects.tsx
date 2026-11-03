import type { CSSProperties } from 'react';
import Icon from '@/components/icons/Icon';
import Glyph from '@/components/ui/Glyph';
import TransitionLink from '@/components/motion/TransitionLink';
import AppIcon from './AppIcon';
import Device from './Device';
import { categoryShort } from '@/lib/projects';
import type { Lang } from '@/i18n';
import { lp } from '@/i18n';
import { t } from '@/i18n/ui';

import type { Project } from '@/content/types';

function Chips({ project, label }: { project: Project; label: string }) {
  return (
    <ul className="chips chips--start" aria-label={label}>
      {project.chips.map((c) =>
        'text' in c ? (
          <li key={c.label} className="chip--text">{c.text}</li>
        ) : (
          <li key={c.label} title={c.label}><Glyph glyph={c} /><span className="sr-only">{c.label}</span></li>
        ),
      )}
    </ul>
  );
}



/** Lead project as a cinematic banner, the rest as large cards. */
export default function FeaturedProjects({ projects, numbers, lang }: { projects: Project[]; numbers: Record<string, string>; lang: Lang }) {
  const s = t(lang).projects;
  const cats = (p: Project) => p.categories.map((c) => categoryShort(lang, c)).join(' · ');
  if (!projects.length) return null;
  const [lead, ...rest] = projects;
  const leadShot = (lead.showcase !== undefined ? lead.screenshots[lead.showcase] : undefined)?.src
    ? lead.screenshots[lead.showcase!]
    : lead.screenshots.find((s) => s.src);

  return (
    <div className="featured">
      <article className="fbanner" data-reveal="card" data-tilt="2" style={{ '--accent': lead.accent } as CSSProperties}>
        <div className="fbanner__media" style={{ viewTransitionName: `cover-${lead.slug}` }}>
          {lead.cover && <img src={lead.cover.src} alt={lead.cover.alt} width={896} height={322} decoding="async" data-tilt-img />}
          {leadShot && (
            <Device
              kind={leadShot.device}
              orientation={leadShot.orientation}
              width={leadShot.width}
              height={leadShot.height}
              src={leadShot.src}
              alt={leadShot.alt}
              accent={lead.accent}
              className={`fbanner__device${leadShot.orientation === 'landscape' ? ' fbanner__device--wide' : ''}`}
            />
          )}
        </div>
        <span className="pcard__num">{numbers[lead.slug]}</span>
        <span className="pcard__tag">{s.featured}</span>
        <div className="fbanner__body">
          <div className="fbanner__title">
            <AppIcon spec={lead.icon} size="lg" />
            <div>
              {lead.categories.length > 0 && <p className="fcard__cats">{cats(lead)}</p>}
              <h3>{lead.title}</h3>
            </div>
          </div>
          <p className="fbanner__summary">{lead.summary}</p>
          <div className="fbanner__aside">
            <Chips project={lead} label={s.chipsLabel} />
            <TransitionLink className="btn btn--red btn--sm magnetic fbanner__cta" href={lp(lang, `/projects/${lead.slug}/`)}>
              {s.viewCase}<span className="sr-only">: {lead.title}</span> <Icon name="i-arrow-right" />
            </TransitionLink>
          </div>
        </div>
        <TransitionLink className="stretch" href={lp(lang, `/projects/${lead.slug}/`)} aria-hidden="true" tabIndex={-1} />
      </article>

      {rest.length > 0 && (
        <div className="fgrid" data-count-items={rest.length}>
          {rest.map((p, i) => (
            <article key={p.slug} className="fcard pcard" data-reveal="card" style={{ '--accent': p.accent, '--d': `${i * 0.08}s` } as CSSProperties}>
              <div className="pcard__media fcard__media" style={{ viewTransitionName: `cover-${p.slug}` }}>
                {p.cover ? (
                  <img src={p.cover.src} alt={p.cover.alt} width={896} height={322} loading="lazy" decoding="async" />
                ) : (
                  <div className="pcard__nocover"><AppIcon spec={p.icon} size="lg" /></div>
                )}
                <span className="pcard__num">{numbers[p.slug]}</span>
                <span className="pcard__tag">{s.featured}</span>
              </div>
              <div className="fcard__body">
                <div className="fcard__head">
                  <AppIcon spec={p.icon} />
                  <div>
                    {p.categories.length > 0 && <p className="fcard__cats">{cats(p)}</p>}
                    <h3>{p.title}</h3>
                  </div>
                </div>
                <p className="fcard__summary">{p.summary}</p>
                <div className="fcard__foot">
                  <Chips project={p} label={s.chipsLabel} />
                  <TransitionLink className="pcard__cta" href={lp(lang, `/projects/${p.slug}/`)}>
                    {s.viewCase}<span className="sr-only">: {p.title}</span> <Icon name="i-arrow-right" />
                  </TransitionLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
