import Icon from '@/components/icons/Icon';
import { Display, SecLabel } from '@/components/ui/Display';
import SmartLink from '@/components/ui/SmartLink';
import { getProfile } from '@/lib/profile';
import { site } from '@/content/site';
import type { Lang } from '@/i18n';
import { t } from '@/i18n/ui';

export default function YouTube({ lang }: { lang: Lang }) {
  const { youtube } = getProfile(lang);
  const s = t(lang).youtube;
  return (
    <section className="youtube" id="youtube" data-tone="light">
      <div className="container yt__grid">
        <div className="yt__copy">
          <header className="sec-head">
            <SecLabel num="07" label={s.label} />
            <Display lines={[s.titleA, { text: s.titleB, accent: true }]} />
          </header>
          <p className="sec-lede" data-reveal style={{ ['--d' as string]: '.15s' }}>{youtube.lede}</p>
          <ul className="tags tags--light" data-reveal style={{ ['--d' as string]: '.2s' }}>
            {youtube.tags.map((x) => <li key={x}>{x}</li>)}
          </ul>
          <SmartLink className="btn btn--red magnetic" href={site.links.youtube} setting="site.links.youtube" data-reveal="">
            {s.visit} <Icon name="i-arrow-up-right" />
          </SmartLink>
        </div>

        <div className="yt__panel" data-reveal="card">
          <Icon name="b-youtube" className="yt__mark" />
          <div className="yt__stats yt__stats--3">
            {youtube.stats.map((x) => (
              <div key={x.label} title={x.exact}>
                <strong><span data-count={x.count}>{x.count}</span>{x.suffix}</strong>
                <span className="yt__label">{x.label}</span>
              </div>
            ))}
          </div>
          <p className="yt__since">{s.since} {youtube.since}</p>
          <ul className="yt__points">
            {youtube.points.map((p) => <li key={p}><Icon name="i-check" />{p}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
