import Icon from '@/components/icons/Icon';
import { Display, SecLabel } from '@/components/ui/Display';
import { getProfile } from '@/lib/profile';
import type { Lang } from '@/i18n';
import { t } from '@/i18n/ui';

export default function Experience({ lang }: { lang: Lang }) {
  const { experience } = getProfile(lang);
  const s = t(lang).experience;
  return (
    <section className="experience" id="experience" data-tone="light">
      <div className="container exp__grid exp__grid--solo">
        <div className="exp__main">
          <header className="sec-head exp__head">
            <div>
              <SecLabel num="02" label={s.label} />
              <Display lines={[{ text: <>{s.titleA} <em className="accent">{s.titleB}</em></> }]} />
            </div>
            <p className="sec-lede" data-reveal style={{ ['--d' as string]: '.2s' }}>{s.lede}</p>
          </header>

          <ol className="timeline">
            <li className="timeline__rail" aria-hidden="true"><span className="timeline__fill" /></li>
            {experience.map((job) => (
              <li className="tl" data-reveal key={job.title}>
                <span className="tl__dot" aria-hidden="true" />
                <p className="tl__date">{job.date}</p>
                <span className="tl__icon" aria-hidden="true"><Icon name={job.icon} /></span>
                <div className="tl__body">
                  <h3>{job.title}</h3>
                  <p className="tl__org">{job.org}</p>
                  <ul className="tl__points">{job.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  <ul className="tags">{job.tags.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
