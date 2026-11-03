import Icon from '@/components/icons/Icon';
import Topo from '@/components/motion/Topo';
import { Display, SecLabel } from '@/components/ui/Display';
import { getProfile } from '@/lib/profile';
import type { Lang } from '@/i18n';
import { t } from '@/i18n/ui';

export default function About({ lang }: { lang: Lang }) {
  const { about } = getProfile(lang);
  const statDelays = ['0s', '.08s', '.16s', '.12s', '.2s', '.28s'];
  return (
    <section className="about tone-dark" id="about" data-tone="dark">
      <Topo />
      <div className="dotgrid" aria-hidden="true" />
      <div className="container about__grid">
        <div className="about__intro">
          <header className="sec-head">
            <SecLabel num="01" label={t(lang).about.label} rule />
            <Display lines={[about.headline[0], about.headline[1], { text: about.headline[2], accent: true }]} />
          </header>
          <div className="about__text" data-reveal style={{ ['--d' as string]: '.15s' }}>
            {about.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          </div>
          <p className="signature" data-reveal="sign"><span>Angelo Perera</span></p>
          <p className="tagline" data-reveal style={{ ['--d' as string]: '.1s' }}>
            {about.tagline.map((x, i) => <span key={x}>{i > 0 && <i />}{x}</span>)}
          </p>
        </div>

        <div className="about__side">
          <ul className="stats">
            {about.stats.map((s, i) => (
              <li className="stat" key={s.label} data-reveal style={{ ['--d' as string]: statDelays[i] }}>
                <Icon name={s.icon} className="stat__ic" />
                <strong className="stat__num">
                  {s.count !== undefined ? <><span data-count={s.count}>{s.count}</span>{s.suffix}</> : s.value}
                </strong>
                <span className="stat__label">{s.label}</span>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
          <blockquote className="quote" data-reveal style={{ ['--d' as string]: '.1s' }}>
            <Icon name="i-quote-fill" className="quote__mark" />
            <p>{about.quote}</p>
            <span className="quote__sign" aria-hidden="true">AP</span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
