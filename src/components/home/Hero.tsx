import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import HeroMotion from '@/components/motion/HeroMotion';
import CopyButton from '@/components/ui/CopyButton';
import CvMenu from './CvMenu';
import { site } from '@/content/site';
import { getProfile } from '@/lib/profile';
import { lp, type Lang } from '@/i18n';
import { t } from '@/i18n/ui';

export default function Hero({ lang }: { lang: Lang }) {
  const { hero } = getProfile(lang);
  const s = t(lang).hero;
  const delays = ['.28s', '.37s', '.46s', '.55s'];
  return (
    <section className="hero" id="top" data-tone="light" aria-label={s.intro}>
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">{hero.eyebrow}</p>
          <h1 className={`hero__title hero__title--${lang}`}>
            {hero.titleLines.map((line, i) => (
              <span key={line} className={`line${i === 2 ? ' accent' : ''}`} style={{ ['--d' as string]: delays[i] }}>
                <span>
                  {line}
                  {i === hero.titleLines.length - 1 && <em>.</em>}
                </span>
              </span>
            ))}
          </h1>
          <span className="hero__rule" aria-hidden="true" />
          <p className="hero__roles">
            {hero.roles.map((r, i) => (
              <span key={r}>
                {i > 0 && <i aria-hidden="true" />}
                <span>{r}</span>
              </span>
            ))}
            <br />
            <span>{hero.rolesLine2}</span>
          </p>
          <div className="hero__actions">
            <Link className="btn btn--red magnetic" href={lp(lang, '/#projects')}>
              {s.viewProjects} <Icon name="i-arrow-right" />
            </Link>
            <CvMenu lang={lang} />
          </div>
        </div>

        <div className="hero__figure">
          <div className="hero__name" aria-hidden="true">
            <svg viewBox="0 0 1000 634" preserveAspectRatio="xMidYMid meet">
              <text x="0" y="297" textLength="1000" lengthAdjust="spacing">ANGELO</text>
              <text x="0" y="627" textLength="1000" lengthAdjust="spacing">PERERA</text>
            </svg>
          </div>
          <div className="hero__portrait">
            <img src="/images/portrait.webp" width={987} height={1309} alt={s.portraitAlt} loading="eager" decoding="async" />
          </div>
        </div>

        <aside className="hero__aside" aria-label={s.badgeLabel}>
          <div className="hero__badge">
            <svg className="badge" viewBox="0 0 160 160" role="img" aria-label={s.badgeLabel}>
              <defs>
                <path id="arc-top" d="M 22 80 A 58 58 0 0 1 138 80" />
                <path id="arc-bot" d="M 16 80 A 64 64 0 0 0 144 80" />
              </defs>
              <text className="badge__txt"><textPath href="#arc-top" startOffset="50%" textAnchor="middle">{s.badgeTop}</textPath></text>
              <text className="badge__txt"><textPath href="#arc-bot" startOffset="50%" textAnchor="middle">{s.badgeBottom}</textPath></text>
              <circle className="badge__dot" cx="12" cy="80" r="3.2" />
              <circle className="badge__dot" cx="148" cy="80" r="3.2" />
              <g className="badge__rings">
                <circle cx="70" cy="80" r="17" />
                <circle cx="90" cy="80" r="17" />
              </g>
            </svg>
          </div>
          <ul className="hero__contact">
            <li><Icon name="i-map-pin" /><span>{lang === 'it' ? 'Napoli, Italia' : site.location}</span></li>
            <li>
              <Icon name="i-mail" />
              <a href={`mailto:${site.email}`} data-copy-src>{site.email}</a>
              <CopyButton value={site.email} label={s.copyEmail} />
            </li>
          </ul>
        </aside>
      </div>
      <HeroMotion />
    </section>
  );
}
