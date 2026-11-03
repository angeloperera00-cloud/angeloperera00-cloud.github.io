import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import { Display, SecLabel } from '@/components/ui/Display';
import { getProfile } from '@/lib/profile';
import { lp, type Lang } from '@/i18n';
import { t } from '@/i18n/ui';

export default function Education({ lang }: { lang: Lang }) {
  const { education, certifications } = getProfile(lang);
  const s = t(lang).education;
  return (
    <section className="education" id="education" data-tone="light">
      <div className="container">
        <header className="sec-head split-head split-head--light">
          <div>
            <SecLabel num="05" label={s.label} />
            <Display lines={[s.titleA, { text: s.titleB, accent: true }]} />
          </div>
          <span className="split-head__rule" aria-hidden="true" />
          <p className="sec-lede" data-reveal style={{ ['--d' as string]: '.15s' }}>{s.lede}</p>
        </header>

        <div className="edu" data-reveal="card">
          <div className="edu__mark" aria-hidden="true">
            <Icon name="b-apple" />
            <span>Developer<br />Academy</span>
          </div>
          <div className="edu__main">
            <div className="edu__meta">
              <span className="pill">{education.years}</span>
              <span className="edu__status"><span className="pulse" aria-hidden="true" />{education.status}</span>
            </div>
            <h3>{education.title}</h3>
            <p className="edu__inst">{education.institution}</p>
            <p className="edu__desc">{education.description}</p>
            <ul className="tags tags--light">{education.focus.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
          <Link className="edu__side" href={lp(lang, '/#certifications')}>
            <span className="edu__side-label">{s.continuous}</span>
            <span className="edu__side-num"><strong>{certifications.length}</strong> {s.certs}</span>
            <span className="edu__side-years">2020 – 2026</span>
            <span className="edu__side-link">{s.seeCerts} <Icon name="i-arrow-right" /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
