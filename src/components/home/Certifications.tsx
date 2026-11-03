import Icon from '@/components/icons/Icon';
import Topo from '@/components/motion/Topo';
import { Display, SecLabel } from '@/components/ui/Display';
import type { CertLogo } from '@/content/profile';
import { getProfile } from '@/lib/profile';
import type { Lang } from '@/i18n';
import { t } from '@/i18n/ui';

function Logo({ kind }: { kind: CertLogo }) {
  switch (kind) {
    case 'academy':
      return <div className="ccard__logo ccard__logo--academy" aria-hidden="true"><Icon name="b-apple" /><span>Developer<br />Academy</span></div>;
    case 'udemy':
      return <div className="ccard__logo ccard__logo--udemy" aria-hidden="true"><Icon name="b-udemy" /><span>udemy</span></div>;
    case 'harvard':
      return <div className="ccard__logo ccard__logo--harvard" aria-hidden="true"><span className="hv-1">Harvard</span><span className="hv-2">University</span></div>;
    case 'javascript':
      return <div className="ccard__logo ccard__logo--img" aria-hidden="true"><img src="/icons/javascript.svg" alt="" width={80} height={80} loading="lazy" /></div>;
    case 'swift':
      return <div className="ccard__logo ccard__logo--img" aria-hidden="true"><img src="/icons/swift.svg" alt="" width={80} height={80} loading="lazy" /></div>;
    case 'webdev':
      return <div className="ccard__logo ccard__logo--webdev" aria-hidden="true"><span>The</span><b>Web Dev</b><b>Bootcamp</b><small>⟶ 2022</small></div>;
  }
}

export default function Certifications({ lang }: { lang: Lang }) {
  const { certifications } = getProfile(lang);
  const s = t(lang).certs;
  const delays = ['0s', '.08s', '.16s', '.04s', '.12s', '.2s'];
  return (
    <section className="certs tone-dark" id="certifications" data-tone="dark">
      <Topo variant="right" />
      <div className="container">
        <header className="sec-head split-head">
          <div>
            <SecLabel num="06" label={s.label} />
            <Display lines={[s.titleA, { text: s.titleB, accent: true }]} />
          </div>
          <span className="split-head__rule" aria-hidden="true" />
          <p className="sec-lede" data-reveal style={{ ['--d' as string]: '.15s' }}>{s.lede}</p>
          <ul className="kpis kpis--dark">
            <li data-reveal style={{ ['--d' as string]: '.1s' }}><Icon name="i-award" /><strong><span data-count={certifications.length}>{certifications.length}</span></strong><span className="kpi__label">{s.count}</span></li>
            <li data-reveal style={{ ['--d' as string]: '.18s' }}><Icon name="i-calendar" /><strong>2020 – 2026</strong><span className="kpi__label">{s.years}</span></li>
            <li data-reveal style={{ ['--d' as string]: '.26s' }}><Icon name="i-badge-check" /><strong><span data-count={100}>100</span>%</strong><span className="kpi__label">{s.verifiedPct}</span></li>
          </ul>
        </header>

        <div className="cgrid">
          {certifications.map((c, i) => (
            <article className="ccard" key={c.id} data-reveal="card" style={{ ['--d' as string]: delays[i] }}>
              <Logo kind={c.logo} />
              <div className="ccard__body">
                <span className="pill">{c.years}</span>
                <h3>{c.title}</h3>
                <p className="ccard__issuer">{c.issuer}</p>
                <p>{c.text}</p>
              </div>
              <div className="ccard__foot">
                <span className="verified"><Icon name="i-verified" />{s.verified}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="certs__bar" data-reveal>
          <Icon name="i-award" />
          <p>{s.bar1}<br />{s.bar2}</p>
          <div className="certs__sign"><span className="signature signature--light">Angelo Perera</span><small>{s.motto}</small></div>
        </div>
      </div>
    </section>
  );
}
