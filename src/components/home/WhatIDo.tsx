import { Display, SecLabel } from '@/components/ui/Display';
import DisciplineCards, { type Discipline } from './DisciplineCards';
import { getPublishedProjects } from '@/lib/projects';
import type { ProjectCategory } from '@/content/types';
import type { Lang } from '@/i18n';
import { t } from '@/i18n/ui';

/* The five areas Angelo works in. Each card filters the Projects section below. */
const ORDER: ProjectCategory[] = ['ios', 'spatial', 'ai', 'web', 'games'];

export default function WhatIDo({ lang }: { lang: Lang }) {
  const s = t(lang).whatido;
  const projects = getPublishedProjects(lang);
  const items: Discipline[] = ORDER.map((c) => ({
    id: c,
    title: s.cards[c].title,
    text: s.cards[c].text,
    count: projects.filter((p) => p.categories.includes(c)).length,
  }));

  return (
    <section className="whatido" id="whatido" data-tone="light">
      <div className="container">
        <header className="sec-head whatido__head">
          <div>
            <SecLabel label={s.label} />
            <Display lines={[{ text: <>{s.titleA} <em className="accent">{s.titleB}</em></> }]} />
          </div>
          <p className="sec-lede" data-reveal style={{ ['--d' as string]: '.15s' }}>{s.lede}</p>
        </header>
        <DisciplineCards items={items} lang={lang} />
      </div>
    </section>
  );
}
