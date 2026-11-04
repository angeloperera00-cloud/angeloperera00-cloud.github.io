import type { CSSProperties } from 'react';
import Icon from '@/components/icons/Icon';
import Glyph from '@/components/ui/Glyph';
import TransitionLink from '@/components/motion/TransitionLink';
import AppIcon from './AppIcon';
import type { Lang } from '@/i18n';
import { lp } from '@/i18n';
import { t } from '@/i18n/ui';

import type { Project } from '@/content/types';

/** Compact project card — the original design's card, used in galleries. */
export default function ProjectCard({ project, number, style, lang }: { project: Project; number: string; style?: CSSProperties; lang: Lang }) {
  const s = t(lang).projects;
  if (project.placeholder) {
    return (
      <article className="pcard pcard--slot" style={style} aria-label={`${project.title}: ${s.reserved}`}>
        <div className="pcard__media pcard__media--slot">
          <span className="draft-pill">{s.placeholder}</span>
          <Icon name="i-image" className="pcard__slot-ic" />
        </div>
        <div className="pcard__body">
          <AppIcon spec={project.icon} />
          <div className="pcard__text">
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="pcard" style={{ ...style, '--accent': project.accent } as CSSProperties}>
      <div className="pcard__media" style={{ viewTransitionName: `cover-${project.slug}` }}>
        {project.cover ? (
          <img src={project.cover.src} width={896} height={322} loading="lazy" decoding="async" alt={project.cover.alt} />
        ) : (
          <div className="pcard__nocover"><AppIcon spec={project.icon} size="lg" /></div>
        )}
        {project.featured && <span className="pcard__tag">{s.featured}</span>}
      </div>
      <div className="pcard__body">
        <AppIcon spec={project.icon} />
        <div className="pcard__text">
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </div>
        {project.chips.length > 0 && (
          <ul className="chips" aria-label={s.chipsLabel}>
            {project.chips.map((c) =>
              'text' in c ? (
                <li key={c.label} className="chip--text">{c.text}</li>
              ) : (
                <li key={c.label} title={c.label}><Glyph glyph={c} /><span className="sr-only">{c.label}</span></li>
              ),
            )}
          </ul>
        )}
        <TransitionLink className="pcard__cta" href={lp(lang, `/projects/${project.slug}/`)}>
          {s.viewCase}<span className="sr-only">: {project.title}</span> <Icon name="i-arrow-right" />
        </TransitionLink>
      </div>
    </article>
  );
}
