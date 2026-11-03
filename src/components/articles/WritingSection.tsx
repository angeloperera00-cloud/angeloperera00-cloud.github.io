import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import { Display, SecLabel } from '@/components/ui/Display';
import SmartLink from '@/components/ui/SmartLink';
import FeaturedArticle from './FeaturedArticle';
import ArticleCard from './ArticleCard';
import { getArticlePreview, getArticles, hasRealArticles } from '@/lib/articles';
import { site } from '@/content/site';
import { lp, type Lang } from '@/i18n';
import { t } from '@/i18n/ui';

export default function WritingSection({ num = '08', lang }: { num?: string; lang: Lang }) {
  const s = t(lang).writing;
  const preview = getArticlePreview(3);
  if (!preview.length) return null;
  const [lead, ...rest] = preview;
  const total = getArticles().length;
  const real = hasRealArticles();

  return (
    <section className="writing tone-dark" id="writing" data-tone="dark">
      <div className="container">
        <header className="sec-head split-head">
          <div>
            <SecLabel num={num} label={s.label} />
            <Display lines={[s.titleA, { text: s.titleB, accent: true }]} />
          </div>
          <span className="split-head__rule" aria-hidden="true" />
          <p className="sec-lede" data-reveal style={{ ['--d' as string]: '.15s' }}>{s.lede}</p>
          <SmartLink className="btn btn--outline magnetic" href={site.links.medium} setting="site.links.medium" data-reveal="">
            {s.follow} <Icon name="i-arrow-up-right" />
          </SmartLink>
        </header>

        {!real && (
          <p className="draft-note" data-reveal>
            <span className="draft-pill">{t(lang).projects.placeholder}</span>
            {s.draftNote}
          </p>
        )}

        <div className={`writing__layout${rest.length ? '' : ' writing__layout--solo'}`}>
          <div data-reveal="card"><FeaturedArticle article={lead} lang={lang} /></div>
          {rest.length > 0 && (
            <div className="writing__list">
              {rest.map((a, i) => (
                <div key={a.id} data-reveal="card" style={{ ['--d' as string]: `${0.1 + i * 0.08}s` }}>
                  <ArticleCard article={a} index={i + 2} lang={lang} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="writing__more" data-reveal>
          <Link className="link-arrow" href={lp(lang, '/articles/')}>
            {s.viewAll}{real ? <span className="link-arrow__count">{total}</span> : null} <Icon name="i-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
