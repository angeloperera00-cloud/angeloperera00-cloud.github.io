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

          {/* One red line across the top, a column for each role. */}
          <div className="timeline xp" style={{ ['--n' as string]: experience.length }}>
            <div className="xp__line" aria-hidden="true"><span className="timeline__fill" /></div>
            <ol className="xp__cols">
              {experience.map((job, i) => (
                <li className="xp__col" data-reveal key={job.title} style={{ ['--d' as string]: `${i * 0.12}s` }}>
                  <span className="xp__dot" aria-hidden="true" />
                  <p className="xp__date">{job.date}</p>
                  <h3 className="xp__title">{job.title}</h3>
                  <p className="xp__org">{job.org}</p>
                  <ul className="xp__points">{job.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
