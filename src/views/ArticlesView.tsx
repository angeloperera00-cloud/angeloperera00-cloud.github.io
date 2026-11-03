import Icon from '@/components/icons/Icon';
import { Display, SecLabel } from '@/components/ui/Display';
import SmartLink from '@/components/ui/SmartLink';
import ArticlesExplorer from '@/components/articles/ArticlesExplorer';
import { getArticles, getFeaturedArticle, getTopics, hasRealArticles } from '@/lib/articles';
import { site } from '@/content/site';
import type { Lang } from '@/i18n';
import Shell from './Shell';
import { t } from '@/i18n/ui';

export default function ArticlesView({ lang }: { lang: Lang }) {
  const s = t(lang).writing;
  const articles = getArticles();
  const featured = getFeaturedArticle(articles);
  const real = hasRealArticles();
  return (
    <Shell lang={lang} path={'/articles/'}>
    <section className="writing page-head tone-dark" id="top" data-tone="dark">
      <div className="container">
        <header className="sec-head split-head">
          <div>
            <SecLabel num="08" label={s.label} />
            <Display as="h1" lines={[s.titleA, { text: s.titleB, accent: true }]} />
          </div>
          <span className="split-head__rule" aria-hidden="true" />
          <p className="sec-lede" data-reveal style={{ ['--d' as string]: '.15s' }}>{s.lede}</p>
          <SmartLink className="btn btn--outline magnetic" href={site.links.medium} setting="site.links.medium">
            {s.follow} <Icon name="i-arrow-up-right" />
          </SmartLink>
        </header>

        {!real && articles.length > 0 && (
          <p className="draft-note"><span className="draft-pill">{t(lang).projects.placeholder}</span>{s.draftNote}</p>
        )}

        {articles.length > 0 ? (
          <ArticlesExplorer articles={articles} topics={getTopics(articles)} featuredId={featured?.id} lang={lang} />
        ) : (
          <div className="empty empty--lg" role="status">
            <Icon name="i-pen-line" />
            <p>{s.empty}</p>
            <SmartLink className="btn btn--outline btn--sm" href={site.links.medium} setting="site.links.medium">{s.follow} <Icon name="b-medium" /></SmartLink>
          </div>
        )}
      </div>
    </section>
    </Shell>
  );
}
